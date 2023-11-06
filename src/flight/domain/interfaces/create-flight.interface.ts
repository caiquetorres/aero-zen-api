export interface ICreateAirport {
  city: string;

  name: string;

  iataCode: string;
}

export interface ICreateLayover {
  airport: ICreateAirport;

  time: number;
}

export interface ICreateFlight {
  airline: string;

  departureTime: string;

  arrivalTime: string;

  departureAirport: ICreateAirport;

  arrivalAirport: ICreateAirport;

  layovers: ICreateLayover[];
}
