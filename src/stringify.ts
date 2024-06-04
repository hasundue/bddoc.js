import type { Describe, It } from "./types.ts";
import dedent from "dedent";

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
   * `should` from the beginning, and nornalize the verb by adding `To` at the
   * beginning.
   */
  format?: (behavior: string) => string;
}

const toTitleCase = (word: string) =>
  word[0].toLocaleUpperCase() + word.slice(1);

export const defaultFormatter = (behavior: string) => {
  let words = behavior.split(" ").filter((word) => word.trim().length);
  if (!words.length) {
    return behavior;
  }
  const first = () => words[0].toLocaleLowerCase();
  if (first() === "should") {
    words.shift();
  }
  if (first() === "shouldn't" || first() === "not") {
    words = ["not", "to", ...words.slice(1)];
  } else {
    words = ["to", ...words];
  }
  words[0] = toTitleCase(first());
  return words.join(" ");
};

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
