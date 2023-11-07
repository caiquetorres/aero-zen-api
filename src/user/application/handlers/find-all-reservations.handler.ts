import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { IReservation } from '../../../flight/domain/interfaces/reservation.interface';
import { FindAllReservationsQuery } from '../../domain/queries/find-all-reservations.query';

import { ReservationRepository } from '../../../flight/infra/repositories/reservation.repository';

@QueryHandler(FindAllReservationsQuery)
export class FindAllReservationsHandler
  implements IQueryHandler<FindAllReservationsQuery, IReservation[]>
{
  constructor(private readonly _repository: ReservationRepository) {}

  execute(query: FindAllReservationsQuery): Promise<IReservation[]> {
    const { currentUser } = query;
    return this._repository.findReservationsByOwner(currentUser);
  }
}
