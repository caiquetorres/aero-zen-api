import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { IPage } from '../../../core/domain/interfaces/page.interface';
import { Role } from '../../../user/domain/entities/role';
import { IUser } from '../../../user/domain/interfaces/user.interface';
import { CreateFlightCommand } from '../../domain/commands/create-flight.command';
import { IFlight } from '../../domain/interfaces/flight.interface';
import { ListFlightsQuery } from '../../domain/queries/list-flights.query';

import { AllowFor } from '../../../auth/presentation/decorators/allow-for.decorator';
import { CurrentUser } from '../../../auth/presentation/decorators/current-user.decorator';
import { Public } from '../../../auth/presentation/decorators/public.decorator';
import { PageQuery } from '../../../core/presentation/dtos/page.query';

import { CreateFlightDto } from '../dtos/create-flight.dto';
import { FlightPresenter } from '../presenters/flight.presenter';
import { FlightsPagePresenter } from '../presenters/flights-page.presenter';

@ApiTags('flights')
@Controller('flights')
export class FlightController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Creates a single flight' })
  @ApiCreatedResponse({ type: FlightPresenter })
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

  @ApiOperation({ summary: 'Retrieves a page of flights' })
  @ApiOkResponse({ type: FlightsPagePresenter })
  @Public()
  @Get()
  async list(
    @CurrentUser() currentUser: IUser,
    @Query() pageQuery: PageQuery,
  ): Promise<IPage<FlightPresenter>> {
    return this._queryBus
      .execute(new ListFlightsQuery({ currentUser, pageQuery }))
      .then((page) => new FlightsPagePresenter(page));
  }
}
