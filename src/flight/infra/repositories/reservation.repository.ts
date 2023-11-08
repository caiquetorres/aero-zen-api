import { IUser } from '../../../user/domain/interfaces/user.interface';
import { IFlight } from '../../domain/interfaces/flight.interface';
import { IReservation } from '../../domain/interfaces/reservation.interface';
import { Reservation } from '../../domain/models/reservation';

export abstract class ReservationRepository {
  abstract save(reservation: IReservation): Promise<Result<Reservation>>;

  abstract findOneById(id: string): Promise<Option<Reservation>>;

  abstract findReservationsByOwner(owner: IUser): Promise<Reservation[]>;

  abstract findReservationsByFlight(flight: IFlight): Promise<Reservation[]>;

  abstract deleteOne(reservation: IReservation): Promise<Result<void>>;

  abstract findBySeatNumberAndFlight(
    flight: IFlight,
    seatNumber: string,
  ): Promise<Option<Reservation>>;
}
