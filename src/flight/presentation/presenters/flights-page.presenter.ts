import { PagePresenter } from '../../../core/presentation/dtos/page.presenter';

import { FlightPresenter } from './flight.presenter';

export class FlightsPagePresenter extends PagePresenter(FlightPresenter) {}
