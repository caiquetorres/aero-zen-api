import { IUser } from '../interfaces/user.interface';

export class FindAllReservationsQuery {
  readonly currentUser: IUser;

  constructor(reservation: { currentUser: IUser }) {
    this.currentUser = reservation.currentUser;

    Object.freeze(this);
  }
}
