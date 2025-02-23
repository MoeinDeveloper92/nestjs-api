import { Module } from '@nestjs/common';
import { AppLoggerModule } from '../app-logger/app-logger.module';
import { RouteLoggerService } from './route-lgger.service';

@Module({
  imports: [AppLoggerModule],
  providers: [RouteLoggerService],
  exports: [RouteLoggerService],
})
export class RouteLoggerModule {}
