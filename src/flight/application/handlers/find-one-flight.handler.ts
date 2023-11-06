import { HttpException, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { IFlight } from '../../domain/interfaces/flight.interface';
import { FindOneFlightQuery } from '../../domain/queries/find-one-flight.query';

import { FlightRepository } from '../../infra/repositories/flight.repository';

@QueryHandler(FindOneFlightQuery)
export class FindOneFlightHandler
  implements IQueryHandler<FindOneFlightQuery, Result<IFlight, HttpException>>
{
  constructor(private readonly _repository: FlightRepository) {}

  async execute(
    query: FindOneFlightQuery,
  ): Promise<Result<IFlight, HttpException>> {
    const { flightId } = query;
    const flight = await this._repository.findOneById(flightId);

    if (flight.isNone()) {
      return err(new NotFoundException('Flight not found'));
    }

    return ok(flight.value);
  }
}
