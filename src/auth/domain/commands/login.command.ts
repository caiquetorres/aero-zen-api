import { IUser } from '../../../user/domain/interfaces/user.interface';

export class LoginCommand {
  constructor(readonly currentUser: IUser) {}
}
