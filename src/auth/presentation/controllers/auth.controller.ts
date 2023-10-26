import { Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { IUser } from '../../../user/domain/interfaces/user.interface';
import { LoginCommand } from '../../domain/commands/login.command';
import { IJwtToken } from '../../domain/interfaces/jwt-token.interface';

import { CurrentUser } from '../decorators/current-user.decorator';
import { Public } from '../decorators/public.decorator';
import { TokenPresenter } from '../dtos/token.presenter';
import { LocalGuard } from '../guards/local/local.guard';

/**
 * A controller that provides authentication-related routes.
 */
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _commandBus: CommandBus) {}

  /**
   * Authenticates a user and returns a JWT token.
   *
   * @param currentUser The that is consuming the route.
   * @returns A object containing the JWT token and its expiration time.
   */
  @ApiOperation({
    summary: 'Authenticates a user by their username and password',
  })
  @ApiOkResponse({ type: TokenPresenter })
  @ApiBody({
    schema: {
      example: {
        username: 'janedoe',
        password: '123456',
      },
    },
  })
  @UseGuards(LocalGuard)
  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@CurrentUser() currentUser: IUser): Promise<TokenPresenter> {
    return this._commandBus
      .execute<LoginCommand, Result<IJwtToken>>(new LoginCommand(currentUser))
      .then((token) =>
        token.isOk()
          ? new TokenPresenter(token.value)
          : Promise.reject(token.error),
      );
  }
}
