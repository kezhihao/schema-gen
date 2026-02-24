/**
 * Zod Validator Generator
 */

import type { TypeDefinition } from '../type-inference.js';

export interface GenerateOptions {
  typeName: string;
  typeDef: TypeDefinition;
}

/**
 * Generate Zod validator from a type definition
 */
export function generateZod(options: GenerateOptions): string {
  const { typeName, typeDef } = options;

  const zodDef = `export const ${typeName}Schema = ${convertTypeToZod(typeDef, 0)};\n\nexport type ${typeName} = z.infer<typeof ${typeName}Schema>;`;

  return zodDef;
}

/**
 * Convert a TypeDefinition to Zod schema string
 */
function convertTypeToZod(typeDef: TypeDefinition, indent = 0): string {
  const indentation = '  '.repeat(indent);

  switch (typeDef.kind) {
    case 'string':
      return 'z.string()';

    case 'number':
      return 'z.number()';

    case 'boolean':
      return 'z.boolean()';

    case 'null':
      return 'z.null()';

    case 'array':
      if (typeDef.items) {
        const itemSchema = convertTypeToZod(typeDef.items, indent);
        // For complex item types, we need to wrap properly
        if (itemSchema.includes('\n')) {
          return `z.array(\n${indentation}  ${itemSchema}\n${indentation})`;
        }
        return `z.array(${itemSchema})`;
      }
      return 'z.array(z.any())';

    case 'object': {
      if (!typeDef.properties || Object.keys(typeDef.properties).length === 0) {
        return 'z.record(z.any())';
      }

      const requiredFields = new Set(typeDef.required || []);

      const fields = Object.entries(typeDef.properties)
        .map(([key, value]) => {
          const fieldSchema = convertTypeToZod(value, indent + 2);
          const isOptional = !requiredFields.has(key);

          // Handle nested objects in zod
          if (fieldSchema.includes('\n')) {
            // Multi-line schema
            const lines = fieldSchema.split('\n');
            const firstLine = lines[0];
            const restLines = lines.slice(1).map(l => `${indentation}    ${l}`).join('\n');
            const baseSchema = `${firstLine}\n${restLines}`;

            if (isOptional) {
              return `${indentation}    ${key}: ${baseSchema}.optional(),`;
            }
            return `${indentation}    ${key}: ${baseSchema},`;
          } else {
            // Single-line schema
            if (isOptional) {
              return `${indentation}    ${key}: ${fieldSchema}.optional(),`;
            }
            return `${indentation}    ${key}: ${fieldSchema},`;
          }
        })
        .join('\n');

      return `z.object({\n${fields}\n${indentation}})`;
    }

    default:
      return 'z.any()';
  }
}
