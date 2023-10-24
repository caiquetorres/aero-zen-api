import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateUserCommand } from '../../domain/commands/create-user.command';
import { IUser } from '../../domain/interfaces/user.interface';

import { CreateUserDto } from '../dtos/create-user.dto';
import { UserPresenter } from '../presenters/user.presenter';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly _commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Creates a new user' })
  @ApiCreatedResponse({ type: UserPresenter })
  @Post()
  async createOne(
    currentUser: IUser,
    @Body() dto: CreateUserDto,
  ): Promise<UserPresenter> {
    return this._commandBus
      .execute<CreateUserCommand, Result<IUser, HttpException>>(
        new CreateUserCommand({ currentUser, data: dto }),
      )
      .then((result) =>
        result.isOk()
          ? new UserPresenter(result.value)
          : Promise.reject(result.error),
      );
  }
}
