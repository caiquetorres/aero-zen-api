import { IUser } from '../interfaces/user.interface';
import { Password } from '../value-objects/password';

/**
 * Entity that represents a user.
 */
export class User implements IUser {
  /**
   * @inheritdoc
   */
  readonly id: Optional<string>;

  /**
   * @inheritdoc
   */
  readonly createdAt: Date;

  /**
   * @inheritdoc
   */
  readonly updatedAt: Date;

  /**
   * @inheritdoc
   */
  readonly name: string;

  /**
   * @inheritdoc
   */
  readonly email: string;

  /**
   * @inheritdoc
   */
  readonly username: string;

  /**
   * @inheritdoc
   */
  readonly password: Password;

  constructor(user: {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    name: string;
    email: string;
    username: string;
    password: Password;
  }) {
    this.id = user.id ? some(user.id) : none();
    this.createdAt = user.createdAt ?? new Date();
    this.updatedAt = user.updatedAt ?? new Date();
    this.name = user.name;
    this.email = user.email;
    this.username = user.username;
    this.password = user.password;

    Object.freeze(this);
  }
}
