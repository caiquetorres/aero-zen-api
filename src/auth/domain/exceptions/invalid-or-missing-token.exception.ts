import { UnauthorizedException } from '@nestjs/common';

export class InvalidOrMissingToken extends UnauthorizedException {
  constructor() {
    super('Invalid or missing authentication token');
  }
}
