import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { IReservation } from '../../../flight/domain/interfaces/reservation.interface';
import { IUser } from '../../domain/interfaces/user.interface';
import { FindAllReservationsQuery } from '../../domain/queries/find-all-reservations.query';

import { AllowFor } from '../../../auth/presentation/decorators/allow-for.decorator';
import { CurrentUser } from '../../../auth/presentation/decorators/current-user.decorator';
import { ReservationPresenter } from '../../../flight/presentation/presenters/reservation.presenter';

@ApiTags('users')
@Controller('users/me')
export class UserReservationController {
  constructor(private readonly _queryBus: QueryBus) {}

  @ApiOperation({ summary: 'Retrieves all the user reservations' })
  @ApiOkResponse({ type: ReservationPresenter, isArray: true })
  @AllowFor(/.*/)
  @Get('reservations')
  async findAllReservations(
    @CurrentUser() currentUser: IUser,
  ): Promise<ReservationPresenter[]> {
    return this._queryBus
      .execute<FindAllReservationsQuery, IReservation[]>(
        new FindAllReservationsQuery({ currentUser }),
      )
      .then((reservations) =>
        reservations.map(
          (reservation) => new ReservationPresenter(reservation),
        ),
      );
  }
}
