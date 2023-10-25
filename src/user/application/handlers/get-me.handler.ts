import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { IUser } from '../../domain/interfaces/user.interface';
import { GetMeQuery } from '../../domain/queries/get-me.query';

/**
 * Command responsible for retrieving the request user.
 */
@QueryHandler(GetMeQuery)
export class GetMeQueryHandler implements IQueryHandler<GetMeQuery> {
  async execute(query: GetMeQuery): Promise<Result<IUser>> {
    return ok(query.currentUser);
  }
}
