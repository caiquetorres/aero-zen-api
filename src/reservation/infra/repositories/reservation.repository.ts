import { IPageQuery } from '../../../core/domain/interfaces/page-query.interface';
import { IPage } from '../../../core/domain/interfaces/page.interface';
import { IFlight } from '../../../flight/domain/interfaces/flight.interface';
import { IUser } from '../../../user/domain/interfaces/user.interface';
import { IReservation } from '../../domain/interfaces/reservation.interface';
import { Reservation } from '../../domain/models/reservation';

export abstract class ReservationRepository {
  abstract save(reservation: IReservation): Promise<Result<Reservation>>;

  abstract findReservationsByOwner(
    owner: IUser,
    query: IPageQuery,
  ): Promise<IPage<Reservation>>;

  abstract findReservationsByFlight(
    flight: IFlight,
    query: IPageQuery,
  ): Promise<IPage<Reservation>>;

  abstract deleteOne(reservation: IReservation): Promise<Result<void>>;

  abstract findBySeatNumberAndFlight(
    flight: IFlight,
    seatNumber: string,
  ): Promise<Option<Reservation>>;
}
