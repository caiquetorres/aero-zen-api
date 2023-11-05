import { toOptional } from '../../../core/domain/classes/option';

import { FlightClass } from '../enums/flight-class.enum';
import { SeatClass } from '../enums/seat-class.enum';
import { SeatStatus } from '../enums/seat-status.enum';
import { SeatFactory } from '../factories/seat.factory';
import {
  IAirport,
  IFlight,
  ILayover,
  ISeat,
} from '../interfaces/flight.interface';

export class Seat implements ISeat {
  readonly seatNumber: string;

  readonly seatClass: SeatClass;

  readonly status: SeatStatus;

  readonly price: number;

  constructor(seat: {
    status: SeatStatus;
    seatClass: SeatClass;
    price: number;
    seatNumber: string;
  }) {
    this.status = seat.status;
    this.seatClass = seat.seatClass;
    this.seatNumber = seat.seatNumber;
    this.price = seat.price;

    Object.freeze(this);
  }
}

export class Airport implements IAirport {
  readonly city: string;

  readonly name: string;

  readonly iataCode: string;

  constructor(airport: { city: string; name: string; iataCode: string }) {
    this.city = airport.city;
    this.name = airport.name;
    this.iataCode = airport.iataCode;

    Object.freeze(this);
  }
}

export class Layover implements ILayover {
  readonly airport: Airport;

  readonly time: number;

  constructor(layover: { airport: IAirport; time: number }) {
    this.airport = new Airport(layover.airport);
    this.time = layover.time;

    Object.freeze(this);
  }
}

export class Flight implements IFlight {
  readonly id: Option<string>;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  readonly airline: string;

  readonly departureTime: Date;

  readonly arrivalTime: Date;

  readonly departureAirport: Airport;

  readonly arrivalAirport: Airport;

  readonly price: number;

  readonly flightClass: FlightClass;

  readonly seats: Seat[];

  readonly layovers: Layover[];

  constructor(flight: {
    id?: string;
    createdAt?: number | string | Date;
    updatedAt?: number | string | Date;
    airline: string;
    departureAirport: IAirport;
    arrivalAirport: IAirport;
    departureTime: number | string | Date;
    arrivalTime: number | string | Date;
    price: number;
    flightClass: FlightClass;
    layovers?: ILayover[];
    seats?: ISeat[];
  }) {
    this.id = toOptional(flight.id);
    this.createdAt = flight.createdAt ? new Date(flight.createdAt) : new Date();
    this.updatedAt = flight.updatedAt ? new Date(flight.updatedAt) : new Date();
    this.airline = flight.airline;
    this.departureTime = new Date(flight.departureTime);
    this.arrivalTime = new Date(flight.arrivalTime);
    this.departureAirport = new Airport(flight.departureAirport);
    this.arrivalAirport = new Airport(flight.arrivalAirport);
    this.price = flight.price;
    this.flightClass = flight.flightClass;

    this.layovers = flight.layovers
      ? flight.layovers.map((layover) => new Layover(layover))
      : [];

    this.seats = flight.seats
      ? flight.seats.map((seat) => new Seat(seat))
      : new SeatFactory().create(20, 6);

    Object.freeze(this);
  }
}
