/**
 * CLI UX Design System
 * Based on Material Design principles: bold, graphic, intentional
 *
 * Color Semantics:
 *   green    - Success, completion
 *   red      - Errors, critical issues
 *   yellow   - Warnings, caution
 *   blue     - Information, neutral
 *   cyan     - Highlights, key values
 *   dim/gray - Supporting text, steps
 *   magenta  - Brand accent
 *
 * Typography Hierarchy:
 *   Headers   - Bold, prominent
 *   Body      - Regular weight
 *   Metadata  - Dimmed, smaller
 *
 * Spacing: 4px grid system (2 spaces = 1 unit)
 */

import chalk from 'chalk';

// ============================================================================
// COLOR PALETTE - Semantic color mapping
// ============================================================================

const colors = {
  success: chalk.green,
  error: chalk.red,
  warning: chalk.yellow,
  info: chalk.blue,
  highlight: chalk.cyan,
  dim: chalk.dim,
  brand: chalk.magenta,
  bold: chalk.bold,
} as const;

// ============================================================================
// SYMBOLS - Unicode icons for visual scanning
// ============================================================================

const icons = {
  success: '✓',
  error: '✗',
  warning: '⚠',
  info: 'ℹ',
  sparkle: '✨',
  rocket: '🚀',
  package: '📦',
  document: '📝',
  bulb: '💡',
  book: '📚',
  clock: '⏱',
  check: '✅',
  cross: '❌',
  spinner: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
} as const;

// ============================================================================
// BASE OUTPUT FUNCTIONS
// ============================================================================

/**
 * Print a success message with icon and color
 * @param message - The success message to display
 * @param details - Optional additional details
 */
export function success(message: string, details?: string): void {
  console.log(`${colors.success(icons.check)} ${colors.bold(message)}`);
  if (details) {
    console.log(`  ${colors.dim(details)}`);
  }
}

/**
 * Print an error message with icon, color, and optional hint
 * @param message - The error message to display
 * @param hint - Optional hint for resolution
 * @param code - Optional error code for reference
 */
export function error(message: string, hint?: string, code?: string): void {
  console.log(`${colors.error(icons.cross)} ${colors.bold.red('Error:')} ${message}`);
  if (hint) {
    console.log();
    console.log(`${colors.dim('   ' + icons.bulb + ' Hint:')} ${hint}`);
  }
  if (code) {
    console.log(`   ${colors.dim(`Error code: ${code}`)}`);
  }
}

/**
 * Print a warning message
 * @param message - The warning message to display
 */
export function warning(message: string): void {
  console.log(`${colors.warning(icons.warning)} ${colors.bold.yellow('Warning:')} ${message}`);
}

/**
 * Print an informational message
 * @param message - The info message to display
 */
export function info(message: string): void {
  console.log(`${colors.info(icons.info)} ${message}`);
}

// ============================================================================
// STEP AND PROGRESS FUNCTIONS
// ============================================================================

/**
 * Print a step header with icon
 * @param message - The step description
 */
export function step(message: string): void {
  console.log(`${icons.package} ${message}`);
}

/**
 * Print a sub-step with indentation
 * @param message - The sub-step description
 * @param status - Optional status indicator
 */
export function substep(message: string, status: 'pending' | 'active' | 'done' = 'pending'): void {
  const statusIcon = {
    pending: colors.dim('○'),
    active: colors.highlight(icons.spinner[0]),
    done: colors.success(icons.success),
  }[status];

  console.log(`   ${statusIcon} ${message}`);
}

/**
 * Update a sub-step status (in-place update via carriage return)
 * @param index - Step index for tracking
 * @param message - Updated message
 * @param spinFrame - Optional spinner frame index
 */
export function updateSubstep(index: number, message: string, spinFrame?: number): void {
  const spinner = spinFrame !== undefined
    ? colors.highlight(icons.spinner[spinFrame % icons.spinner.length])
    : colors.success(icons.success);

  // Clear line and print updated status
  process.stdout.write('\r' + `   ${spinner} ${message}`.padEnd(80) + '\r');
}

/**
 * Render a progress bar
 * @param current - Current progress value
 * @param total - Total value for completion
 * @param width - Bar width in characters (default: 30)
 */
export function progress(current: number, total: number, width: number = 30): void {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));
  const filled = Math.floor((percentage / 100) * width);
  const empty = width - filled;

  const bar = colors.success('█'.repeat(filled)) + colors.dim('░'.repeat(empty));
  const label = `${Math.round(percentage)}%`;

  console.log(`   ${bar} ${colors.dim(label)}`);
}

// ============================================================================
// LAYOUT AND SECTIONS
// ============================================================================

/**
 * Print a section header with underline
 * @param title - Section title
 * @param icon - Optional icon (default: sparkle)
 */
export function header(title: string, icon: string = icons.sparkle): void {
  console.log();
  console.log(`${icon} ${colors.bold.magenta(title)}`);
  console.log(colors.dim('─'.repeat(title.length + 3)));
  console.log();
}

/**
 * Print a list with consistent indentation
 * @param items - Array of strings to list
 * @param bullet - Bullet character (default: '•')
 */
export function list(items: string[], bullet: string = '•'): void {
  items.forEach(item => {
    console.log(`  ${colors.dim(bullet)} ${item}`);
  });
}

/**
 * Print a key-value pair
 * @param key - The key/label
 * @param value - The value
 * @param color - Optional color function for the value
 */
export function kv(key: string, value: string, color?: (s: string) => string): void {
  const coloredValue = color ? color(value) : colors.highlight(value);
  console.log(`  ${colors.dim(key + ':')} ${coloredValue}`);
}

/**
 * Print a code block with syntax highlighting effect
 * @param code - The code to display
 * @param language - Optional language label
 */
export function code(code: string, language?: string): void {
  if (language) {
    console.log(`  ${colors.dim(language)}`);
  }
  console.log(`${colors.dim('┌─')} ${colors.bold('Code')}`);
  console.log(`│`);
  code.split('\n').forEach(line => {
    console.log(`│ ${colors.dim(line)}`);
  });
  console.log(`│`);
  console.log(`${colors.dim('└─')}`);
}

// ============================================================================
// SPECIALTY OUTPUTS
// ============================================================================

/**
 * Print next steps suggestions
 * @param steps - Array of action items
 */
export function nextSteps(steps: string[]): void {
  console.log();
  console.log(`${icons.bulb} ${colors.bold('Next steps:')}`);
  steps.forEach(step => {
    console.log(`   ${colors.dim(step)}`);
  });
}

/**
 * Print a summary table
 * @param data - Object with key-value pairs
 */
export function summary(data: Record<string, string | number>): void {
  console.log();
  console.log(`${icons.document} ${colors.bold('Summary:')}`);
  const entries = Object.entries(data);
  const maxKeyLen = Math.max(...entries.map(([k]) => k.length));

  entries.forEach(([key, value]) => {
    const paddedKey = key.padEnd(maxKeyLen);
    console.log(`  ${colors.dim(paddedKey)}  ${colors.highlight(String(value))}`);
  });
}

/**
 * Print final success message with stats
 * @param message - Main success message
 * @param stats - Optional statistics
 */
export function done(message: string, stats?: Record<string, string | number>): void {
  console.log();
  console.log(`${colors.success(icons.check)} ${chalk.bold.green(message)}`);
  if (stats) {
    summary(stats);
  }
}

/**
 * Print a link/URL
 * @param url - The URL to display
 * @param label - Optional label
 */
export function link(url: string, label?: string): void {
  if (label) {
    console.log(`  ${colors.dim(label + ':')} ${chalk.underline.blue(url)}`);
  } else {
    console.log(`  ${chalk.underline.blue(url)}`);
  }
}

// ============================================================================
// SPINNER UTILITY
// ============================================================================

/**
 * Create a simple spinner for async operations
 * @returns Object with start, update, and stop methods
 */
export function createSpinner(message: string) {
  let frame = 0;
  let interval: NodeJS.Timeout | null = null;
  let currentMessage = message;

  const start = () => {
    interval = setInterval(() => {
      process.stdout.write(
        `\r${colors.highlight(icons.spinner[frame])} ${currentMessage}   `
      );
      frame = (frame + 1) % icons.spinner.length;
    }, 80);
  };

  const update = (msg: string) => {
    currentMessage = msg;
  };

  const stop = (success: boolean = true, finalMsg?: string) => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    // Clear the spinner line
    process.stdout.write('\r' + ' '.repeat(60) + '\r');

    if (finalMsg) {
      const icon = success ? colors.success(icons.success) : colors.error(icons.error);
      console.log(`${icon} ${finalMsg}`);
    }
  };

  return { start, update, stop };
}

// ============================================================================
// ERROR DISPLAY HELPERS
// ============================================================================

/**
 * Display validation error with context
 * @param field - Field name with error
 * @param expected - Expected value/type
 * @param received - Actual received value
 */
export function validationError(field: string, expected: string, received: string): void {
  console.log(`${colors.error(icons.cross)} ${colors.bold.red('Validation Error')}`);
  console.log();
  console.log(`  ${colors.dim('Field:')}    ${colors.highlight(field)}`);
  console.log(`  ${colors.dim('Expected:')} ${colors.success(expected)}`);
  console.log(`  ${colors.dim('Received:')} ${colors.error(received)}`);
}

/**
 * Display JSON parse error with snippet
 * @param raw - The raw JSON string
 * @param position - Error position index
 */
export function jsonParseError(raw: string, position: number): void {
  const lines = raw.split('\n');
  let lineNum = 0;
  let charPos = position;

  // Find the line and character position
  for (let i = 0; i < lines.length; i++) {
    if (charPos <= lines[i].length) {
      lineNum = i + 1;
      break;
    }
    charPos -= lines[i].length + 1; // +1 for newline
  }

  const errorLine = lines[lineNum - 1] || '';
  const pointer = ' '.repeat(charPos) + chalk.red('^');

  console.log(`${colors.error(icons.cross)} ${chalk.bold.red('Invalid JSON')}`);
  console.log();
  console.log(`  ${colors.dim('Line')} ${colors.highlight(String(lineNum))}:`);
  console.log(`  ${colors.dim(errorLine)}`);
  console.log(`  ${pointer}`);
}

// ============================================================================
// EXPORTS
// ============================================================================

export const iconsExports = icons;
export const colorsExports = colors;

// Default export for convenience
export default {
  success,
  error,
  warning,
  info,
  step,
  substep,
  updateSubstep,
  progress,
  header,
  list,
  kv,
  code,
  nextSteps,
  summary,
  done,
  link,
  createSpinner,
  validationError,
  jsonParseError,
  icons,
  colors,
};
