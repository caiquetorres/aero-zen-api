import { ConflictException } from '@nestjs/common';

export class DuplicatedUserEmailException extends ConflictException {
  constructor(email: string) {
    super(`Email '${email}' already used`);
  }
}
