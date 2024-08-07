import { match, placeholder as _ } from "@core/match";
import { mapNotNullish } from "@std/collections";
import initSwc, { parseSync, type Statement } from "@swc/wasm-web";
import type { Describe } from "./types.ts";

await initSwc();

const describePattern = {
  type: "ExpressionStatement",
  expression: {
    type: "CallExpression",
    callee: { type: "Identifier", value: "describe" },
    arguments: [
      { expression: { value: _("target") } },
      { expression: { body: { stmts: _("stmts") } } },
    ],
  },
};

type DescribePrecursor = {
  target: string;
  stmts: Statement[];
};

const itPattern = {
  type: "ExpressionStatement",
  expression: {
    type: "CallExpression",
    callee: { type: "Identifier", value: "it" },
    arguments: [
      { expression: { value: _("behavior") } },
      { expression: { body: { stmts: _("stmts") } } },
    ],
  },
};

type ItPrecursor = {
  behavior: string;
  stmts: Statement[];
};

/**
 * Parse a test code string to an array of describe objects.
 * @param src The test code string.
 */
export default function parse(src: string): Describe[] {
  const { body, span } = parseSync(src, {
    comments: true,
    syntax: "typescript",
  });
  const getSpan = (stmt: Statement) => ({
    start: stmt.span.start - span.start,
    end: stmt.span.end - span.start,
  });
  return mapNotNullish(
    body,
    (item) => match(describePattern, item) as DescribePrecursor | undefined,
  ).map(({ target, stmts }) => ({
    target,
    its: mapNotNullish(
      stmts,
      (it) => match(itPattern, it) as ItPrecursor | undefined,
    ).map(({ behavior, stmts }) => ({
      behavior,
      code: stmts.map((stmt) => {
        const { start, end } = getSpan(stmt);
        return src.slice(start, end);
      }).join("\n"),
    })),
  }));
}
