import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as os from 'os';
import { AppLoggerService } from './tools/logging/app-logger/app-logger.service';

function getHostIpAddress(): string | undefined {
  const interfaces = os.networkInterfaces();

  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }

  return undefined;
}

async function bootstrap() {
  const baseLogLevel = 'debug';
  console.log('Log Level is:', baseLogLevel);
  let loggerLevels = [];

  loggerLevels = AppLoggerService.getLevels(baseLogLevel);
  const hostIP = getHostIpAddress();
  const app = await NestFactory.create(AppModule, {
    logger: loggerLevels,
  });
  const logger = new AppLoggerService();
  await app.listen(process.env.PORT ?? 5000, hostIP, () => {
    logger.log(
      `The app is running on the porst:${5000}and the IP is ${hostIP}`,
    );
  });
}
bootstrap();
