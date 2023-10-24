import { Password } from '../value-objects/password';

/**
 * Interface that represents a user.
 */
export interface IUser {
  /**
   * The user unique identifier.
   */
  readonly id: Optional<string>;

  /**
   * The user creation date.
   */
  readonly createdAt: Date;

  /**
   * The user's last update date.
   */
  readonly updatedAt: Date;

  /**
   * The user's name.
   */
  readonly name: string;

  /**
   * The user's unique email.
   */
  readonly email: string;

  /**
   * The user's unique username.
   */
  readonly username: string;

  /**
   * The user's password (hashed).
   */
  readonly password: Password;
}
