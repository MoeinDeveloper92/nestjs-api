import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppLoggerService {
  private logger: Logger = new Logger('BookMark Application');

  static getLevels(baseLevel: string) {
    const levels = ['fatal', 'error', 'warn', 'log', 'debug', 'verbose'];
    const l = levels.indexOf(baseLevel) + 1;
    if (l) {
      return levels.slice(0, l);
    }

    return levels.slice(0, 3);
  }

  verbose(message: any, context?: string): void;
  verbose(message: any, ...optionalParams: [...any, string?]): void;
  verbose(message: any, param?: string | [...any, string?]): void {
    if (typeof param === 'string') {
      // Redirect to the library function with a message and context
      this.logger.verbose(message, param);
    } else if (Array.isArray(param)) {
      // Redirect to the library function with a message and optioanl parameters
      this.logger.verbose(message, ...param);
    } else {
      //call the first library funciton with ole the message
      this.logger.verbose(message);
    }
  }

  debug(message: any, context?: string): void;
  debug(message: any, ...optionalParams: [...any, string?]): void;
  debug(message: any, param?: string | [...any, string?]): void {
    if (typeof param === 'string') {
      // Redirect to the library function with a message and context
      this.logger.debug(message, param);
    } else if (Array.isArray(param)) {
      // Redirect to the library function with a message and optional parameters
      this.logger.debug(message, ...param);
    } else {
      // Call the first library function with only the message
      this.logger.debug(message);
    }
  }

  log(message: any, context?: string): void;
  log(message: any, ...optionalParams: [...any, string?]): void;
  log(message: any, param?: string | [...any, string?]): void {
    if (typeof param === 'string') {
      // Redirect to the library function with a message and context
      this.logger.log(message, param);
    } else if (Array.isArray(param)) {
      // Redirect to the library function with a message and optional parameters
      this.logger.log(message, ...param);
    } else {
      // Call the first library function with only the message
      this.logger.log(message);
    }
  }

  warn(message: any, context?: string): void;
  warn(message: any, ...optionalParams: [...any, string?]): void;
  warn(message: any, param?: string | [...any, string?]): void {
    if (typeof param === 'string') {
      // Redirect to the library function with a message and context
      this.logger.warn(message, param);
    } else if (Array.isArray(param)) {
      // Redirect to the library function with a message and optional parameters
      this.logger.warn(message, ...param);
    } else {
      // Call the first library function with only the message
      this.logger.warn(message);
    }
  }

  error(message: any, context?: string): void;
  error(message: any, ...optionalParams: [...any, string?]): void;
  error(message: any, param?: string | [...any, string?]): void {
    if (typeof param === 'string') {
      // Redirect to the library function with a message and context
      this.logger.error(message, param);
    } else if (Array.isArray(param)) {
      // Redirect to the library function with a message and optional parameters
      this.logger.error(message, ...param);
    } else {
      // Call the first library function with only the message
      this.logger.error(message);
    }
  }

  fatal(message: any, context?: string): void;
  fatal(message: any, ...optionalParams: [...any, string?]): void;
  fatal(message: any, param?: string | [...any, string?]): void {
    if (typeof param === 'string') {
      // Redirect to the library function with a message and context
      this.logger.fatal(message, param);
    } else if (Array.isArray(param)) {
      // Redirect to the library function with a message and optional parameters
      this.logger.fatal(message, ...param);
    } else {
      // Call the first library function with only the message
      this.logger.fatal(message);
    }
  }
}
