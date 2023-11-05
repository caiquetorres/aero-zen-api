import { Module } from '@nestjs/common';

import { FlightInfraModule } from './infra/flight-infra.module';

import { CreateFlightHandler } from './application/handlers/create-flight.handler';

import { FlightController } from './presentation/controllers/flight.controller';

@Module({
  imports: [FlightInfraModule],
  controllers: [FlightController],
  providers: [CreateFlightHandler],
})
export class FlightModule {}
