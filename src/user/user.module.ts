import { Module, Type } from '@nestjs/common';
import { ICommandHandler, IQueryHandler } from '@nestjs/cqrs';

import { UserInfraModule } from './infra/user-infra.module';

import { CreateUserHandler } from './application/handlers/create-user.handler';
import { GetMeQueryHandler as GetMeHandler } from './application/handlers/get-me.handler';

import { UserController } from './presentation/controllers/user.controller';

const commandHandlers: Type<ICommandHandler<any>>[] = [CreateUserHandler];
const queryHandlers: Type<IQueryHandler<any>>[] = [GetMeHandler];

@Module({
  imports: [UserInfraModule],
  controllers: [UserController],
  providers: [...commandHandlers, ...queryHandlers],
})
export class UserModule {}
