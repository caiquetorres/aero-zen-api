import { Body, Controller, HttpException, Param, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { IFlight } from '../../../flight/domain/interfaces/flight.interface';
import { IUser } from '../../../user/domain/interfaces/user.interface';
import { CreateReservationCommand } from '../../domain/commands/create-reservation.command';
import { IReservation } from '../../domain/interfaces/reservation.interface';

import { FlightByIdPipe } from '../../../flight/application/pipes/flight-by-id.pipe';

import { AllowFor } from '../../../auth/presentation/decorators/allow-for.decorator';
import { CurrentUser } from '../../../auth/presentation/decorators/current-user.decorator';

import { CreateReservationDto } from '../dtos/create-reservation.dto';

@ApiTags('flights')
@Controller('flights/:flightId/reserve')
export class ReservationController {
  constructor(private readonly _commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Reserves a flight seat' })
  @ApiNoContentResponse()
  @AllowFor(/.*/)
  @Put()
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
}
