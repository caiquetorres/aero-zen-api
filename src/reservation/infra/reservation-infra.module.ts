import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

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
        name: ReservationDocument.name,
        schema: ReservationSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: ReservationRepository,
      useClass: ReservationMongooseRepository,
    },
  ],
  exports: [ReservationRepository],
})
export class ReservationInfraModule {}
