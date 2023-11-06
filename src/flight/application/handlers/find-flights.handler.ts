import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { IPage } from '../../../core/domain/interfaces/page.interface';
import { IFlight } from '../../domain/interfaces/flight.interface';
import { FindFlightsQuery } from '../../domain/queries/find-flights.query';

import { FlightRepository } from '../../infra/repositories/flight.repository';

@QueryHandler(FindFlightsQuery)
export class FindFlightsHandler
  implements IQueryHandler<FindFlightsQuery, IPage<IFlight>>
{
  constructor(private readonly _repository: FlightRepository) {}

  execute(query: FindFlightsQuery): Promise<IPage<IFlight>> {
    const { pageQuery } = query;
    return this._repository.findMany(pageQuery);
  }
}
