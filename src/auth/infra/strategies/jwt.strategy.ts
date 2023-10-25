import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { IUser } from '../../../user/domain/interfaces/user.interface';

import { EnvService } from '../../../env/infra/services/env.service';

import { AuthService } from '../services/auth.service';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

/**
 * Implements JSON Web Token (JWT) authentication strategy using Passport.js.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    _envService: EnvService,
    private readonly _authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _envService.get('JWT_SECRET'),
      expiresIn: _envService.get('JWT_EXPIRES_IN'),
    } as StrategyOptions);
  }

  /**
   * Validates a user's.
   *
   * @param identifier The user's identifier object containing the id property.
   * @returns the user, if the username and password are valid.
   */
  async validate(identifier: { id: { value: string } }): Promise<IUser> {
    const result = await this._authService.validateById(identifier.id.value);

    if (result.isErr()) {
      throw result.error;
    }

    return result.value;
  }
}
