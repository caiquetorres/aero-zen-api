import { Injectable } from '@nestjs/common';

import { IUser } from '../../../user/domain/interfaces/user.interface';
import { InvalidUsernameOrPasswordException } from '../../domain/exceptions/invalid-username-or-password.exception';

import { UserRepository } from '../../../user/infra/repositories/user.repository';

import bcryptjs from 'bcryptjs';

/**
 * Class responsible for managing authentication for users.
 */
@Injectable()
export class AuthService {
  constructor(private readonly _repository: UserRepository) {}

  /**
   * Validates a user's credentials.
   *
   * @param username The user's username.
   * @param password The user's password.
   * @returns the user if the credentials are valid, or null if they are not.
   */
  async validateByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<Result<IUser>> {
    const result = await this._repository.findOneByEmailOrUsername(username);

    if (result.isNone()) {
      return err(new InvalidUsernameOrPasswordException());
    }

    const user = result.value;

    const passwordMatches = await bcryptjs.compare(
      password,
      user.password.value,
    );

    return passwordMatches
      ? ok(user)
      : err(new InvalidUsernameOrPasswordException());
  }
}
