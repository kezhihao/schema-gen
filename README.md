# Schema-Gen

CLI tool to generate JSON Schema, TypeScript types, Zod validators, and API documentation from JSON examples.

## Installation

```bash
npm install -g schema-gen
```

Or use directly with npx:

```bash
npx schema-gen '{"name":"John","age":30}'
```

## Usage

```bash
schema-gen '<json>' [options]
```

### Options

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--output <dir>` | `-o` | Output directory | `./schemas` |
| `--formats <...>` | `-f` | Output formats (comma-separated) | `all` |
| `--prefix <name>` | `-p` | Type/prefix name | `Schema` |
| `--write` | `-w` | Write files to disk | `true` |

### Available Formats

- `json-schema` - JSON Schema Draft 7
- `typescript` - TypeScript interface
- `zod` - Zod validator
- `api-doc` - API documentation (Markdown)

## Examples

### Basic Usage

```bash
schema-gen '{"name":"John","age":30,"active":true}'
```

Output files:
- `./schemas/Schema.schema.json`
- `./schemas/Schema.ts`
- `./schemas/Schema.zod.ts`
- `./schemas/Schema.md`

### Custom Type Name

```bash
schema-gen '{"name":"John","email":"john@example.com"}' -p User
```

Creates: `User.schema.json`, `User.ts`, `User.zod.ts`, `User.md`

### Specific Formats Only

```bash
schema-gen '{"tags":["tech","code"]}' -f typescript,zod
```

Only generates TypeScript and Zod files.

### Nested Objects

```bash
schema-gen '{"user":{"name":"John","email":"john@example.com"},"admin":true}'
```

### Complex Arrays

```bash
schema-gen '{"users":[{"id":1,"name":"John"},{"id":2,"name":"Jane"}]}'
```

### Multiple Examples (detects optional fields)

```bash
schema-gen '{"name":"John","age":30}' '{"name":"Jane","email":"jane@example.com"}'
```

Result: `name` is required, `age` and `email` are optional.

### Print to Stdout (don't write files)

```bash
schema-gen '{"name":"John"}' --no-write
```

## Programmatic Usage

```typescript
import { generateAll } from 'schema-gen';

const schemas = generateAll(
  { name: 'John', age: 30 },
  'User'
);

console.log(schemas.typescript);
console.log(schemas.zod);
console.log(schemas.jsonSchema);
console.log(schemas.apiDoc);
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev

# Test
npm test
```

## License

MIT
