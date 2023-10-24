import { ConflictException } from '@nestjs/common';

export class DuplicatedUserUsernameException extends ConflictException {
  constructor(username: string) {
    super(`Username '${username}' already used`);
  }
}
