import { toOptional } from '../../../core/domain/classes/option';

import { IUser } from '../interfaces/user.interface';
import { Password } from '../value-objects/password';
import { Role } from './role';

/**
 * Entity that represents a user.
 */
export class User implements IUser {
  /**
   * @inheritdoc
   */
  readonly id: Option<string>;

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

  readonly roles: Set<Role>;

  constructor(data: {
    id?: string;
    createdAt?: number | string | Date;
    updatedAt?: number | string | Date;
    name: string;
    email: string;
    username: string;
    password: Password;
    roles?: Iterable<Role>;
  }) {
    this.id = toOptional(data.id);
    this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date();
    this.name = data.name;
    this.email = data.email;
    this.username = data.username;
    this.password = data.password;
    this.roles = new Set(data.roles ?? [Role.user]);

    Object.freeze(this);
  }
}
