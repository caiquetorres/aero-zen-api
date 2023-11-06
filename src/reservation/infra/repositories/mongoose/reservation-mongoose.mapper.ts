import { Types } from 'mongoose';

import { IReservation } from '../../../domain/interfaces/reservation.interface';
import { Reservation } from '../../../domain/models/reservation';

import { FlightMongooseMapper } from '../../../../flight/infra/repositories/mongoose/flight-mongoose.mapper';
import { FlightDocument } from '../../../../flight/infra/repositories/mongoose/flight.schema';
import { UserMongooseMapper } from '../../../../user/infra/repositories/mongoose/user-mongoose.mapper';
import { UserDocument } from '../../../../user/infra/repositories/mongoose/user.document';

import { ReservationDocument } from './reservation.schema';

export class ReservationMongooseMapper {
  static toDomain(doc: ReservationDocument | null): Option<Reservation> {
    if (!doc) {
      return none();
    }

    const flightDoc = FlightMongooseMapper.toDomain(
      doc.flight as FlightDocument,
    ).unwrap();

    const ownerDoc = UserMongooseMapper.toDomain(
      doc.owner as UserDocument,
    ).unwrap();

    return some(
      new Reservation({
        id: doc._id.toString(),
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
        seatNumber: doc.seatNumber,
        flight: flightDoc,
        owner: ownerDoc,
      }),
    );
  }

  static toDocument(domain: IReservation | null): Option<ReservationDocument> {
    if (!domain) {
      return none();
    }

    const id = domain.id.isSome()
      ? new Types.ObjectId(domain.id.unwrap())
      : new Types.ObjectId();

    return some(
      new ReservationDocument({
        id: id,
        createdAt: domain.createdAt,
        updatedAt: domain.updatedAt,
        seatNumber: domain.seatNumber,
        flight: new Types.ObjectId(domain.flight.id.unwrap()),
        owner: new Types.ObjectId(domain.owner.id.unwrap()),
      }),
    );
  }
}
