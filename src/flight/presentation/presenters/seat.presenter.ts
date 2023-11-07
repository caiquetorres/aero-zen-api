import { ApiProperty } from '@nestjs/swagger';

import { SeatClass } from '../../domain/enums/seat-class.enum';
import { ISeat } from '../../domain/interfaces/flight.interface';

export class SeatPresenter {
  @ApiProperty({ example: '12A' })
  readonly seatNumber: string;

  @ApiProperty({ example: SeatClass.economy })
  readonly seatClass: Wrapper<SeatClass>;

  @ApiProperty({ example: 1500 })
  readonly price: number;

  constructor(seat: ISeat) {
    this.seatClass = seat.seatClass;
    this.seatNumber = seat.seatNumber;
    this.price = seat.price;

    Object.freeze(this);
  }
}
