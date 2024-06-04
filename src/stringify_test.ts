import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import stringify, {
  defaultFormatter,
  stringifyDescribe,
  stringifyIt,
} from "./stringify.ts";
import dedent from "dedent";

describe("defaultFormatter", () => {
  it("should do nothing to an empty string", () => {
    assertEquals(
      defaultFormatter(""),
      "",
    );
  });

  it("should format a positive sentence", () => {
    assertEquals(
      defaultFormatter("should do something"),
      "To do something",
    );
  });

  it("should format a negative sentence", () => {
    assertEquals(
      defaultFormatter("should not do something"),
      "Not to do something",
    );
  });

  it("should format a conjugated negative sentence", () => {
    assertEquals(
      defaultFormatter("shouldn't do something"),
      "Not to do something",
    );
  });
});

describe("stringifyIt", () => {
  it("should stringify it", () => {
    assertEquals(
      stringifyIt({
        behavior: "should do something",
        code: dedent`
          console.log("foo");
          assert("foo" !== "bar");
        `,
      }),
      dedent`
        To do something:

        \`\`\`typescript
        console.log("foo");
        assert("foo" !== "bar");
        \`\`\`
      `,
    );
  });
});

describe("stringifyDescribe", () => {
  it("should stringify describe", () => {
    assertEquals(
      stringifyDescribe({
        target: "foo",
        its: [
          {
            behavior: "should do something",
            code: dedent`
              console.log("foo");
              assert("foo" !== "bar");
            `,
          },
          {
            behavior: "should not do something else",
            code: dedent`
              console.log("bar");
              assert("bar" !== "baz");
            `,
          },
        ],
      }),
      dedent`
        ### \`foo\`

        To do something:

        \`\`\`typescript
        console.log("foo");
        assert("foo" !== "bar");
        \`\`\`

        Not to do something else:

        \`\`\`typescript
        console.log("bar");
        assert("bar" !== "baz");
        \`\`\`
      `,
    );
  });
});

describe("stringify", () => {
  it("should stringify describes", () => {
    assertEquals(
      stringify([
        {
          target: "foo",
          its: [
            {
              behavior: "should do something",
              code: dedent`
                console.log("foo");
                assert("foo" !== "bar");
              `,
            },
          ],
        },
        {
          target: "bar",
          its: [
            {
              behavior: "should not do something else",
              code: dedent`
                console.log("bar");
                assert("bar" !== "baz");
              `,
            },
          ],
        },
      ]),
      dedent`
        ### \`foo\`

        To do something:

        \`\`\`typescript
        console.log("foo");
        assert("foo" !== "bar");
        \`\`\`

        ### \`bar\`

        Not to do something else:

        \`\`\`typescript
        console.log("bar");
        assert("bar" !== "baz");
        \`\`\`
      ` + "\n",
    );
  });
});
