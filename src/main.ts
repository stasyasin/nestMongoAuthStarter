import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as cookieSession from 'cookie-session';
import * as cookieParser from 'cookie-parser';
import { configuration } from './config/configuration';
import { CSRFValidator } from 'csrf-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.enableCors();
  app.use(cookieParser(configuration().cookieSecret)); // not sure if this needed since we pass it in CSRFValidator
  app.use(cookieSession({keys: configuration().cookieKeys})); // not sure if this needed since we pass it in CSRFValidator
  await app.listen(configuration().port);

  CSRFValidator.instance(
    {
      tokenSecretKey: 'A secret key for encrypting csrf token',
      ignoredMethods: [],
      ignoredRoutes: ['/login'],
      entryPointRoutes: ['/login'],
      cookieKey: 'Optional - Custom csrf cookie key',
      cookieSecretKey: configuration().cookieSecret,
      cookieSessionKeys: configuration().cookieKeys
    }
  ).configureApp(app);
}
bootstrap();
