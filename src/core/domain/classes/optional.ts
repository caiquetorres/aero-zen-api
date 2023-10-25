declare global {
  type Optional<T> = Some<T> | None;

  function some<T>(value: T): Some<T>;

  function none(): None;
}

global.some = function <T>(value: T): Some<T> {
  return new Some(value);
};

global.none = function (): None {
  return new None();
};

export class Some<T> {
  constructor(readonly value: T) {
    Object.freeze(this);
  }

  isSome(): this is Some<T> {
    return true;
  }

  isNone(): this is None {
    return false;
  }

  unwrap(): T {
    return this.value;
  }
}

export class None {
  constructor() {
    Object.freeze(this);
  }

  isSome(): this is Some<never> {
    return false;
  }

  isNone(): this is None {
    return true;
  }

  unwrap(message?: string): never {
    throw new Error(message ?? 'Cannot unwrap a None value.');
  }
}
