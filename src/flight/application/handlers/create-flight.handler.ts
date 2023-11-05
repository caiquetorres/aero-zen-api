import {
  ForbiddenException,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Role } from '../../../user/domain/entities/role';
import { IUser } from '../../../user/domain/interfaces/user.interface';
import { CreateFlightCommand } from '../../domain/commands/create-flight.command';
import { IFlight } from '../../domain/interfaces/flight.interface';
import { Flight } from '../../domain/models/flight';

import { FlightRepository } from '../../infra/repositories/flight.repository';

@CommandHandler(CreateFlightCommand)
export class CreateFlightHandler
  implements
    ICommandHandler<CreateFlightCommand, Result<IFlight, HttpException>>
{
  constructor(private readonly _repository: FlightRepository) {}

  async execute(
    command: CreateFlightCommand,
  ): Promise<Result<IFlight, HttpException>> {
    const { currentUser, data } = command;

    if (!this._can(currentUser)) {
      return err(
        // REVIEW: Should we create a domain exception for that?
        new ForbiddenException('You do not have permission to create flights'),
      );
    }

    const flight = await this._repository.save(new Flight(data));

    if (flight.isOk()) {
      return ok(flight.value);
    }

    console.error(flight.error);

    return err(
      new InternalServerErrorException('Error while creating the flight'),
    );
  }

  private _can(currentUser: IUser): boolean {
    return currentUser.roles.has(Role.admin);
  }
}
