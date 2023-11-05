import { IPageQuery } from '../../../core/domain/interfaces/page-query.interface';
import { IUser } from '../../../user/domain/interfaces/user.interface';

export class ListFlightsQuery {
  readonly currentUser: IUser;

  readonly pageQuery: IPageQuery;

  constructor(query: { currentUser: IUser; pageQuery: IPageQuery }) {
    this.currentUser = query.currentUser;
    this.pageQuery = query.pageQuery;

    Object.freeze(this);
  }
}
