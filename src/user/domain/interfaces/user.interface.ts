import { Role } from '../entities/role';
import { Password } from '../value-objects/password';

/**
 * The user abstraction.
 */
export interface IUser {
  /**
   * The user unique identifier.
   */
  readonly id: Option<string>;

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

  readonly roles: Set<Role>;
}
