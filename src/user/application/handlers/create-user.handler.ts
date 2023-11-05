import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateUserCommand } from '../../domain/commands/create-user.command';
import { User } from '../../domain/entities/user';
import { DuplicatedUserEmailException } from '../../domain/exceptions/duplicated-user-email.exception';
import { DuplicatedUserUsernameException } from '../../domain/exceptions/duplicated-user-username.exception';
import { IUser } from '../../domain/interfaces/user.interface';
import { Password } from '../../domain/value-objects/password';

import { UserRepository } from '../../infra/repositories/user.repository';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly _repository: UserRepository) {}

  async execute(
    command: CreateUserCommand,
  ): Promise<Result<IUser, HttpException>> {
    const { data } = command;

    const hasUserWithEmail = await this._repository
      .findOneByEmail(data.email)
      .then((op) => op.isSome());

    if (hasUserWithEmail) {
      return err(new DuplicatedUserEmailException(data.email));
    }

    const hasUserWithUsername = await this._repository
      .findOneByUsername(data.username)
      .then((op) => op.isSome());

    if (hasUserWithUsername) {
      return err(new DuplicatedUserUsernameException(data.username));
    }

    const user = await this._repository.save(
      new User({
        name: data.name,
        email: data.email,
        username: data.username,
        password: Password.from(data.password),
      }),
    );

    if (user.isErr()) {
      return err(
        new InternalServerErrorException('Error while creating the user'),
      );
    }

    return ok(user.value);
  }
}
