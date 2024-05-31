import { assertEquals, assertObjectMatch } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import parse from "./parse.ts";

describe("parse", () => {
  it("should parse `describe` and `it`", async () => {
    const describes = await parse(
      await Deno.readTextFile("./fixtures/input.ts"),
    );
    assertEquals(describes.length, 2);
    assertObjectMatch(describes[0], {
      target: "foo",
      its: [
        {
          behavior: "should do something",
          code: 'assertEquals("foo", "foo");',
        },
      ],
    });
    assertObjectMatch(describes[1], {
      target: "bar",
      its: [
        {
          behavior: "should do something else",
          code: `assertEquals("bar", "bar");`,
        },
        {
          behavior: "should not do something more",
          code: `assertNotEquals("bar", "baz");`,
        },
      ],
    });
  });
});
