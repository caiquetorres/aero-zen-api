import {
  ConflictException,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateReservationCommand } from '../../domain/commands/create-reservation.command';
import { IReservation } from '../../domain/interfaces/reservation.interface';
import { Reservation } from '../../domain/models/reservation';

import { ReservationRepository } from '../../infra/repositories/reservation.repository';

@CommandHandler(CreateReservationCommand)
export class CreateReservationHandler
  implements
    ICommandHandler<
      CreateReservationCommand,
      Result<IReservation, HttpException>
    >
{
  constructor(private readonly _repository: ReservationRepository) {}

  async execute(
    command: CreateReservationCommand,
  ): Promise<Result<IReservation, HttpException>> {
    const {
      flight,
      data: { seatNumber },
      currentUser,
    } = command;

    const hasReservation = await this._repository.findBySeatNumberAndFlight(
      flight,
      seatNumber,
    );

    if (hasReservation.isSome()) {
      return err(new ConflictException());
    }

    const reservation = await this._repository.save(
      new Reservation({
        flight,
        owner: currentUser,
        seatNumber,
      }),
    );

    if (reservation.isOk()) {
      return ok(reservation.value);
    }

    throw new InternalServerErrorException();
  }
}
