import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { Role } from '../../../../user/domain/entities/role';
import { User } from '../../../../user/domain/entities/user';
import { Password } from '../../../../user/domain/value-objects/password';
import { InvalidOrMissingToken } from '../../../domain/exceptions/invalid-or-missing-token.exception';

import { EnvService } from '../../../../env/infra/services/env.service';
import { UserRepository } from '../../../../user/infra/repositories/user.repository';
import { IS_PUBLIC } from '../../../infra/constants/public.constant';

import { Request } from 'express';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _envService: EnvService,
    private readonly _reflector: Reflector,
    private readonly _userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);

    const isPublic =
      this._reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
        context.getHandler(),
        context.getClass(),
      ]) ?? false;

    if (token.isNone()) {
      if (!isPublic) {
        throw new InvalidOrMissingToken();
      }

      request['user'] = new User({
        name: 'Guest',
        email: 'guest@fake.com',
        username: 'guest',
        password: Password.from('guest'),
        roles: [Role.guest],
      });

      return true;
    }

    // Here the value of "isPublic" doesn't matter because the token is going to be validated anyway.

    try {
      const secret = this._envService.get('JWT_SECRET');
      const payload: { id: { value: string } } =
        await this._jwtService.verifyAsync(token.value, {
          secret,
        });

      const user = await this._userRepository.findOneById(payload.id.value);

      if (user.isNone()) {
        throw new InvalidOrMissingToken();
      }

      request['user'] = user.value;

      return true;
    } catch (err) {
      throw new InvalidOrMissingToken();
    }
  }
}

function extractTokenFromHeader(request: Request): Option<string> {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? some(token) : none();
}
