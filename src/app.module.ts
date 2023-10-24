import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CoreModule, UserModule, CqrsModule.forRoot()],
})
export class AppModule {}
