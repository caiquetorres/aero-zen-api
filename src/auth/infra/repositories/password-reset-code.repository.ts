import { PasswordResetCode } from '../../domain/models/password-reset-code';

export abstract class PasswordResetCodeRepository {
  abstract save(
    passwordResetCode: PasswordResetCode,
  ): Promise<Result<PasswordResetCode>>;

  abstract findOneByValidCode(
    code: string,
    date?: Date,
  ): Promise<Optional<PasswordResetCode>>;

  abstract delete(passwordResetCode: PasswordResetCode): Promise<Result<void>>;
}
