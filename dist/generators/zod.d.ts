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
export declare function generateZod(options: GenerateOptions): string;
//# sourceMappingURL=zod.d.ts.map