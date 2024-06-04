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

<!-- transform -->

<!-- parse -->

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
