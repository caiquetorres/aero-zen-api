import { ICreateUser } from '../interfaces/create-user.interface';
import { IUser } from '../interfaces/user.interface';

/**
 * Command that is used to save new users.
 */
export class CreateUserCommand {
  readonly currentUser: IUser;

  readonly data: ICreateUser;

  constructor(command: { currentUser: IUser; data: ICreateUser }) {
    this.currentUser = command.currentUser;
    this.data = command.data;

    Object.freeze(this);
  }
}
