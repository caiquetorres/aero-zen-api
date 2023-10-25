import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtConfig } from '../../core/infra/config/jwt/jwt.config';
import { UserInfraModule } from '../../user/infra/user-infra.module';

import { EnvModule } from '../../env/env.module';
import { AuthEnv } from './env/env';
import { PasswordResetCodeMongooseRepository } from './repositories/mongoose/password-reset-code-mongoose.repository';
import {
  PasswordResetCodeDocument,
  PasswordResetCodeSchema,
} from './repositories/mongoose/password-reset-code.document';
import { PasswordResetCodeRepository } from './repositories/password-reset-code.repository';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserInfraModule,
    EnvModule.forChild([AuthEnv]),
    JwtModule.registerAsync({ useClass: JwtConfig }),
    MongooseModule.forFeature([
      {
        name: PasswordResetCodeDocument.name,
        schema: PasswordResetCodeSchema,
      },
    ]),
  ],
  providers: [
    JwtStrategy,
    LocalStrategy,
    AuthService,
    {
      provide: PasswordResetCodeRepository,
      useClass: PasswordResetCodeMongooseRepository,
    },
  ],
  exports: [JwtModule, PasswordResetCodeRepository],
})
export class AuthInfraModule {}
