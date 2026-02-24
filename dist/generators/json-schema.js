/**
 * JSON Schema Draft 7 Generator
 */
/**
 * Generate JSON Schema Draft 7 from a type definition
 */
export function generateJsonSchema(options) {
    const { typeName, typeDef } = options;
    const schema = {
        $schema: 'http://json-schema.org/draft-07/schema#',
        $id: `https://example.com/schemas/${typeName}.json`,
        title: typeName,
        description: `Auto-generated schema for ${typeName}`,
        ...convertTypeToJsonSchema(typeDef),
    };
    return JSON.stringify(schema, null, 2);
}
/**
 * Convert a TypeDefinition to JSON Schema format
 */
function convertTypeToJsonSchema(typeDef) {
    const base = {};
    switch (typeDef.kind) {
        case 'string':
            return { type: 'string' };
        case 'number':
            return { type: 'number' };
        case 'boolean':
            return { type: 'boolean' };
        case 'null':
            return { type: 'null' };
        case 'array':
            return {
                type: 'array',
                items: typeDef.items ? convertTypeToJsonSchema(typeDef.items) : { type: 'string' },
            };
        case 'object': {
            const properties = {};
            const required = typeDef.required || [];
            if (typeDef.properties) {
                for (const [key, value] of Object.entries(typeDef.properties)) {
                    properties[key] = convertTypeToJsonSchema(value);
                }
            }
            const schema = {
                type: 'object',
            };
            if (Object.keys(properties).length > 0) {
                schema.properties = properties;
            }
            if (required.length > 0) {
                schema.required = required;
            }
            return schema;
        }
        default:
            return { type: 'string' };
    }
}
//# sourceMappingURL=json-schema.js.map