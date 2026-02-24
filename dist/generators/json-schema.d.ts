/**
 * JSON Schema Draft 7 Generator
 */
import type { TypeDefinition } from '../type-inference.js';
export interface GenerateOptions {
    typeName: string;
    typeDef: TypeDefinition;
}
/**
 * Generate JSON Schema Draft 7 from a type definition
 */
export declare function generateJsonSchema(options: GenerateOptions): string;
//# sourceMappingURL=json-schema.d.ts.map