import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RouteLoggerModule } from './tools/logging/route-logger/route-logger.module';
import { AppLoggerModule } from './tools/logging/app-logger/app-logger.module';

@Module({
  imports: [AuthModule, RouteLoggerModule, AppLoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
