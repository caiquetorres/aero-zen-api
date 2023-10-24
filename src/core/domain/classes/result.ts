/* eslint-disable @typescript-eslint/explicit-function-return-type */

declare global {
  type Result<T, E = Error> = Ok<T> | Err<E>;

  function ok<T>(value: T): Ok<T>;

  function err<E>(error: E): Err<E>;
}

global.ok = function <T>(value: T): Ok<T> {
  return new Ok(value);
};

global.err = function <E>(error: E): Err<E> {
  return new Err(error);
};

export class Ok<T> {
  constructor(readonly value: T) {
    Object.freeze(this);
  }

  isOk(): this is Ok<T> {
    return true;
  }

  isErr(): this is Err<never> {
    return false;
  }

  unwrap(): T {
    return this.value;
  }
}

export class Err<E> {
  constructor(readonly error: E) {
    Object.freeze(this);
  }

  isOk(): this is Ok<never> {
    return false;
  }

  isErr(): this is Err<E> {
    return true;
  }

  unwrap(): never {
    throw new Error('Cannot unwrap a Err value.');
  }
}
