/**
 * TypeScript Interface Generator
 */

import type { TypeDefinition } from '../type-inference.js';

export interface GenerateOptions {
  typeName: string;
  typeDef: TypeDefinition;
}

/**
 * Generate TypeScript interface from a type definition
 */
export function generateTypeScript(options: GenerateOptions): string {
  const { typeName, typeDef } = options;

  const interfaceDef = `export interface ${typeName} ${convertTypeToTypeScript(typeDef)}`;

  return interfaceDef;
}

/**
 * Convert a TypeDefinition to TypeScript type string
 */
function convertTypeToTypeScript(typeDef: TypeDefinition, indent = 0): string {
  const indentation = '  '.repeat(indent);

  switch (typeDef.kind) {
    case 'string':
      return 'string';

    case 'number':
      return 'number';

    case 'boolean':
      return 'boolean';

    case 'null':
      return 'null';

    case 'array':
      if (typeDef.items) {
        const itemType = convertTypeToTypeScript(typeDef.items, indent);
        // Wrap complex types in parentheses
        if (itemType.includes('|') || itemType.includes('{') || itemType.includes('[')) {
          return `Array<${itemType}>`;
        }
        return `${itemType}[]`;
      }
      return 'any[]';

    case 'object': {
      if (!typeDef.properties || Object.keys(typeDef.properties).length === 0) {
        return 'Record<string, any>';
      }

      const requiredFields = new Set(typeDef.required || []);

      const fields = Object.entries(typeDef.properties)
        .map(([key, value]) => {
          const fieldType = convertTypeToTypeScript(value, indent + 1);
          const isOptional = !requiredFields.has(key);
          return `${indentation}  ${key}${isOptional ? '?' : ''}: ${fieldType};`;
        })
        .join('\n');

      return `{\n${fields}\n${indentation}}`;
    }

    default:
      return 'any';
  }
}
