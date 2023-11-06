import { Types } from 'mongoose';

import { Airport, Flight, Layover, Seat } from '../../../domain/models/flight';

import {
  AirportDocument,
  FlightDocument,
  LayoverDocument,
  SeatDocument,
} from './flight.schema';

export class FlightMongooseMapper {
  static toDomain(doc: FlightDocument | null): Option<Flight> {
    if (!doc) {
      return none();
    }

    return some(
      new Flight({
        id: doc._id.toString(),
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
        airline: doc.airline,
        departureTime: doc.departureTime,
        arrivalTime: doc.arrivalTime,
        departureAirport: new Airport({
          city: doc.departureAirport.city,
          name: doc.departureAirport.name,
          iataCode: doc.departureAirport.iataCode,
        }),
        arrivalAirport: new Airport({
          city: doc.arrivalAirport.city,
          name: doc.arrivalAirport.name,
          iataCode: doc.arrivalAirport.iataCode,
        }),
        seats: doc.seats.map(
          (seat) =>
            new Seat({
              seatClass: seat.seatClass,
              price: seat.price,
              seatNumber: seat.seatNumber,
            }),
        ),
        layovers: doc.layovers.map(
          (layover) =>
            new Layover({
              time: layover.time,
              airport: new Airport({
                city: layover.airport.city,
                name: layover.airport.name,
                iataCode: layover.airport.iataCode,
              }),
            }),
        ),
      }),
    );
  }

  static toDocument(domain: Flight): Option<FlightDocument> {
    if (!domain) {
      return none();
    }

    const id = domain.id.isSome()
      ? new Types.ObjectId(domain.id.unwrap())
      : new Types.ObjectId();

    return some(
      new FlightDocument({
        id,
        createdAt: domain.createdAt,
        updatedAt: domain.updatedAt,
        airline: domain.airline,
        departureTime: domain.departureTime,
        arrivalTime: domain.arrivalTime,
        departureAirport: new AirportDocument({
          city: domain.departureAirport.city,
          name: domain.departureAirport.name,
          iataCode: domain.departureAirport.iataCode,
        }),
        arrivalAirport: new AirportDocument({
          city: domain.arrivalAirport.city,
          name: domain.arrivalAirport.name,
          iataCode: domain.arrivalAirport.iataCode,
        }),
        seats: domain.seats.map(
          (seat) =>
            new SeatDocument({
              seatClass: seat.seatClass,
              price: seat.price,
              seatNumber: seat.seatNumber,
            }),
        ),
        layovers: domain.layovers.map(
          (layover) =>
            new LayoverDocument({
              time: layover.time,
              airport: new Airport({
                city: layover.airport.city,
                name: layover.airport.name,
                iataCode: layover.airport.iataCode,
              }),
            }),
        ),
      }),
    );
  }
}
