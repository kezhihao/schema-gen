/**
 * API Documentation Generator (Markdown)
 */
import type { TypeDefinition } from '../type-inference.js';
export interface GenerateOptions {
    typeName: string;
    typeDef: TypeDefinition;
}
/**
 * Generate API documentation from a type definition
 */
export declare function generateApiDoc(options: GenerateOptions): string;
//# sourceMappingURL=api-doc.d.ts.map