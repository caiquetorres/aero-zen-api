import { IUser } from '../../../user/domain/interfaces/user.interface';

/**
 * The password result code abstraction.
 */
export interface IPasswordResetCode {
  /**
   * The password reset code unique identifier.
   */
  id: Optional<string>;

  /**
   * The password reset code code.
   */
  code: string;

  /**
   * The password reset code expiration date.
   */
  expirationDate: Date;

  /**
   * The password reset code owner.
   */
  owner: IUser;
}
