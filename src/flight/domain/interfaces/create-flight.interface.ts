import { FlightClass } from '../../domain/enums/flight-class.enum';
import { SeatClass } from '../../domain/enums/seat-class.enum';
import { SeatStatus } from '../../domain/enums/seat-status.enum';

export interface ICreateAirport {
  city: string;

  name: string;

  iataCode: string;
}

export interface ICreateLayover {
  airport: ICreateAirport;

  time: number;
}

export interface ICreateSeat {
  seatNumber: string;

  seatClass: SeatClass;

  status: SeatStatus;

  price: number;
}

export interface ICreateFlight {
  airline: string;

  departureTime: Date;

  arrivalTime: Date;

  departureAirport: ICreateAirport;

  arrivalAirport: ICreateAirport;

  price: number;

  flightClass: FlightClass;

  seats: ICreateSeat[];

  layovers: ICreateLayover[];
}
