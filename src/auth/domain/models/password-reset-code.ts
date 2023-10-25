import { IUser } from '../../../user/domain/interfaces/user.interface';

import { IPasswordResetCode } from '../interfaces/password-reset-code.interface';

const HOUR = 60 * 60 * 1000; // 1 hour

export class PasswordResetCode implements IPasswordResetCode {
  /**
   * @inheritdoc
   */
  readonly id: Optional<string>;

  /**
   * @inheritdoc
   */
  readonly code: string;

  /**
   * @inheritdoc
   */
  readonly expirationDate: Date;

  /**
   * @inheritdoc
   */
  readonly owner: IUser;

  constructor(data: {
    id?: string;
    code?: string;
    expirationDate?: Date;
    owner: IUser;
  }) {
    this.id = data.id ? some(data.id) : none();
    this.code = data.code ?? _generateRandomCode();
    this.expirationDate = data.expirationDate ?? new Date(Date.now() + HOUR);
    this.owner = data.owner;

    Object.freeze(this);
  }
}

/**
 * Creates a random code with uppercase letters or numbers.
 *
 * @returns The generated code;
 */
function _generateRandomCode(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
}
