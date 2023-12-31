import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { EnvService } from './env/infra/services/env.service';

import './core/domain/classes/result';
import './core/domain/classes/option';

/**
 * Function that creates a `Nest` application.
 *
 * @returns an object that represents the application.
 */
export async function setupApp(app: NestExpressApplication): Promise<void> {
  setupPipes(app);
  setupSwagger(app);

  app.enableCors();
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
