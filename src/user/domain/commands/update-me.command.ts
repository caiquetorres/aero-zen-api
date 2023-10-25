import { IUpdateMe } from '../interfaces/update-me.interface';
import { IUser } from '../interfaces/user.interface';

export class UpdateMeCommand {
  readonly currentUser: IUser;

  readonly data: IUpdateMe;

  constructor(command: { currentUser: IUser; data: IUpdateMe }) {
    this.currentUser = command.currentUser;
    this.data = command.data;

    Object.freeze(this);
  }
}
