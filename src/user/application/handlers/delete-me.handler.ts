import { InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeleteMeCommand } from '../../domain/commands/delete-me.command';

import { UserRepository } from '../../infra/repositories/user.repository';

@CommandHandler(DeleteMeCommand)
export class DeleteMeHandler
  implements ICommandHandler<DeleteMeCommand, Result<void>>
{
  constructor(private readonly _repository: UserRepository) {}

  async execute(command: DeleteMeCommand): Promise<Result<void>> {
    const result = await this._repository.deleteOne(command.currentUser);

    if (result.isErr()) {
      throw new InternalServerErrorException('Error while deleting the user');
    }

    return ok(undefined);
  }
}
