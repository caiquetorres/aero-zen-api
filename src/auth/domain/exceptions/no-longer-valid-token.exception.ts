import { UnauthorizedException } from '@nestjs/common';

export class NoLongerValidTokenException extends UnauthorizedException {
  constructor() {
    super(`The informed token is no longer valid`);
  }
}
