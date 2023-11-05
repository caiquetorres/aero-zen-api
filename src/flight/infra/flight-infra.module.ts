import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FlightRepository } from './repositories/flight.repository';
import { FlightMongooseRepository } from './repositories/mongoose/flight-mongoose.repository';
import {
  FlightDocument,
  FlightSchema,
} from './repositories/mongoose/flight.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FlightDocument.name,
        schema: FlightSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: FlightRepository,
      useClass: FlightMongooseRepository,
    },
  ],
  exports: [FlightRepository],
})
export class FlightInfraModule {}
