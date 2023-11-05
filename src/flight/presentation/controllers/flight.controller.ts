import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Role } from '../../../user/domain/entities/role';
import { IUser } from '../../../user/domain/interfaces/user.interface';
import { CreateFlightCommand } from '../../domain/commands/create-flight.command';
import { IFlight } from '../../domain/interfaces/flight.interface';

import { AllowFor } from '../../../auth/presentation/decorators/allow-for.decorator';
import { CurrentUser } from '../../../auth/presentation/decorators/current-user.decorator';

import { CreateFlightDto } from '../dtos/create-flight.dto';
import { FlightPresenter } from '../presenters/flight.presenter';

@ApiTags('flights')
@Controller('flights')
export class FlightController {
  constructor(private readonly _commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Creates a single flight' })
  @ApiOkResponse({ type: FlightPresenter })
  @AllowFor(Role.admin)
  @Post()
  async create(
    @CurrentUser() currentUser: IUser,
    @Body() dto: CreateFlightDto,
  ): Promise<FlightPresenter> {
    return this._commandBus
      .execute<CreateFlightCommand, Result<IFlight, HttpException>>(
        new CreateFlightCommand({ currentUser, data: dto }),
      )
      .then((flight) =>
        flight.isOk()
          ? new FlightPresenter(flight.value)
          : Promise.reject(flight.error),
      );
  }
}
