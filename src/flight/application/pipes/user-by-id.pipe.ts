import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';

import { IFlight } from '../../domain/interfaces/flight.interface';

import { FlightRepository } from '../../infra/repositories/flight.repository';

@Injectable()
export class FlightByIdPipe implements PipeTransform<string, Promise<IFlight>> {
  constructor(private readonly _repository: FlightRepository) {}

  async transform(id: string): Promise<IFlight> {
    const user = await this._repository.findOneById(id);

    if (user.isNone()) {
      throw new NotFoundException(
        `Flight identified by '${id}' does not exist`,
      );
    }

    return user.value;
  }
}
