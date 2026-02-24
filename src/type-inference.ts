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
export function inferType(value: any, fieldName?: string): TypeDefinition {
  // Handle null
  if (value === null) {
    return { kind: 'null' };
  }

  // Handle primitive types
  const primitiveType = typeof value;
  if (primitiveType === 'string') {
    return { kind: 'string' };
  }
  if (primitiveType === 'number') {
    return { kind: 'number' };
  }
  if (primitiveType === 'boolean') {
    return { kind: 'boolean' };
  }

  // Handle array
  if (Array.isArray(value)) {
    if (value.length === 0) {
      // Empty array - default to string
      return { kind: 'array', items: { kind: 'string' } };
    }

    // Infer item type from first element
    // For a more robust solution, we could analyze all elements
    const firstItem = value[0];
    const itemsType = inferType(firstItem);

    return { kind: 'array', items: itemsType };
  }

  // Handle object
  if (primitiveType === 'object') {
    const properties: Record<string, TypeDefinition> = {};
    const keys = Object.keys(value);

    for (const key of keys) {
      properties[key] = inferType(value[key], key);
    }

    return {
      kind: 'object',
      properties,
      required: keys, // All fields are required in single-object inference
    };
  }

  // Fallback
  return { kind: 'string' };
}

/**
 * Infer type from multiple JSON examples
 * This handles optional fields by checking what appears in all examples vs some
 */
export function inferTypeFromExamples(examples: any[]): TypeDefinition {
  if (examples.length === 0) {
    return { kind: 'null' };
  }

  if (examples.length === 1) {
    return inferType(examples[0]);
  }

  // For objects, merge properties and track required vs optional
  const allTypes = examples.map(ex => inferType(ex));

  // Check if all examples are objects
  const allAreObjects = allTypes.every(t => t.kind === 'object');

  if (allAreObjects) {
    return mergeObjectTypeDefinitions(allTypes.filter(t => t.kind === 'object') as TypeDefinition[]);
  }

  // If not all objects, just use the first non-null type
  // (simplification - a more sophisticated version could create union types)
  return allTypes.find(t => t.kind !== 'null') || { kind: 'null' };
}

/**
 * Merge multiple object type definitions
 */
function mergeObjectTypeDefinitions(types: TypeDefinition[]): TypeDefinition {
  const mergedProperties: Record<string, TypeDefinition> = {};
  const requiredFields: string[] = [];
  const optionalFields: Set<string> = new Set();

  // Collect all unique property names
  const allPropertyNames = new Set<string>();
  for (const type of types) {
    if (type.properties) {
      Object.keys(type.properties).forEach(key => allPropertyNames.add(key));
    }
  }

  // For each property, check if it appears in all objects (required) or only some (optional)
  for (const propName of allPropertyNames) {
    const appearsInCount = types.filter(t => t.properties?.[propName]).length;

    if (appearsInCount === types.length) {
      // Required field - appears in all objects
      requiredFields.push(propName);
      // Merge the type definitions for this property
      const propertyTypes = types
        .map(t => t.properties![propName])
        .filter(t => t !== undefined);
      mergedProperties[propName] = mergeTypes(propertyTypes);
    } else {
      // Optional field - only appears in some objects
      optionalFields.add(propName);
      const propertyTypes = types
        .filter(t => t.properties?.[propName])
        .map(t => t.properties![propName]);
      if (propertyTypes.length > 0) {
        mergedProperties[propName] = mergeTypes(propertyTypes);
      }
    }
  }

  return {
    kind: 'object',
    properties: mergedProperties,
    required: requiredFields,
  };
}

/**
 * Merge multiple type definitions
 * This is a simplified version - could be extended for union types
 */
function mergeTypes(types: TypeDefinition[]): TypeDefinition {
  if (types.length === 0) {
    return { kind: 'null' };
  }

  if (types.length === 1) {
    return types[0];
  }

  // Check if all types are the same kind
  const firstKind = types[0].kind;
  const allSameKind = types.every(t => t.kind === firstKind);

  if (allSameKind) {
    if (firstKind === 'array' && types[0].items) {
      // Merge array item types
      const itemTypes = types
        .filter(t => t.items !== undefined)
        .map(t => t.items!);
      const mergedItems = mergeTypes(itemTypes);
      return { kind: 'array', items: mergedItems };
    }

    if (firstKind === 'object') {
      return mergeObjectTypeDefinitions(types);
    }

    return types[0];
  }

  // Mixed types - default to string (simplification)
  return { kind: 'string' };
}
