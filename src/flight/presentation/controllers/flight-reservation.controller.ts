import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Put,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { IUser } from '../../../user/domain/interfaces/user.interface';
import { CreateReservationCommand } from '../../domain/commands/create-reservation.command';
import { IFlight, ISeat } from '../../domain/interfaces/flight.interface';
import { IReservation } from '../../domain/interfaces/reservation.interface';
import { FindAvailableSeatsQuery } from '../../domain/queries/find-avaiable-seats.query';

import { FlightByIdPipe } from '../../application/pipes/flight-by-id.pipe';

import { AllowFor } from '../../../auth/presentation/decorators/allow-for.decorator';
import { CurrentUser } from '../../../auth/presentation/decorators/current-user.decorator';
import { Public } from '../../../auth/presentation/decorators/public.decorator';

import { CreateReservationDto } from '../dtos/create-reservation.dto';
import { SeatPresenter } from '../presenters/seat.presenter';

@ApiTags('flights')
@Controller('flights/:flightId')
export class FlightReservationController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Reserves a flight seat' })
  @ApiNoContentResponse()
  @AllowFor(/.*/)
  @Put('reserve')
  async reserve(
    @CurrentUser() currentUser: IUser,
    @Body() dto: CreateReservationDto,
    @Param('flightId', FlightByIdPipe) flight: IFlight,
  ): Promise<void> {
    return this._commandBus
      .execute<CreateReservationCommand, Result<IReservation, HttpException>>(
        new CreateReservationCommand({ currentUser, data: dto, flight }),
      )
      .then((reservation) =>
        reservation.isOk() ? undefined : Promise.reject(reservation.error),
      );
  }

  @ApiOperation({ summary: 'Retrieves all the flight available seats' })
  @ApiOkResponse({ type: SeatPresenter, isArray: true })
  @ApiParam({ name: 'flightId', type: String })
  @Public()
  @Get('seats/available')
  async findAvailableSeats(
    @CurrentUser() currentUser: IUser,
    @Param('flightId', FlightByIdPipe) flight: IFlight,
  ): Promise<SeatPresenter[]> {
    return this._queryBus
      .execute<FindAvailableSeatsQuery, ISeat[]>(
        new FindAvailableSeatsQuery({ currentUser, flight }),
      )
      .then((seats) => seats.map((seat) => new SeatPresenter(seat)));
  }
}
