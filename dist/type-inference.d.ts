/**
 * Type Inference Engine
 *
 * Analyzes JSON values and infers their type definitions.
 * Supports: string, number, boolean, array, object, null
 */
export type TypeKind = 'string' | 'number' | 'boolean' | 'array' | 'object' | 'null';
export interface TypeDefinition {
    kind: TypeKind;
    properties?: Record<string, TypeDefinition>;
    items?: TypeDefinition;
    required?: string[];
    enum?: any[];
    description?: string;
}
/**
 * Infer the type definition from a JSON value
 */
export declare function inferType(value: any, fieldName?: string): TypeDefinition;
/**
 * Infer type from multiple JSON examples
 * This handles optional fields by checking what appears in all examples vs some
 */
export declare function inferTypeFromExamples(examples: any[]): TypeDefinition;
//# sourceMappingURL=type-inference.d.ts.map