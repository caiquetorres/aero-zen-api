import { BadRequestException } from '@nestjs/common';

export class InvalidPasswordResetCodeFormatException extends BadRequestException {
  constructor() {
    super(
      'Invalid code format. The password reset code should consist of 6 uppercase letters or digits.',
    );
  }
}
