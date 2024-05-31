/**
 * A parsed `describe` object.
 */
export interface Describe {
  /** The first argument of the `describe`. */
  target: string;
  /** The array of `it` in the `describe`. */
  its: It[];
}

/**
 * A parsed `it` object.
 */
export interface It {
  /** The first argument of the `it`. */
  behavior: string;
  /** The body of the `it`. */
  code: string;
}
