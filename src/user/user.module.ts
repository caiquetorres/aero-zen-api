import { Module } from '@nestjs/common';

import { UserInfraModule } from './infra/user-infra.module';

import { CreateUserHandler } from './application/handlers/create-user.handler';

import { UserController } from './presentation/controllers/user.controller';

@Module({
  imports: [UserInfraModule],
  controllers: [UserController],
  providers: [CreateUserHandler],
})
export class UserModule {}
