import { SeatClass } from '../enums/seat-class.enum';

export interface ISeat {
  readonly seatNumber: string;

  readonly seatClass: SeatClass;

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

  readonly createdAt: Date;

  readonly updatedAt: Date;

  readonly airline: string;

  readonly departureTime: Date;

  readonly arrivalTime: Date;

  readonly departureAirport: IAirport;

  readonly arrivalAirport: IAirport;

  readonly seats: ISeat[];

  readonly layovers: ILayover[];
}
