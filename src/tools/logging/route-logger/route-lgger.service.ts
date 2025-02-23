import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppLoggerService } from '../app-logger/app-logger.service';

@Injectable()
export class RouteLoggerService implements NestMiddleware {
  constructor(private readonly logger: AppLoggerService) {}
  use(request: Request, response: Response, next: NextFunction): void {
    const { method, query: queryParams, baseUrl: path } = request;

    //logging the Request
    setImmediate(async () => {
      const requestLog = {
        method,
        path,
        queryParams,
        body: request.body,
      };
      this.logger.log(`Request:${JSON.stringify(requestLog)}`);
    });

    //Extracting resposne body to see what we area sending back
    let body = {};
    const chunks = [];
    const oldEnd = response.end;
    response.end = (chunk) => {
      if (chunk) {
        chunks.push(Buffer.from(chunk));
      }
      body = Buffer.concat(chunks).toString('utf-8');
      return oldEnd.call(response, body);
    };

    //Loggin resposne
    response.on('finish', async () => {
      return setTimeout(() => {
        const responseLogInfo = {
          method,
          path,
          statusCode: response.statusCode,
        };
        const responseLogDebug = {
          method,
          path,
          statusCode: response.statusCode,
          body,
        };

        this.logger.log(`Response: ${JSON.stringify(responseLogInfo)}`);
        this.logger.debug(`Response: ${JSON.stringify(responseLogDebug)}`);
      });
    });

    next();
  }
}
