import { SeatClass } from '../enums/seat-class.enum';
import { SeatStatus } from '../enums/seat-status.enum';
import { Seat } from '../models/flight';

export class SeatFactory {
  create(rows: number, seatsPerRow: number): Seat[] {
    const seats: Seat[] = [];

    for (let row = 1; row <= rows; row++) {
      for (let column = 1; column <= seatsPerRow; column++) {
        seats.push(
          new Seat({
            seatNumber: `${row}${String.fromCharCode(65 + column - 1)}`,
            price: 0,
            seatClass: SeatClass.economy,
            status: SeatStatus.available,
          }),
        );
      }
    }

    return seats;
  }
}
