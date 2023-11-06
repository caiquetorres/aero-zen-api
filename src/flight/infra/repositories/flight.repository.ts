import { IPageQuery } from '../../../core/domain/interfaces/page-query.interface';
import { IPage } from '../../../core/domain/interfaces/page.interface';
import { IFlight } from '../../domain/interfaces/flight.interface';
import { Flight } from '../../domain/models/flight';

export abstract class FlightRepository {
  abstract save(flight: IFlight): Promise<Result<Flight>>;

  abstract findMany(query: IPageQuery): Promise<IPage<Flight>>;

  abstract findOneById(id: string): Promise<Option<Flight>>;
}
