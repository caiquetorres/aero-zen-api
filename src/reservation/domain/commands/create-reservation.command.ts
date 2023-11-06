import { IFlight } from '../../../flight/domain/interfaces/flight.interface';
import { IUser } from '../../../user/domain/interfaces/user.interface';

import { ICreateReservation } from '../interfaces/create-reservation.interface';

export class CreateReservationCommand {
  readonly currentUser: IUser;

  readonly flight: IFlight;

  readonly data: ICreateReservation;

  constructor(command: {
    currentUser: IUser;
    flight: IFlight;
    data: ICreateReservation;
  }) {
    this.currentUser = command.currentUser;
    this.flight = command.flight;
    this.data = command.data;

    Object.freeze(this);
  }
}
