import type { Describe, It } from "./types.ts";
import dedent from "dedent";
import nlp from "compromise";

/**
 * Options for stringifying a describe object.
 */
export interface StringifyOptions {
  /**
   * The heading level for the target of the describe.
   * @default 3
   */
  heading?: number;
  /**
   * A function to format the behavior of an it. By default, it will remove
   * `should` from the beginning, transform the first word to the present
   * tense or future tense for negation, and capitalize the first letter.
   */
  format?: (behavior: string) => string;
}

export const defaultFormatter = (behavior: string) => {
  const words = behavior.split(" ");
  if (words[0].toLocaleLowerCase() === "should") {
    words.shift();
  }
  if (words[0] === "not" || words[0] === "shouldn't") {
    words[0] = "won't";
  } else {
    words[0] = toThirdPersonSingular(words[0]);
  }
  words[0] = toTitleCase(words[0]);
  return words.join(" ");
};

const toThirdPersonSingular = (verb: string) =>
  nlp(verb).sentences().toPresentTense().text();

const toTitleCase = (word: string) =>
  word[0].toLocaleUpperCase() + word.slice(1);

export function stringifyDescribe(
  describe: Describe,
  options: StringifyOptions = {},
): string {
  return dedent`
    ${"#".repeat(options.heading ?? 3)} \`${describe.target}\`
    
    ${describe.its.map((it) => stringifyIt(it, options)).join("\n\n")}
  `;
}

export function stringifyIt(
  it: It,
  options: StringifyOptions = {},
): string {
  const format = options.format ?? defaultFormatter;
  return dedent`
    ${format(it.behavior)}:

    \`\`\`typescript
    ${it.code}
    \`\`\`
  `;
}

export default function stringify(
  describes: Describe[],
  options: StringifyOptions = {},
): string {
  return describes.map(
    (it) => stringifyDescribe(it, options),
  ).join("\n\n") + "\n";
}
