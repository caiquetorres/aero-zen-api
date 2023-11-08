import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common';

import { IReservation } from '../../domain/interfaces/reservation.interface';

import { ReservationRepository } from '../../infra/repositories/reservation.repository';

@Injectable()
export class ReservationByIdPipe
  implements PipeTransform<string, Promise<IReservation>>
{
  constructor(private readonly _repository: ReservationRepository) {}

  async transform(id: string): Promise<IReservation> {
    const user = await this._repository.findOneById(id);

    if (user.isNone()) {
      throw new NotFoundException(
        `Reservation identified by '${id}' does not exist`,
      );
    }

    return user.value;
  }
}
