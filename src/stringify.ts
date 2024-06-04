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

export const defaultFormatter = (behavior: string) => {
  if (behavior.startsWith("should")) {
    behavior = behavior.slice(6).trimStart();
  } else {
    return behavior;
  }
  if (behavior.startsWith("be ")) {
    behavior = behavior.slice(3);
  } else if (behavior.startsWith("n't be ") || behavior.startsWith("not be ")) {
    behavior = "not " + behavior.slice(7);
  } else if (behavior.startsWith("n't ") || behavior.startsWith("not ")) {
    behavior = "won't " + behavior.slice(4);
  }
  return behavior[0].toLocaleUpperCase() + behavior.slice(1);
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
