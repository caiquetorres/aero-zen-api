import { User } from '../../domain/entities/user';
import { IUser } from '../../domain/interfaces/user.interface';

export abstract class UserRepository {
  /**
   * Creates or updates a user.
   *
   * @param user The user data;
   */
  abstract save(user: IUser): Promise<Result<User>>;

  /**
   * Finds one user by its email.
   *
   * @param email The user email.
   */
  abstract findOneByEmail(email: string): Promise<Optional<User>>;

  /**
   * Finds one user by its username.
   *
   * @param username The user username.
   */
  abstract findOneByUsername(username: string): Promise<Optional<User>>;
}
