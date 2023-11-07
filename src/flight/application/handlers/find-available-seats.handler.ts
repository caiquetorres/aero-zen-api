import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ISeat } from '../../domain/interfaces/flight.interface';
import { FindAvailableSeatsQuery } from '../../domain/queries/find-avaiable-seats.query';

import { ReservationRepository } from '../../infra/repositories/reservation.repository';

@QueryHandler(FindAvailableSeatsQuery)
export class FindAvailableSeatsHandler
  implements IQueryHandler<FindAvailableSeatsQuery, ISeat[]>
{
  constructor(private readonly _repository: ReservationRepository) {}

  async execute(query: FindAvailableSeatsQuery): Promise<ISeat[]> {
    const { flight } = query;

    const reservations = await this._repository
      .findReservationsByFlight(flight)
      .then((res) => new Set(res.map((seat) => seat.seatNumber)));

    return flight.seats.filter(
      ({ seatNumber }) => !reservations.has(seatNumber),
    );
  }
}
