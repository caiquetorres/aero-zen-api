import { IUser } from '../../../user/domain/interfaces/user.interface';

import { IFlight } from '../interfaces/flight.interface';

export class FindAvailableSeatsQuery {
  readonly currentUser: IUser;

  readonly flight: IFlight;

  constructor(query: { currentUser: IUser; flight: IFlight }) {
    this.currentUser = query.currentUser;
    this.flight = query.flight;

    Object.freeze(this);
  }
}
