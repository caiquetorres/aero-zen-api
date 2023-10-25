import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { InvalidOrExpiredPasswordResetCodeException } from '../../domain/exceptions/invalid-or-expired-password-reset-code.exception';
import { InvalidPasswordResetCodeFormatException } from '../../domain/exceptions/invalid-password-reset-code-format.exception';
import { IPasswordResetCode } from '../../domain/interfaces/password-reset-code.interface';

import { PasswordResetCodeRepository } from '../../infra/repositories/password-reset-code.repository';

@Injectable()
export class PasswordResetCodeByCodePipe
  implements PipeTransform<string, Promise<Result<IPasswordResetCode>>>
{
  constructor(private readonly _repository: PasswordResetCodeRepository) {}

  async transform(value: string): Promise<Result<IPasswordResetCode>> {
    if (!value) {
      // null, undefined or empty string
      return err(new BadRequestException('Query code must not be empty'));
    }

    if (!/^[A-Z0-9]{6}$/.test(value)) {
      return err(new InvalidPasswordResetCodeFormatException());
    }

    return this._repository
      .findOneByValidCode(value)
      .then((result) =>
        result.isSome()
          ? ok(result.value)
          : err(new InvalidOrExpiredPasswordResetCodeException()),
      );
  }
}
