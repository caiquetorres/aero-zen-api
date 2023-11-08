import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { IUser } from '../../../../user/domain/interfaces/user.interface';
import { IFlight } from '../../../domain/interfaces/flight.interface';
import { IReservation } from '../../../domain/interfaces/reservation.interface';
import { Reservation } from '../../../domain/models/reservation';

import { ReservationRepository } from '../reservation.repository';
import { ReservationMongooseMapper } from './reservation-mongoose.mapper';
import { ReservationDocument } from './reservation.schema';

@Injectable()
export class ReservationMongooseRepository implements ReservationRepository {
  constructor(
    @InjectModel(ReservationDocument.name)
    private readonly _model: Model<ReservationDocument>,
  ) {}

  async save(domain: IReservation): Promise<Result<Reservation>> {
    const document = ReservationMongooseMapper.toDocument(domain);

    if (document.isNone()) {
      return err(new Error('Null user domain'));
    }

    const { _id } = document.value._id;

    try {
      await this._model.updateOne({ _id }, document.value, { upsert: true });
      return this._model
        .findById(_id)
        .populate('owner')
        .populate('flight')
        .lean()
        .then((document) => ReservationMongooseMapper.toDomain(document)!)
        .then((domain) => ok(domain.unwrap()));
    } catch (error: any) {
      return err(error);
    }
  }

  async findOneById(id: string): Promise<Option<Reservation>> {
    return this._model
      .findById(id)
      .populate('owner')
      .populate('flight')
      .lean()
      .then((document) => ReservationMongooseMapper.toDomain(document));
  }

  async findReservationsByOwner(owner: IUser): Promise<Reservation[]> {
    const domains = await this._model
      .find({ owner: new Types.ObjectId(owner.id.unwrap()) })
      .populate('owner')
      .populate('flight')
      .lean()
      .then((documents) =>
        documents.map((doc) =>
          ReservationMongooseMapper.toDomain(doc).unwrap(),
        ),
      );

    return domains;
  }

  async findReservationsByFlight(flight: IFlight): Promise<Reservation[]> {
    const domains = await this._model
      .find({ flight: new Types.ObjectId(flight.id.unwrap()) })
      .populate('owner')
      .populate('flight')
      .lean()
      .then((documents) =>
        documents.map((doc) =>
          ReservationMongooseMapper.toDomain(doc).unwrap(),
        ),
      );

    return domains;
  }

  async deleteOne(domain: IReservation): Promise<Result<void>> {
    return this._model
      .deleteOne({ _id: new Types.ObjectId(domain.id.unwrap()) })
      .then(() => ok(undefined))
      .catch((error) => err(error));
  }

  async findBySeatNumberAndFlight(
    flight: IFlight,
    seatNumber: string,
  ): Promise<Option<Reservation>> {
    return await this._model
      .findOne({
        flight: new Types.ObjectId(flight.id.unwrap()),
        seatNumber,
      })
      .populate('owner')
      .populate('flight')
      .lean()
      .then((document) => ReservationMongooseMapper.toDomain(document));
  }
}
