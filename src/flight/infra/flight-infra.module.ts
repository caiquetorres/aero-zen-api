import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FlightRepository } from './repositories/flight.repository';
import { FlightMongooseRepository } from './repositories/mongoose/flight-mongoose.repository';
import {
  FlightDocument,
  FlightSchema,
} from './repositories/mongoose/flight.schema';
import { ReservationMongooseRepository } from './repositories/mongoose/reservation-mongoose.repository';
import {
  ReservationDocument,
  ReservationSchema,
} from './repositories/mongoose/reservation.schema';
import { ReservationRepository } from './repositories/reservation.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FlightDocument.name,
        schema: FlightSchema,
      },
      {
        name: ReservationDocument.name,
        schema: ReservationSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: FlightRepository,
      useClass: FlightMongooseRepository,
    },
    {
      provide: ReservationRepository,
      useClass: ReservationMongooseRepository,
    },
  ],
  exports: [FlightRepository, ReservationRepository],
})
export class FlightInfraModule {}
