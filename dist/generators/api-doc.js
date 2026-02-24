/**
 * API Documentation Generator (Markdown)
 */
/**
 * Generate API documentation from a type definition
 */
export function generateApiDoc(options) {
    const { typeName, typeDef } = options;
    const lines = [];
    lines.push(`# ${typeName}`);
    lines.push('');
    lines.push('## Schema');
    lines.push('');
    lines.push('| Field | Type | Required | Description |');
    lines.push('|-------|------|----------|-------------|');
    if (typeDef.kind === 'object' && typeDef.properties) {
        const requiredFields = new Set(typeDef.required || []);
        for (const [key, value] of Object.entries(typeDef.properties)) {
            const typeStr = getTypeDisplayName(value);
            const required = requiredFields.has(key) ? 'Yes' : 'No';
            const description = getTypeDescription(value);
            lines.push(`| ${key} | \`${typeStr}\` | ${required} | ${description} |`);
        }
    }
    else {
        const typeStr = getTypeDisplayName(typeDef);
        lines.push(`| *value* | \`${typeStr}\` | Yes | ${getTypeDescription(typeDef)} |`);
    }
    lines.push('');
    lines.push('## Example');
    lines.push('');
    lines.push('```json');
    lines.push(generateExample(typeDef, 0));
    lines.push('```');
    return lines.join('\n');
}
/**
 * Get a human-readable type name
 */
function getTypeDisplayName(typeDef) {
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
                return `${getTypeDisplayName(typeDef.items)}[]`;
            }
            return 'any[]';
        case 'object':
            if (!typeDef.properties || Object.keys(typeDef.properties).length === 0) {
                return 'object';
            }
            const fields = Object.keys(typeDef.properties).join(', ');
            return `{ ${fields} }`;
        default:
            return 'any';
    }
}
/**
 * Get a description for a type
 */
function getTypeDescription(typeDef) {
    if (typeDef.description) {
        return typeDef.description;
    }
    switch (typeDef.kind) {
        case 'string':
            return 'A string value';
        case 'number':
            return 'A numeric value';
        case 'boolean':
            return 'A boolean value (true/false)';
        case 'null':
            return 'A null value';
        case 'array':
            return 'An array of items';
        case 'object':
            return 'An object with properties';
        default:
            return '';
    }
}
/**
 * Generate an example JSON value from a type definition
 */
function generateExample(typeDef, indent = 0) {
    const indentation = '  '.repeat(indent);
    switch (typeDef.kind) {
        case 'string':
            return '"example"';
        case 'number':
            return '123';
        case 'boolean':
            return 'true';
        case 'null':
            return 'null';
        case 'array':
            if (typeDef.items) {
                const itemExample = generateExample(typeDef.items, 0);
                return `[\n${indentation}  ${itemExample}\n${indentation}]`;
            }
            return '[]';
        case 'object':
            if (!typeDef.properties || Object.keys(typeDef.properties).length === 0) {
                return '{}';
            }
            const fields = Object.entries(typeDef.properties)
                .map(([key, value]) => {
                const valueExample = generateExample(value, indent + 1);
                return `${indentation}  "${key}": ${valueExample}`;
            })
                .join(',\n');
            return `{\n${fields}\n${indentation}}`;
        default:
            return 'null';
    }
}
//# sourceMappingURL=api-doc.js.map