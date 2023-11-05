import { ApiProperty } from '@nestjs/swagger';

import { FlightClass } from '../../domain/enums/flight-class.enum';
import { SeatClass } from '../../domain/enums/seat-class.enum';
import { SeatStatus } from '../../domain/enums/seat-status.enum';
import {
  ICreateAirport,
  ICreateLayover,
  ICreateSeat,
  ICreateFlight,
} from '../../domain/interfaces/create-flight.interface';

export class CreateSeatDto implements ICreateSeat {
  @ApiProperty({ example: '12A' })
  seatNumber!: string;

  @ApiProperty({ example: SeatClass.economy })
  seatClass!: Wrapper<SeatClass>;

  @ApiProperty({ example: SeatStatus.available })
  status!: Wrapper<SeatStatus>;

  @ApiProperty({ example: 1500 })
  price!: number;
}

export class CreateAirportDto implements ICreateAirport {
  @ApiProperty({ example: 'Recife' })
  city!: string;

  @ApiProperty({ example: 'Recife/Guararapes International Airport' })
  name!: string;

  @ApiProperty({ example: 'REC' })
  iataCode!: string;
}

export class CreateLayoverDto implements ICreateLayover {
  @ApiProperty({ type: CreateAirportDto })
  airport!: CreateAirportDto;

  @ApiProperty({ example: 2 * 60 * 60 * 1000 })
  time!: number;
}

export class CreateFlightDto implements ICreateFlight {
  @ApiProperty({ example: 'Azul Linhas Aéreas' })
  airline!: string;

  @ApiProperty({ example: new Date('2023-11-15T10:30:00') })
  departureTime!: Date;

  @ApiProperty({ example: new Date('2023-11-15T13:45:00') })
  arrivalTime!: Date;

  @ApiProperty({ type: CreateAirportDto })
  departureAirport!: CreateAirportDto;

  @ApiProperty({ type: CreateAirportDto })
  arrivalAirport!: CreateAirportDto;

  @ApiProperty({ example: 1500 })
  price!: number;

  @ApiProperty({ example: FlightClass.economy })
  flightClass!: Wrapper<FlightClass>;

  @ApiProperty({ type: CreateSeatDto, isArray: true })
  seats!: CreateSeatDto[];

  @ApiProperty({ type: CreateLayoverDto, isArray: true })
  layovers!: CreateLayoverDto[];
}
