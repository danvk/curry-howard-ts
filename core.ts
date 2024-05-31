export class And<A, B> {
  #left: A;
  #right: B;
  private constructor(a: A, b: B) {
      this.#left = a;
      this.#right = b;
  }

  static intro<A, B>(a: A, b: B): And<A, B> {
      return new And(a, b);
  }

  get left() { return this.#left; }
  get right() { return this.#right; }
}

export abstract class Or<A, B> {
  abstract cases<R>(a: (a: A) => R, b: (b: B) => R): R;
  static intro_left<A, B>(a: A): Or<A, B> {
      return new OrLeft(a);
  }
  static intro_right<A, B>(b: B): Or<A, B> {
      return new OrRight(b);
  }
}

class OrLeft<A, B> extends Or<A, B> {
  #a: A;
  constructor(a: A) {
      super();
      this.#a = a;
  }
  cases<R>(a: (a: A) => R, b: (b: B) => R): R {
      return a(this.#a)
  }
}

class OrRight<A, B> extends Or<A, B> {
  #b: B;
  constructor(b: B) {
      super();
      this.#b = b;
  }
  cases<R>(a: (a: A) => R, b: (b: B) => R): R {
      return b(this.#b)
  }
}

export type Neg<T> = (t: T) => false;

export class Iff<A, B> {
  #mp: (a: A) => B;
  #mpr: (b: B) => A;
  private constructor(mp: (a: A) => B, mpr: (b: B) => A) {
      this.#mp = mp;
      this.#mpr = mpr;
  }

  static intro<A, B>(mp: (a: A) => B, mpr: (b: B) => A): Iff<A, B> {
      return new Iff(mp, mpr);
  }

  elim_left(): (a: A) => B {
      return this.#mp;
  }
  elim_right(): (b: B) => A {
      return this.#mpr;
  }
}
