import { Module, Type } from '@nestjs/common';
import { ICommandHandler, IQueryHandler } from '@nestjs/cqrs';

import { FlightInfraModule } from './infra/flight-infra.module';

import { CreateFlightHandler } from './application/handlers/create-flight.handler';
import { FindFlightsHandler } from './application/handlers/find-flights.handler';
import { FindOneFlightHandler } from './application/handlers/find-one-flight.handler';

import { FlightController } from './presentation/controllers/flight.controller';

const commands: Type<ICommandHandler>[] = [CreateFlightHandler];
const queries: Type<IQueryHandler>[] = [
  FindFlightsHandler,
  FindOneFlightHandler,
];

@Module({
  imports: [FlightInfraModule],
  controllers: [FlightController],
  providers: [...commands, ...queries],
})
export class FlightModule {}
