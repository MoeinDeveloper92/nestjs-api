import { Controller, Get, UseGuards, Patch } from '@nestjs/common';
import { User } from '../auth/decorator/user.decorator';
import { UserDto } from '../auth/dto/auth.dto';
import { JwtGuard } from '../auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@User() user: UserDto) {
    return 'User info';
  }

  @Patch()
  editUser() {}
}
