import bcryptjs from 'bcryptjs';

export class Password {
  constructor(readonly value: string) {
    Object.freeze(this);
  }

  static from(password: string): Password {
    const value = Password._hash(password);
    return new Password(value);
  }

  private static _hash(password: string): string {
    const salt = bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(password, salt);
  }
}
