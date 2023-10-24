import { Module } from '@nestjs/common';

import { EnvModule } from '../../env/env.module';
import { CoreEnv } from './env/env';

@Module({
  imports: [EnvModule.forChild([CoreEnv])],
})
export class CoreInfraModule {}
