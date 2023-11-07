import { toOptional } from '../../../core/domain/classes/option';
import { User } from '../../../user/domain/entities/user';
import { IUser } from '../../../user/domain/interfaces/user.interface';

import { IFlight } from '../interfaces/flight.interface';
import { IReservation } from '../interfaces/reservation.interface';
import { Flight } from './flight';

export class Reservation implements IReservation {
  readonly id: Option<string>;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  readonly seatNumber: string;

  readonly flight: Flight;

  readonly owner: User;

  constructor(reservation: {
    id?: string;
    createdAt?: number | string | Date;
    updatedAt?: number | string | Date;
    flight: IFlight;
    seatNumber: string;
    owner: IUser;
  }) {
    this.id = toOptional(reservation.id);

    this.createdAt = reservation.createdAt
      ? new Date(reservation.createdAt)
      : new Date();

    this.updatedAt = reservation.updatedAt
      ? new Date(reservation.updatedAt)
      : new Date();

    this.flight = new Flight({
      ...reservation.flight,
      id: reservation.flight.id.unwrap(),
    });

    this.seatNumber = reservation.seatNumber;

    this.owner = new User({
      ...reservation.owner,
      id: reservation.owner.id.unwrap(),
    });

    Object.freeze(this);
  }
}
