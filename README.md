# bddoc.js

A library to transform `describe` and `it` blocks in JavaScript/TypeScript into
markdown documentation.

As an example, the usage below is generated from the actual tests with `bddoc`
itself.

## Usage

```typeScript
import { parse, transform } from "jsr:@chiezo/bddoc";
```

### transform

Transforms tests to documentation:

```typescript
assertEquals(
  await transform(
    await Deno.readTextFile("./fixtures/input.ts"),
  ),
  await Deno.readTextFile("./fixtures/output.md"),
);
```

### parse

Parse `describe` and `it`:

```typescript
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
```
