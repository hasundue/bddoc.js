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

  it("should do nothing to a string without `should`", () => {
    assertEquals(
      defaultFormatter("do something"),
      "do something",
    );
  });

  it("should replace `should` with `to`", () => {
    assertEquals(
      defaultFormatter("should do something"),
      "Do something",
    );
  });

  it("should replace `should not do` with `Not`", () => {
    assertEquals(
      defaultFormatter("should not do something"),
      "Not do something",
    );
  });

  it("should replace `shouldn't do` with `Not do`", () => {
    assertEquals(
      defaultFormatter("shouldn't do something"),
      "Not do something",
    );
  });

  it("should remove `should be`", () => {
    assertEquals(
      defaultFormatter("should be testable"),
      "Testable",
    );
  });

  it("should replace `should not be` with `Not`", () => {
    assertEquals(
      defaultFormatter("should not be testable"),
      "Not testable",
    );
  });

  it("should replace `shouldn't be` with `Not`", () => {
    assertEquals(
      defaultFormatter("shouldn't be testable"),
      "Not testable",
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
        Do something:

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

        Do something:

        \`\`\`typescript
        console.log("foo");
        assert("foo" !== "bar");
        \`\`\`

        Not do something else:

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

        Do something:

        \`\`\`typescript
        console.log("foo");
        assert("foo" !== "bar");
        \`\`\`

        ### \`bar\`

        Not do something else:

        \`\`\`typescript
        console.log("bar");
        assert("bar" !== "baz");
        \`\`\`
      ` + "\n",
    );
  });
});
