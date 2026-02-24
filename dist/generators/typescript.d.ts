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
export declare function generateTypeScript(options: GenerateOptions): string;
//# sourceMappingURL=typescript.d.ts.map