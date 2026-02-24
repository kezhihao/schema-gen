#!/usr/bin/env node
/**
 * Schema-Gen CLI
 *
 * A command-line tool to generate JSON Schema, TypeScript types, Zod validators,
 * and API documentation from JSON examples.
 */
import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { inferType, inferTypeFromExamples } from './type-inference.js';
import { generateJsonSchema } from './generators/json-schema.js';
import { generateTypeScript } from './generators/typescript.js';
import { generateZod } from './generators/zod.js';
import { generateApiDoc } from './generators/api-doc.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ALL_FORMATS = ['json-schema', 'typescript', 'zod', 'api-doc'];
// File extensions for each format
const FORMAT_EXTENSIONS = {
    'json-schema': '.schema.json',
    'typescript': '.ts',
    'zod': '.zod.ts',
    'api-doc': '.md',
};
const program = new Command();
program
    .name('schema-gen')
    .description('Generate JSON Schema, TypeScript types, Zod validators, and API docs from JSON examples')
    .version('1.0.0')
    .argument('<json...>', 'JSON example(s) to generate schemas from')
    .option('-o, --output <dir>', 'Output directory', './schemas')
    .option('-f, --formats <formats>', 'Output formats (comma-separated)', 'all')
    .option('-p, --prefix <name>', 'Type/prefix name', 'Schema')
    .option('--no-write', 'Print to stdout instead of writing files')
    .action((jsonStrings, options) => {
    try {
        // Parse JSON inputs
        const jsonExamples = jsonStrings.map(str => {
            try {
                return JSON.parse(str);
            }
            catch (err) {
                console.error(chalk.red(`Error parsing JSON: ${str}`));
                throw err;
            }
        });
        // Determine which formats to generate
        let formats = ALL_FORMATS;
        if (options.formats !== 'all') {
            formats = options.formats.split(',').map((f) => f.trim());
            // Validate formats
            const invalidFormats = formats.filter(f => !ALL_FORMATS.includes(f));
            if (invalidFormats.length > 0) {
                console.error(chalk.red(`Invalid formats: ${invalidFormats.join(', ')}`));
                console.error(chalk.yellow(`Available formats: ${ALL_FORMATS.join(', ')}`));
                process.exit(1);
            }
        }
        // Infer type from examples
        const typeDef = jsonExamples.length > 1
            ? inferTypeFromExamples(jsonExamples)
            : inferType(jsonExamples[0]);
        const typeName = options.prefix;
        // Generate outputs
        const outputs = {
            'json-schema': generateJsonSchema({ typeName, typeDef }),
            'typescript': generateTypeScript({ typeName, typeDef }),
            'zod': `import { z } from 'zod';\n\n` + generateZod({ typeName, typeDef }),
            'api-doc': generateApiDoc({ typeName, typeDef }),
        };
        // Output files or print to stdout
        if (options.write) {
            // Ensure output directory exists
            const outputDir = path.resolve(options.output);
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }
            // Write each format to its file
            for (const format of formats) {
                const filename = `${typeName}${FORMAT_EXTENSIONS[format]}`;
                const filepath = path.join(outputDir, filename);
                fs.writeFileSync(filepath, outputs[format], 'utf-8');
                console.log(chalk.green(`✓`) + ` ${format}: ${chalk.cyan(filepath)}`);
            }
            console.log(chalk.bold('\n✓ Done! Generated ' + formats.length + ' file(s).'));
        }
        else {
            // Print to stdout
            console.log(chalk.bold(`\n=== ${typeName} ===\n`));
            for (const format of formats) {
                console.log(chalk.bold(`--- ${format} ---`));
                console.log(outputs[format]);
                console.log('');
            }
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(chalk.red(`Error: ${error.message}`));
        }
        process.exit(1);
    }
});
// Parse command line arguments
program.parse();
//# sourceMappingURL=cli.js.map