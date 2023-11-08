import { Module, Type } from '@nestjs/common';
import { ICommandHandler, IQueryHandler } from '@nestjs/cqrs';

import { FlightInfraModule } from './infra/flight-infra.module';

import { CreateFlightHandler } from './application/handlers/create-flight.handler';
import { CreateReservationHandler } from './application/handlers/create-reservation.handler';
import { DeleteReservationHandler } from './application/handlers/delete-reservation.handler';
import { FindAvailableSeatsHandler } from './application/handlers/find-available-seats.handler';
import { FindFlightsHandler } from './application/handlers/find-flights.handler';
import { FindOneFlightHandler } from './application/handlers/find-one-flight.handler';

import { FlightReservationController } from './presentation/controllers/flight-reservation.controller';
import { FlightController } from './presentation/controllers/flight.controller';
import { ReservationController } from './presentation/controllers/reservation.controller';

const commands: Type<ICommandHandler>[] = [
  CreateFlightHandler,
  CreateReservationHandler,
  DeleteReservationHandler,
];
const queries: Type<IQueryHandler>[] = [
  FindFlightsHandler,
  FindOneFlightHandler,
  FindAvailableSeatsHandler,
];

@Module({
  imports: [FlightInfraModule],
  controllers: [
    FlightController,
    FlightReservationController,
    ReservationController,
  ],
  providers: [...commands, ...queries],
})
export class FlightModule {}
