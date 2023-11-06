import { ApiProperty } from '@nestjs/swagger';

import { ICreateReservation } from '../../domain/interfaces/create-reservation.interface';

import { IsNotEmpty } from 'class-validator';

export class CreateReservationDto implements ICreateReservation {
  @ApiProperty({ example: '12A' })
  @IsNotEmpty({ message: 'Seat number must be defined' })
  seatNumber!: string;
}
