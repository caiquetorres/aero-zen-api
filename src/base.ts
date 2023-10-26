import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { TokenRepository } from './auth/infra/repositories/token.repository';
import { EnvService } from './env/infra/services/env.service';

import { JwtGuard } from './auth/presentation/guards/jwt/jwt.guard';
import { RolesGuard } from './auth/presentation/guards/roles/roles.guard';
import { TokenGuard } from './auth/presentation/guards/token.guard';

import './core/domain/classes/result';
import './core/domain/classes/optional';

/**
 * Function that creates a `Nest` application.
 *
 * @returns an object that represents the application.
 */
export async function setupApp(app: NestExpressApplication): Promise<void> {
  setupPipes(app);
  setupGuards(app);
  setupSwagger(app);

  app.enableCors();
}

/**
 * Function that setup all the application base guards.
 *
 * @param app defines an object that represents the application instance.
 * @param reflector defines an object that contains abstractions
 * responsible for dealing with the Reflect API.
 */
function setupGuards(app: INestApplication): void {
  const reflector = app.get(Reflector);
  const tokenRepository = app.get(TokenRepository);

  app.useGlobalGuards(
    new TokenGuard(tokenRepository),
    new JwtGuard(reflector),
    new RolesGuard(reflector),
  );
}

/**
 * Function that setup all the global application pipes.
 *
 * @param app defines an object that represents the application instance.
 */
function setupPipes(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
}

/**
 * Function that setup the swagger.
 *
 * @param app defines an object that represents the application instance.
 * @param env defines an object that represents the application environment
 * service.
 */
function setupSwagger(app: INestApplication): void {
  const envService = app.get(EnvService);

  const config = new DocumentBuilder()
    .setTitle(envService.get('SWAGGER_TITLE'))
    .addBearerAuth();

  const document = SwaggerModule.createDocument(app, config.build());
  SwaggerModule.setup(`swagger`, app, document, {
    swaggerOptions: {
      docExpansion: 'none',
    },
  });
}
