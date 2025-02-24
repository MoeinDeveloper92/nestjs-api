import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, GeneralResponse, UserDto } from './dto';
import { EncryptService } from '../tools/encrypt/encrypt.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserPayload } from './dto';
@Injectable()
export class AuthService {
  constructor(
    private dbService: PrismaService,
    private readonly encrypt: EncryptService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}
  async signUp(dto: AuthDto): Promise<{ token: string }> {
    try {
      //genereate the password
      const hash = await this.encrypt.hashPassword(dto.password);
      //save the new user in the User
      const user = await this.dbService.user.create({
        data: {
          email: dto.email,
          hash,
        },
        omit: {
          hash: true,
        },
      });
      //return the Saved User
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ForbiddenException('Credentials Taken');
      }
    }
  }

  async signin(dto: AuthDto): Promise<{ token }> {
    //Find the user by email
    const user = await this.dbService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    //if user does not exist throw exceptions
    if (!user) {
      throw new NotFoundException('User Not Found!');
    }
    //compare password
    const pwMatch = await this.encrypt.comparePassword(user.hash, dto.password);
    //if password incorrect
    if (!pwMatch) {
      throw new UnauthorizedException('Incorrect Credentials');
    }
    //Throw an exception
    delete user.hash;
    //Send back the user
    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string): Promise<{ token: string }> {
    const payload: UserPayload = {
      sub: userId,
      email,
    };

    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('JWT_EXPIRES'),
      secret: this.config.get('JWT_SECRET'),
    });

    return { token: accessToken };
  }
}
