import { Module, Type } from '@nestjs/common';
import { ICommandHandler, IQueryHandler } from '@nestjs/cqrs';

import { FlightInfraModule } from '../flight/infra/flight-infra.module';
import { ReservationInfraModule } from './infra/reservation-infra.module';

import { CreateReservationHandler } from './application/handlers/create-reservation.handler';

import { ReservationController } from './presentation/controllers/reservation.controller';

const commands: Type<ICommandHandler>[] = [CreateReservationHandler];
const queries: Type<IQueryHandler>[] = [];

@Module({
  imports: [ReservationInfraModule, FlightInfraModule],
  controllers: [ReservationController],
  providers: [...commands, ...queries],
})
export class ReservationModule {}
