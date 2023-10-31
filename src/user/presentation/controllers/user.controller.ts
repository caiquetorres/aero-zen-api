import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreateUserCommand } from '../../domain/commands/create-user.command';
import { DeleteMeCommand } from '../../domain/commands/delete-me.command';
import { UpdateMeCommand } from '../../domain/commands/update-me.command';
import { IUser } from '../../domain/interfaces/user.interface';
import { GetMeQuery } from '../../domain/queries/get-me.query';

import { AllowFor } from '../../../auth/presentation/decorators/allow-for.decorator';
import { CurrentUser } from '../../../auth/presentation/decorators/current-user.decorator';
import { Public } from '../../../auth/presentation/decorators/public.decorator';

import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateMeDto } from '../dtos/update-me.dto';
import { UserPresenter } from '../presenters/user.presenter';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Retrieves the request user' })
  @ApiCreatedResponse({ type: UserPresenter })
  @AllowFor(/.*/)
  @Get('me')
  async getMe(@CurrentUser() currentUser: IUser): Promise<UserPresenter> {
    return this._queryBus
      .execute<GetMeQuery, Result<IUser, HttpException>>(
        new GetMeQuery({ currentUser }),
      )
      .then((result) =>
        result.isOk()
          ? new UserPresenter(result.value)
          : Promise.reject(result.error),
      );
  }

  @ApiOperation({ summary: 'Creates a new user' })
  @ApiCreatedResponse({ type: UserPresenter })
  @Public()
  @Post()
  async createOne(
    @CurrentUser() currentUser: IUser,
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

  @ApiOperation({ summary: 'Updates a single user' })
  @ApiOkResponse({ type: UserPresenter })
  @AllowFor(/.*/)
  @Patch('me')
  async updateMe(
    @CurrentUser() currentUser: IUser,
    @Body() dto: UpdateMeDto,
  ): Promise<UserPresenter> {
    return this._commandBus
      .execute<UpdateMeCommand, Result<IUser, HttpException>>(
        new UpdateMeCommand({ currentUser, data: dto }),
      )
      .then((result) =>
        result.isOk()
          ? new UserPresenter(result.value)
          : Promise.reject(result.error),
      );
  }

  @ApiOperation({ summary: 'Deletes the current user' })
  @ApiOkResponse()
  @AllowFor(/.*/)
  @Delete('me')
  async deleteMe(@CurrentUser() currentUser: IUser): Promise<void> {
    return this._commandBus
      .execute<DeleteMeCommand, Result<void, HttpException>>(
        new DeleteMeCommand({ currentUser }),
      )
      .then((result) =>
        result.isOk() ? undefined : Promise.reject(result.error),
      );
  }
}
