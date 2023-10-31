import { Module } from '@nestjs/common';

import { UserInfraModule } from '../user/infra/user-infra.module';
import { AuthInfraModule } from './infra/auth-infra.module';

import { LoginCommandHandler } from './application/handlers/login.handler';

import { AuthController } from './presentation/controllers/auth.controller';

@Module({
  imports: [UserInfraModule, AuthInfraModule],
  providers: [LoginCommandHandler],
  controllers: [AuthController],
})
export class AuthModule {}
