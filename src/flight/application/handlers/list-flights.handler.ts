import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { IPage } from '../../../core/domain/interfaces/page.interface';
import { IFlight } from '../../domain/interfaces/flight.interface';
import { ListFlightsQuery } from '../../domain/queries/list-flights.query';

import { FlightRepository } from '../../infra/repositories/flight.repository';

@QueryHandler(ListFlightsQuery)
export class ListFlightsHandler
  implements IQueryHandler<ListFlightsQuery, IPage<IFlight>>
{
  constructor(private readonly _repository: FlightRepository) {}

  execute(query: ListFlightsQuery): Promise<IPage<IFlight>> {
    const { pageQuery } = query;
    return this._repository.findMany(pageQuery);
  }
}
