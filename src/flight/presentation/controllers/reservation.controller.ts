import { Controller, Delete, HttpException, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { IUser } from '../../../user/domain/interfaces/user.interface';
import { DeleteReservationCommand } from '../../domain/commands/delete-reservation.command';
import { IReservation } from '../../domain/interfaces/reservation.interface';

import { ReservationByIdPipe } from '../../application/pipes/reservation-by-id.pipe';

import { AllowFor } from '../../../auth/presentation/decorators/allow-for.decorator';
import { CurrentUser } from '../../../auth/presentation/decorators/current-user.decorator';

@ApiTags('reservations')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly _commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Deletes a single reservation' })
  @ApiOkResponse()
  @ApiParam({ type: String, name: 'id' })
  @AllowFor(/.*/)
  @Delete(':id')
  async delete(
    @CurrentUser() currentUser: IUser,
    @Param('id', ReservationByIdPipe) reservation: IReservation,
  ): Promise<void> {
    return this._commandBus
      .execute<DeleteReservationCommand, Result<void, HttpException>>(
        new DeleteReservationCommand({ currentUser, reservation }),
      )
      .then((res) => (res.isOk() ? void 0 : Promise.reject(res.error)));
  }
}
