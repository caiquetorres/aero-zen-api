import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateUserCommand } from '../../domain/commands/create-user.command';
import { User } from '../../domain/entities/user';
import { DuplicatedUserEmailException } from '../../domain/exceptions/duplicated-user-email.exception';
import { DuplicatedUserUsernameException } from '../../domain/exceptions/duplicated-user-username.exception';
import { IUser } from '../../domain/interfaces/user.interface';
import { Password } from '../../domain/value-objects/password';

import { UserRepository } from '../../infra/repositories/user.repository';

/**
 * Command responsible for creating new users.
 */
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly _repository: UserRepository) {}

  /**
   * Creates a new user given the command.
   *
   * @param command An object that handles the current user and the new user data.
   * @returns A result that handles the created user or an error.
   */
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

    let user = new User({
      name: data.name,
      email: data.email,
      username: data.username,
      password: Password.from(data.password),
    });

    const result = await this._repository.save(user);

    if (result.isErr()) {
      return err(
        new InternalServerErrorException('Error while creating a user'),
      );
    }

    user = result.value;
    return ok(user);
  }
}
