import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { SeatClass } from '../../../domain/enums/seat-class.enum';

@Schema()
export class AirportDocument {
  @Prop({ required: true, type: String })
  city: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  iataCode: string;

  constructor(airline: { city: string; name: string; iataCode: string }) {
    this.city = airline.city;
    this.name = airline.name;
    this.iataCode = airline.iataCode;
  }
}

const AirportSchema = SchemaFactory.createForClass(AirportDocument);

@Schema()
export class SeatDocument {
  @Prop({ required: true, type: String })
  seatNumber: string;

  @Prop({ required: true, type: String })
  seatClass: SeatClass;

  @Prop({ required: true, type: Number })
  price: number;

  constructor(seat: {
    seatNumber: string;
    seatClass: SeatClass;
    price: number;
  }) {
    this.seatNumber = seat.seatNumber;
    this.seatClass = seat.seatClass;
    this.price = seat.price;
  }
}

const SeatSchema = SchemaFactory.createForClass(SeatDocument);

@Schema()
export class LayoverDocument {
  @Prop({ required: true, type: Number })
  time: number;

  @Prop({
    required: true,
    ref: AirportDocument.name,
    type: AirportSchema,
  })
  airport: AirportDocument;

  constructor(layover: { time: number; airport: AirportDocument }) {
    this.time = layover.time;
    this.airport = layover.airport;
  }
}

const LayoverSchema = SchemaFactory.createForClass(LayoverDocument);

@Schema({ collection: 'flights' })
export class FlightDocument {
  _id: Types.ObjectId;

  @Prop({ required: true, type: Date })
  createdAt: Date;

  @Prop({ required: true, type: Date })
  updatedAt: Date;

  @Prop({ required: true, type: String })
  airline: string;

  @Prop({ required: true, type: Date })
  departureTime: Date;

  @Prop({ required: true, type: Date })
  arrivalTime: Date;

  @Prop({
    required: true,
    ref: AirportDocument.name,
    type: AirportSchema,
  })
  departureAirport: AirportDocument;

  @Prop({
    required: true,
    ref: AirportDocument.name,
    type: AirportSchema,
  })
  arrivalAirport: AirportDocument;

  @Prop({
    required: true,
    ref: SeatDocument.name,
    type: [SeatSchema],
  })
  seats: SeatDocument[];

  @Prop({
    required: true,
    ref: LayoverDocument.name,
    type: [LayoverSchema],
  })
  layovers: LayoverDocument[];

  constructor(flight: {
    id: Types.ObjectId;
    createdAt: number | string | Date;
    updatedAt: number | string | Date;
    airline: string;
    departureTime: number | string | Date;
    arrivalTime: number | string | Date;
    departureAirport: AirportDocument;
    arrivalAirport: AirportDocument;
    seats: SeatDocument[];
    layovers: LayoverDocument[];
  }) {
    this._id = flight.id;
    this.createdAt = new Date(flight.createdAt);
    this.updatedAt = new Date(flight.updatedAt);
    this.airline = flight.airline;
    this.departureTime = new Date(flight.departureTime);
    this.arrivalTime = new Date(flight.arrivalTime);
    this.departureAirport = flight.departureAirport;
    this.arrivalAirport = flight.arrivalAirport;
    this.seats = flight.seats;
    this.layovers = flight.layovers;
  }
}

export const FlightSchema = SchemaFactory.createForClass(FlightDocument);
