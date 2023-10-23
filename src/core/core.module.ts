import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { PathLoggerMiddleware } from './presentation/middlewares/path-logger.middleware';

import { EnvModule } from '../env/env.module';

@Module({
  imports: [EnvModule.forRoot({ envFilePath: ['.env'] })],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PathLoggerMiddleware).forRoutes('*');
  }
}
