import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import transform from "./transform.ts";

describe("transform", () => {
  it("should transform tests to documentation", async () => {
    assertEquals(
      await transform(
        await Deno.readTextFile("./fixtures/input.ts"),
      ),
      await Deno.readTextFile("./fixtures/output.md"),
    );
  });
});
