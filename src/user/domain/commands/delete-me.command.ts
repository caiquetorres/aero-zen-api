import { IUser } from '../interfaces/user.interface';

export class DeleteMeCommand {
  readonly currentUser: IUser;

  constructor(data: { currentUser: IUser }) {
    this.currentUser = data.currentUser;

    Object.freeze(this);
  }
}
