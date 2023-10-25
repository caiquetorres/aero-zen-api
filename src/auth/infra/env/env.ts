/* eslint-disable @typescript-eslint/no-empty-interface */

import { IsDefined, IsOptional } from 'class-validator';

export class AuthEnv {
  @IsDefined()
  JWT_SECRET!: string;

  @IsOptional()
  JWT_EXPIRES_IN = '1y';
}

declare global {
  export interface IEnv extends AuthEnv {}
}
