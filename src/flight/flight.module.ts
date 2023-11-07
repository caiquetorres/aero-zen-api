import { Module, Type } from '@nestjs/common';
import { ICommandHandler, IQueryHandler } from '@nestjs/cqrs';

import { FlightInfraModule } from './infra/flight-infra.module';

import { CreateFlightHandler } from './application/handlers/create-flight.handler';
import { CreateReservationHandler } from './application/handlers/create-reservation.handler';
import { FindFlightsHandler } from './application/handlers/find-flights.handler';
import { FindOneFlightHandler } from './application/handlers/find-one-flight.handler';

import { FlightReservationController } from './presentation/controllers/flight-reservation.controller';
import { FlightController } from './presentation/controllers/flight.controller';

const commands: Type<ICommandHandler>[] = [
  CreateFlightHandler,
  CreateReservationHandler,
];
const queries: Type<IQueryHandler>[] = [
  FindFlightsHandler,
  FindOneFlightHandler,
];

@Module({
  imports: [FlightInfraModule],
  controllers: [FlightController, FlightReservationController],
  providers: [...commands, ...queries],
})
export class FlightModule {}
