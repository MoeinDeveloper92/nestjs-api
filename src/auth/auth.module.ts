import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EncryptModule } from '../tools/encrypt/encrypt.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/index';
@Module({
  imports: [EncryptModule, JwtModule.register({})],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
