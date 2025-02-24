import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private readonly confg: ConfigService) {
    super({
      datasources: {
        db: {
          url: confg.get('DATABASE_URL'),
        },
      },
    });
  }
}
