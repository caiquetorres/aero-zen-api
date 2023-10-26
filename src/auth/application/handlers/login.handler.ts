import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { LoginCommand } from '../../domain/commands/login.command';
import { IJwtToken } from '../../domain/interfaces/jwt-token.interface';

import { EnvService } from '../../../env/infra/services/env.service';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly _envService: EnvService,
    private readonly _jwtService: JwtService,
  ) {}

  async execute(command: LoginCommand): Promise<Result<IJwtToken>> {
    const { currentUser } = command;
    const expiresIn = this._envService.get('JWT_EXPIRES_IN');

    const token = await this._jwtService.signAsync(
      { id: currentUser.id },
      { expiresIn },
    );

    return ok({ token, expiresIn });
  }
}
