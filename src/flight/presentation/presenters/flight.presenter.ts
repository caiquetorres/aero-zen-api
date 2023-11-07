import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

import {
  IAirport,
  IFlight,
  ILayover,
} from '../../domain/interfaces/flight.interface';

class AirportPresenter {
  @ApiProperty({ example: 'Recife' })
  readonly city: string;

  @ApiProperty({ example: 'Recife/Guararapes International Airport' })
  readonly name: string;

  @ApiProperty({ example: 'REC' })
  readonly iataCode: string;

  constructor(airport: IAirport) {
    this.city = airport.city;
    this.name = airport.name;
    this.iataCode = airport.iataCode;

    Object.freeze(this);
  }
}

export class LayoverPresenter {
  @ApiProperty({ type: AirportPresenter })
  readonly airport: AirportPresenter;

  @ApiProperty({ example: 2 * 60 * 60 * 1000 })
  readonly time: number;

  constructor(layover: ILayover) {
    this.airport = new AirportPresenter(layover.airport);
    this.time = layover.time;
    Object.freeze(this);
  }
}

export class FlightPresenter {
  @ApiProperty({ example: new Types.ObjectId() })
  readonly id: string;

  @ApiProperty({ example: new Date() })
  readonly createdAt: Date;

  @ApiProperty({ example: new Date() })
  readonly updatedAt: Date;

  @ApiProperty({ example: 'Azul Linhas Aéreas' })
  readonly airline: string;

  @ApiProperty({ example: new Date('2023-11-15T10:30:00') })
  readonly departureTime: Date;

  @ApiProperty({ example: new Date('2023-11-15T13:45:00') })
  readonly arrivalTime: Date;

  @ApiProperty({ type: AirportPresenter })
  readonly departureAirport: AirportPresenter;

  @ApiProperty({ type: AirportPresenter })
  readonly arrivalAirport: AirportPresenter;

  @ApiProperty({ type: LayoverPresenter, isArray: true })
  readonly layovers: LayoverPresenter[];

  constructor(flight: IFlight) {
    this.id = flight.id.unwrap();
    this.createdAt = new Date(flight.createdAt);
    this.updatedAt = new Date(flight.updatedAt);
    this.airline = flight.airline;
    this.departureTime = flight.departureTime;
    this.arrivalTime = flight.arrivalTime;
    this.departureAirport = new AirportPresenter(flight.departureAirport);
    this.arrivalAirport = new AirportPresenter(flight.arrivalAirport);
    this.layovers = flight.layovers.map(
      (layover) => new LayoverPresenter(layover),
    );

    Object.freeze(this);
  }
}
