import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { IReservation } from '../../domain/interfaces/reservation.interface';

import { FlightPresenter } from './flight.presenter';

export class ReservationPresenter {
  @ApiProperty({ example: new Types.ObjectId() })
  readonly id: string;

  @ApiProperty({ example: new Date() })
  readonly createdAt: Date;

  @ApiProperty({ example: new Date() })
  readonly updatedAt: Date;

  @ApiProperty({ example: '12A' })
  readonly seatNumber: string;

  @ApiProperty({ type: FlightPresenter })
  readonly flight: FlightPresenter;

  constructor(reservation: IReservation) {
    this.id = reservation.id.unwrap();
    this.createdAt = reservation.createdAt;
    this.updatedAt = reservation.updatedAt;
    this.seatNumber = reservation.seatNumber;
    this.flight = new FlightPresenter(reservation.flight);

    Object.freeze(this);
  }
}
