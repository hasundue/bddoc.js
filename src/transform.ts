import parse from "./parse.ts";
import stringify, { type StringifyOptions } from "./stringify.ts";

export type { StringifyOptions };

/**
 * Options for transforming a test code string to a markdown document string.
 */
export interface TransformOptions extends StringifyOptions {
}

/**
 * Transform a test code string to a markdown document string.
 * @param src The test code string.
 * @param options The options for transforming.
 */
export default async function transform(
  src: string,
  options: TransformOptions = {},
): Promise<string> {
  return stringify(await parse(src), options);
}
