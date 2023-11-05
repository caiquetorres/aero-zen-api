import { IUser } from '../../../user/domain/interfaces/user.interface';

import { ICreateFlight } from '../interfaces/create-flight.interface';

export class CreateFlightCommand {
  readonly currentUser: IUser;

  readonly data: ICreateFlight;

  constructor(command: { currentUser: IUser; data: ICreateFlight }) {
    this.currentUser = command.currentUser;
    this.data = command.data;

    Object.freeze(this);
  }
}
