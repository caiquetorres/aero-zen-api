import { IUser } from '../../../user/domain/interfaces/user.interface';

import { IReservation } from '../interfaces/reservation.interface';

export class DeleteReservationCommand {
  readonly currentUser: IUser;

  readonly reservation: IReservation;

  constructor(command: { currentUser: IUser; reservation: IReservation }) {
    this.currentUser = command.currentUser;
    this.reservation = command.reservation;

    Object.freeze(this);
  }
}
