import { ForbiddenException, HttpException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Role } from '../../../user/domain/entities/role';
import { IUser } from '../../../user/domain/interfaces/user.interface';
import { DeleteReservationCommand } from '../../domain/commands/delete-reservation.command';
import { IReservation } from '../../domain/interfaces/reservation.interface';

import { ReservationRepository } from '../../infra/repositories/reservation.repository';

@CommandHandler(DeleteReservationCommand)
export class DeleteReservationHandler
  implements
    ICommandHandler<DeleteReservationCommand, Result<void, HttpException>>
{
  constructor(private readonly _repository: ReservationRepository) {}

  async execute(
    command: DeleteReservationCommand,
  ): Promise<Result<void, HttpException>> {
    const { currentUser, reservation } = command;

    if (!this._can(currentUser, reservation)) {
      return err(new ForbiddenException('You cannot delete this reservation'));
    }

    await this._repository.deleteOne(reservation);

    return ok(void 0);
  }

  private _can(currentUser: IUser, reservation: IReservation): boolean {
    return (
      currentUser.roles.has(Role.admin) ||
      currentUser.id.unwrap() === reservation.owner.id.unwrap()
    );
  }
}
