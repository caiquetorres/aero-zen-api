import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateMeCommand } from '../../domain/commands/update-me.command';
import { User } from '../../domain/entities/user';
import { IUser } from '../../domain/interfaces/user.interface';

import { UserRepository } from '../../infra/repositories/user.repository';

@CommandHandler(UpdateMeCommand)
export class UpdateMeHandler
  implements ICommandHandler<UpdateMeCommand, Result<IUser, HttpException>>
{
  constructor(private readonly _repository: UserRepository) {}

  async execute(
    command: UpdateMeCommand,
  ): Promise<Result<IUser, HttpException>> {
    const { currentUser, data } = command;
    const { id, ...rest } = currentUser;

    const user = await this._repository.save(
      new User({ ...rest, ...data, id: id.unwrap() }),
    );

    if (user.isErr()) {
      return err(
        new InternalServerErrorException('Error while updating the user'),
      );
    }

    return ok(user.value);
  }
}
