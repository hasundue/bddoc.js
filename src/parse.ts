import { match, placeholder as _ } from "@core/match";
import { mapNotNullish } from "@std/collections";
import type { Statement } from "@swc/types";
// @deno-types="@swc/core";
import * as swc from "@swc/core";
import type { Describe } from "./types.ts";

const describePattern = {
  type: "ExpressionStatement",
  expression: {
    type: "CallExpression",
    callee: { type: "Identifier", value: "describe" },
    arguments: [
      { expression: { value: _("target") } },
      { expression: { body: { stmts: _("its") } } },
    ],
  },
};

type DescribePrecursor = {
  target: string;
  its: Statement[];
};

const itPattern = {
  type: "ExpressionStatement",
  expression: {
    type: "CallExpression",
    callee: { type: "Identifier", value: "it" },
    arguments: [
      { expression: { value: _("behavior") } },
      { expression: { body: { stmts: _("code") } } },
    ],
  },
};

type ItPrecursor = {
  behavior: string;
  code: Statement[];
};

/**
 * Parse a test code string to an array of describe objects.
 * @param src The test code string.
 */
export default async function parse(src: string): Promise<Describe[]> {
  const tree = await swc.parse(src, {
    comments: true,
    syntax: "typescript",
  });
  const getSpan = (stmt: Statement) => ({
    start: stmt.span.start - tree.span.start,
    end: stmt.span.end - tree.span.start,
  });
  return mapNotNullish(
    tree.body,
    (item) => match(describePattern, item) as DescribePrecursor | undefined,
  ).map(({ target, its }) => ({
    target,
    its: mapNotNullish(
      its,
      (it) => match(itPattern, it) as ItPrecursor | undefined,
    ).map(({ behavior, code }) => ({
      behavior,
      code: code.map((stmt) => {
        const { start, end } = getSpan(stmt);
        return src.slice(start, end);
      }).join("\n"),
    })),
  }));
}
