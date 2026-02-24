#!/usr/bin/env node
/**
 * CLI UX Demo - Visual Showcase
 * Run with: npm run demo
 */
import { header, error, warning, info, step, substep, progress, list, nextSteps, done, summary, link, createSpinner, validationError, jsonParseError, } from './cli-ux.js';
console.clear();
// ============================================================================
// 1. HEADER SHOWCASE
// ============================================================================
header('Schema-Gen v1.0.0 - CLI UX Demo');
// ============================================================================
// 2. SUCCESS SCENARIO
// ============================================================================
step('Analyzing JSON input...');
substep('Detected: 3 properties', 'done');
substep('Detected: 2 nested objects', 'done');
substep('Inferred: 2 array types', 'done');
console.log();
step('Generating schemas...');
substep('schema.json (JSON Schema Draft 7)', 'done');
substep('types.ts (TypeScript interfaces)', 'done');
substep('validator.zod.ts (Zod schemas)', 'done');
substep('api-doc.md (API documentation)', 'done');
console.log();
done('Files written to ./schemas', {
    formats: 4,
    files: 4,
    duration: '120ms',
});
nextSteps([
    'npm install zod  # for runtime validation',
    'import { Schema } from "./types"',
]);
console.log();
console.log(chalk.dim('─'.repeat(60)));
console.log();
// ============================================================================
// 3. ERROR SHOWCASE
// ============================================================================
error('Invalid JSON input', 'Check for missing values or trailing commas', 'JSON001');
console.log();
console.log(chalk.dim('─'.repeat(60)));
console.log();
// ============================================================================
// 4. VALIDATION ERROR
// ============================================================================
validationError('user.age', 'number', 'undefined');
console.log();
console.log(chalk.dim('─'.repeat(60)));
console.log();
// ============================================================================
// 5. JSON PARSE ERROR
// ============================================================================
const badJson = '{"name": "John", "age": }';
jsonParseError(badJson, 23);
console.log();
link('https://github.com/autocompany-dev/schema-gen', 'Documentation');
link('jsonlint.com', 'Validate your JSON');
console.log();
console.log(chalk.dim('─'.repeat(60)));
console.log();
// ============================================================================
// 6. WARNING & INFO
// ============================================================================
warning('Output directory already exists, will overwrite files');
console.log();
info('Using default prefix: Schema');
console.log();
console.log(chalk.dim('─'.repeat(60)));
console.log();
// ============================================================================
// 7. PROGRESS BAR
// ============================================================================
step('Processing large JSON...');
console.log();
progress(3, 10, 30);
progress(5, 10, 30);
progress(8, 10, 30);
progress(10, 10, 30);
console.log();
console.log(chalk.dim('─'.repeat(60)));
console.log();
// ============================================================================
// 8. LIST & KEY-VALUE
// ============================================================================
header('Generated Files');
list([
    'schema.json - JSON Schema Draft 7',
    'types.ts - TypeScript interface definitions',
    'validator.zod.ts - Zod runtime validators',
    'api-doc.md - Markdown API documentation',
]);
console.log();
summary({
    'Total size': '12.5 KB',
    'Properties': 15,
    'Nested objects': 3,
    'Arrays': 2,
});
console.log();
console.log(chalk.dim('─'.repeat(60)));
console.log();
// ============================================================================
// 9. SPINNER DEMO
// ============================================================================
const spinner = createSpinner('Simulating async work...');
spinner.start();
let count = 0;
const interval = setInterval(() => {
    count++;
    spinner.update(`Processing step ${count}/5...`);
    if (count >= 5) {
        clearInterval(interval);
        spinner.stop(true, 'Async work complete!');
        console.log();
    }
}, 500);
// Wait for spinner to finish before next section
setTimeout(() => {
    console.log(chalk.dim('─'.repeat(60)));
    console.log();
    // ============================================================================
    // 10. FULL WORKFLOW EXAMPLE
    // ============================================================================
    header('Full Workflow Example');
    step('Analyzing input JSON...');
    substep('Detected 8 properties', 'done');
    substep('Found 3 nested objects', 'done');
    console.log();
    step('Generating output files...');
    substep('schema.json', 'done');
    substep('types.ts', 'done');
    substep('validator.zod.ts', 'done');
    console.log();
    done('Generation complete!', {
        'files written': 3,
        'time elapsed': '85ms',
    });
    nextSteps([
        'cd ./schemas',
        'npm install zod',
        'Import types in your project',
    ]);
    console.log();
    console.log(chalk.bold.cyan('Demo complete! Run "npm run demo" again to replay.'));
    console.log();
}, 3500);
// Import chalk for dim divider
import chalk from 'chalk';
//# sourceMappingURL=demo-cli-ux.js.map