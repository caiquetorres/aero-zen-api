import { IFlight } from '../../domain/interfaces/flight.interface';
import { Flight } from '../../domain/models/flight';

export abstract class FlightRepository {
  abstract save(flight: IFlight): Promise<Result<Flight>>;
}
