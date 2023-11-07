import { Module, Type } from '@nestjs/common';
import { ICommandHandler, IQueryHandler } from '@nestjs/cqrs';

import { FlightInfraModule } from '../flight/infra/flight-infra.module';
import { UserInfraModule } from './infra/user-infra.module';

import { CreateUserHandler } from './application/handlers/create-user.handler';
import { FindAllReservationsHandler } from './application/handlers/find-all-reservations.handler';
import { GetMeQueryHandler as GetMeHandler } from './application/handlers/get-me.handler';
import { UpdateMeHandler } from './application/handlers/update-me.handler';

import { UserReservationController } from './presentation/controllers/user-reservation.controller';
import { UserController } from './presentation/controllers/user.controller';

const commandHandlers: Type<ICommandHandler<any>>[] = [
  CreateUserHandler,
  UpdateMeHandler,
];
const queryHandlers: Type<IQueryHandler<any>>[] = [
  GetMeHandler,
  FindAllReservationsHandler,
];

@Module({
  imports: [UserInfraModule, FlightInfraModule],
  controllers: [UserController, UserReservationController],
  providers: [...commandHandlers, ...queryHandlers],
})
export class UserModule {}
