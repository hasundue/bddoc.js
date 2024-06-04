import { transform } from "../mod.ts";

Deno.chdir(new URL("../", import.meta.url));

const template = await Deno.readTextFile("./docs/readme.md");

const output = template
  .replace(
    "<!-- transform -->\n",
    await transform(
      await Deno.readTextFile("./src/transform_test.ts"),
    ),
  )
  .replace(
    "<!-- parse -->\n",
    await transform(
      await Deno.readTextFile("./src/parse_test.ts"),
    ),
  );

await Deno.writeTextFile("README.md", output);

await new Deno.Command("deno", {
  args: ["fmt", "README.md"],
}).output();
