import { BadRequestException } from '@nestjs/common';

export class InvalidOrExpiredPasswordResetCodeException extends BadRequestException {
  constructor() {
    super('Invalid or expired password reset code');
  }
}
