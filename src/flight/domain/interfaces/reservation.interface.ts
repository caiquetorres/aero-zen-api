import { IUser } from '../../../user/domain/interfaces/user.interface';

import { IFlight } from './flight.interface';

export interface IReservation {
  readonly id: Option<string>;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  readonly flight: IFlight;

  readonly seatNumber: string;

  readonly owner: IUser;
}
