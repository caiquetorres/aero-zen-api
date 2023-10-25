import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { LoginCommand } from '../../domain/commands/login.command';
import { IToken } from '../../domain/interfaces/token.interface';

import { EnvService } from '../../../env/infra/services/env.service';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  private readonly _expiresIn: string;

  constructor(
    private readonly _envService: EnvService,
    private readonly _jwtService: JwtService,
  ) {
    this._expiresIn = this._envService.get('JWT_EXPIRES_IN');
  }

  async execute(command: LoginCommand): Promise<IToken> {
    const { currentUser } = command;

    const token = await this._jwtService.signAsync(
      { id: currentUser.id },
      { expiresIn: this._expiresIn },
    );

    return { token, expiresIn: this._expiresIn } as IToken;
  }
}
