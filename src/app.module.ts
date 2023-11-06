import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { FlightModule } from './flight/flight.module';
import { ReservationModule } from './reservation/reservation.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CoreModule,
    AuthModule,
    UserModule,
    FlightModule,
    ReservationModule,
    CqrsModule.forRoot(),
  ],
})
export class AppModule {}
