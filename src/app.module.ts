import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RouteLoggerModule } from './tools/logging/route-logger/route-logger.module';
import { AppLoggerModule } from './tools/logging/app-logger/app-logger.module';
import { RouteLoggerService } from './tools/logging/route-logger/route-lgger.service';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    RouteLoggerModule,
    AppLoggerModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RouteLoggerService).forRoutes('*');
  }
}
