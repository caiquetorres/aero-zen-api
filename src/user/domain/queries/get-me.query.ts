import { IUser } from '../interfaces/user.interface';

export class GetMeQuery {
  readonly currentUser: IUser;

  constructor(query: { currentUser: IUser }) {
    this.currentUser = query.currentUser;

    Object.freeze(this);
  }
}
