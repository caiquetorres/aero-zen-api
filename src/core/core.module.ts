import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MongooseConfig } from './infra/config/mongoose/mongoose.config';
import { CoreInfraModule } from './infra/core-infra.module';

import { PathLoggerMiddleware } from './presentation/middlewares/path-logger.middleware';

import { EnvModule } from '../env/env.module';

@Module({
  imports: [
    CoreInfraModule,
    EnvModule.forRoot(),
    MongooseModule.forRootAsync({ useClass: MongooseConfig }),
  ],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(PathLoggerMiddleware).forRoutes('*');
  }
}
