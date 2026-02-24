/**
 * Schema-Gen Library
 *
 * Core library for generating schemas from JSON examples.
 * Can be used programmatically or via CLI.
 */
export { inferType, inferTypeFromExamples } from './type-inference.js';
export { generateJsonSchema } from './generators/json-schema.js';
export { generateTypeScript } from './generators/typescript.js';
export { generateZod } from './generators/zod.js';
export { generateApiDoc } from './generators/api-doc.js';
// Re-import for use in generateAll function
import { inferType } from './type-inference.js';
import { generateJsonSchema } from './generators/json-schema.js';
import { generateTypeScript } from './generators/typescript.js';
import { generateZod } from './generators/zod.js';
import { generateApiDoc } from './generators/api-doc.js';
/**
 * Generate all formats from a JSON example
 */
export function generateAll(json, typeName = 'Schema') {
    const typeDef = inferType(json);
    return {
        jsonSchema: generateJsonSchema({ typeName, typeDef }),
        typescript: generateTypeScript({ typeName, typeDef }),
        zod: `import { z } from 'zod';\n\n` + generateZod({ typeName, typeDef }),
        apiDoc: generateApiDoc({ typeName, typeDef }),
    };
}
//# sourceMappingURL=index.js.map