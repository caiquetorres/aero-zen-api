import { ApiProperty } from '@nestjs/swagger';

import {
  ICreateAirport,
  ICreateLayover,
  ICreateFlight,
} from '../../domain/interfaces/create-flight.interface';

import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Matches,
  ValidateNested,
} from 'class-validator';

export class CreateAirportDto implements ICreateAirport {
  @ApiProperty({ example: 'Recife' })
  @IsNotEmpty({ message: 'City must be defined' })
  city!: string;

  @ApiProperty({ example: 'Recife/Guararapes International Airport' })
  @IsNotEmpty({ message: 'Name must be defined' })
  name!: string;

  @ApiProperty({ example: 'REC' })
  @IsNotEmpty({ message: 'IATA code must be defined' })
  @Matches(/^[A-Z]{3}$/, {
    message: 'IATA code must be formed of three uppercase characters',
  })
  iataCode!: string;
}

export class CreateLayoverDto implements ICreateLayover {
  @ApiProperty({ type: CreateAirportDto })
  @ValidateNested()
  @Type(() => CreateAirportDto)
  airport!: CreateAirportDto;

  @ApiProperty({ example: 2 * 60 * 60 * 1000 })
  @IsInt({ message: 'Time must be greater than or equal to 0' })
  time!: number;
}

export class CreateFlightDto implements ICreateFlight {
  @ApiProperty({ example: 'Azul Linhas Aéreas' })
  @IsNotEmpty({ message: 'Airline must be defined' })
  airline!: string;

  @ApiProperty({ example: new Date('2023-11-15T10:30:00') })
  @IsDateString({}, { message: 'Departure time must be a valid date' })
  departureTime!: string;

  @ApiProperty({ example: new Date('2023-11-15T13:45:00') })
  @IsDateString({}, { message: 'Arrival time must be a valid date' })
  arrivalTime!: string;

  @ApiProperty({ type: CreateAirportDto })
  @ValidateNested()
  @Type(() => CreateAirportDto)
  departureAirport!: CreateAirportDto;

  @ApiProperty({ type: CreateAirportDto })
  @ValidateNested()
  @Type(() => CreateAirportDto)
  arrivalAirport!: CreateAirportDto;

  @ApiProperty({ type: CreateLayoverDto, isArray: true })
  @IsOptional()
  @IsArray({ message: 'Layovers must be an array' })
  @ValidateNested({ each: true })
  @Type(() => CreateLayoverDto)
  layovers!: CreateLayoverDto[];
}
