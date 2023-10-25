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

    let user = new User({
      ...currentUser,
      ...data,
    });

    const result = await this._repository.save(user);

    if (result.isErr()) {
      return err(
        new InternalServerErrorException('Error while updating the user'),
      );
    }

    user = result.value;
    return ok(user);
  }
}
