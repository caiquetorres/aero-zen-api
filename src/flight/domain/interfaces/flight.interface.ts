import { FlightClass } from '../enums/flight-class.enum';
import { SeatClass } from '../enums/seat-class.enum';
import { SeatStatus } from '../enums/seat-status.enum';

export interface ISeat {
  readonly seatNumber: string;

  readonly seatClass: SeatClass;

  readonly status: SeatStatus;

  readonly price: number;
}

export interface IAirport {
  readonly city: string;

  readonly name: string;

  readonly iataCode: string;
}

export interface ILayover {
  readonly airport: IAirport;

  readonly time: number;
}

export interface IFlight {
  readonly id: Option<string>;

  readonly airline: string;

  readonly departureTime: Date;

  readonly arrivalTime: Date;

  readonly departureAirport: IAirport;

  readonly arrivalAirport: IAirport;

  readonly price: number;

  readonly flightClass: FlightClass;

  readonly seats: ISeat[];

  readonly layovers: ILayover[];
}
