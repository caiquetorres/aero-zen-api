import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { IUser } from '../../../user/domain/interfaces/user.interface';

import { AuthService } from '../services/auth.service';
import { Strategy } from 'passport-local';

/**
 * Implements local authentication strategy using Passport.js.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _authService: AuthService) {
    super();
  }

  /**
   * Validates a user's username and password.
   *
   * @param username The user's username.
   * @param password The user's password.
   * @returns the user, if the username and password are valid.
   */
  async validate(username: string, password: string): Promise<IUser> {
    const result = await this._authService.validateByUsernameAndPassword(
      username,
      password,
    );

    if (result.isErr()) {
      throw result.error;
    }

    return result.value;
  }
}
