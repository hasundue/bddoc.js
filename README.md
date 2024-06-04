# bddoc.js

A TypeScript/JavaScript library to generate markdown documentation from test
codes in BDD style.

> [!WARNING]\
> Alpha version. Not tested extensively yet. APIs may change frequently.

## Usage

### Deno

```sh
deno add jsr:@chiezo/bddoc
```

## APIs

> [!NOTE]\
> This section is generated with `bddoc` itself from `transform_test.ts` and
> `parse_test.ts`.

```typeScript
import { parse, transform } from "@chiezo/bddoc";
```

### `transform`

Transform tests to documentation:

```typescript
assertEquals(
  await transform(
    await Deno.readTextFile("./fixtures/input.ts"),
  ),
  await Deno.readTextFile("./fixtures/output.md"),
);
```

### `parse`

Parse `describe` and `it` from tests:

```typescript
const describes = await parse(
  await Deno.readTextFile("./fixtures/input.ts"),
);
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

## Todo

- Runtimes
  - [ ] Browsers
  - [ ] Bun
  - [x] Deno
  - [ ] Node.js
- Test Interfaces
  - [ ] `Deno.test`
  - [x] `describe` `it`
- Assertion Interfaces
  - [ ] `@std/assert`
  - [ ] `expect`
- Backend
  - [x] Built-in (rule-based)
  - [ ] LLM (?)
