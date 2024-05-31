import { assertEquals, assertNotEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";

describe("foo", () => {
  it("should do something", () => {
    assertEquals("foo", "foo");
  });
});

describe("bar", () => {
  it("should do something else", () => {
    assertEquals("bar", "bar");
  });

  it("should not do something more", () => {
    assertNotEquals("bar", "baz");
  });
});
