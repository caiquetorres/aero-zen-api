export interface ICreateUser {
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
   * The user's password (not hashed).
   */
  readonly password: string;
}
