import { IUser } from '../../../user/domain/interfaces/user.interface';

export class FindOneFlightQuery {
  readonly currentUser: IUser;

  readonly flightId: string;

  constructor(query: { currentUser: IUser; flightId: string }) {
    this.currentUser = query.currentUser;
    this.flightId = query.flightId;

    Object.freeze(this);
  }
}
