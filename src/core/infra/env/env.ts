/* eslint-disable @typescript-eslint/no-empty-interface */

import { IsDefined, IsOptional } from 'class-validator';

export class CoreEnv {
  @IsDefined()
  NODE_ENV!: string;

  @IsOptional()
  PORT!: string;

  @IsOptional()
  PACKAGE_VERSION?: string;

  @IsDefined()
  MONGO_URL!: string;

  @IsDefined()
  SWAGGER_TITLE!: string;
}

declare global {
  export interface IEnv extends CoreEnv {}
}
