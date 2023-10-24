/* eslint-disable @typescript-eslint/no-empty-interface */

import { IsDefined, IsOptional } from 'class-validator';

export class CoreEnv {
  @IsDefined()
  NODE_ENV!: string;

  @IsOptional()
  PORT!: string;

  @IsOptional()
  PACKAGE_VERSION?: string;

  @IsOptional()
  DB_URL?: string;

  @IsOptional()
  DB_USERNAME?: string;

  @IsOptional()
  DB_PASSWORD?: string;

  @IsDefined()
  THROTTLER_TTL!: number;

  @IsDefined()
  THROTTLER_LIMIT!: number;

  @IsDefined()
  SWAGGER_TITLE!: string;
}

declare global {
  export interface IEnv extends CoreEnv {}
}
