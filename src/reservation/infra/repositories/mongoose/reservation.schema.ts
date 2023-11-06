import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { FlightDocument } from '../../../../flight/infra/repositories/mongoose/flight.schema';
import { UserDocument } from '../../../../user/infra/repositories/mongoose/user.document';

@Schema({ collection: 'reservations' })
export class ReservationDocument {
  _id: Types.ObjectId;

  @Prop({ required: true, type: Date })
  createdAt: Date;

  @Prop({ required: true, type: Date })
  updatedAt: Date;

  @Prop({ required: true, type: String })
  seatNumber: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: FlightDocument.name,
  })
  flight: Types.ObjectId | FlightDocument;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: UserDocument.name,
  })
  owner: Types.ObjectId | UserDocument;

  constructor(reservation: {
    id: Types.ObjectId;
    createdAt: number | string | Date;
    updatedAt: number | string | Date;
    seatNumber: string;
    flight: Types.ObjectId | FlightDocument;
    owner: Types.ObjectId | UserDocument;
  }) {
    this._id = reservation.id;
    this.createdAt = new Date(reservation.createdAt);
    this.updatedAt = new Date(reservation.updatedAt);
    this.seatNumber = reservation.seatNumber;
    this.flight = reservation.flight;
    this.owner = reservation.owner;
  }
}

export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);
