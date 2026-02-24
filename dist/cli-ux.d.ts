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
/**
 * Print a success message with icon and color
 * @param message - The success message to display
 * @param details - Optional additional details
 */
export declare function success(message: string, details?: string): void;
/**
 * Print an error message with icon, color, and optional hint
 * @param message - The error message to display
 * @param hint - Optional hint for resolution
 * @param code - Optional error code for reference
 */
export declare function error(message: string, hint?: string, code?: string): void;
/**
 * Print a warning message
 * @param message - The warning message to display
 */
export declare function warning(message: string): void;
/**
 * Print an informational message
 * @param message - The info message to display
 */
export declare function info(message: string): void;
/**
 * Print a step header with icon
 * @param message - The step description
 */
export declare function step(message: string): void;
/**
 * Print a sub-step with indentation
 * @param message - The sub-step description
 * @param status - Optional status indicator
 */
export declare function substep(message: string, status?: 'pending' | 'active' | 'done'): void;
/**
 * Update a sub-step status (in-place update via carriage return)
 * @param index - Step index for tracking
 * @param message - Updated message
 * @param spinFrame - Optional spinner frame index
 */
export declare function updateSubstep(index: number, message: string, spinFrame?: number): void;
/**
 * Render a progress bar
 * @param current - Current progress value
 * @param total - Total value for completion
 * @param width - Bar width in characters (default: 30)
 */
export declare function progress(current: number, total: number, width?: number): void;
/**
 * Print a section header with underline
 * @param title - Section title
 * @param icon - Optional icon (default: sparkle)
 */
export declare function header(title: string, icon?: string): void;
/**
 * Print a list with consistent indentation
 * @param items - Array of strings to list
 * @param bullet - Bullet character (default: '•')
 */
export declare function list(items: string[], bullet?: string): void;
/**
 * Print a key-value pair
 * @param key - The key/label
 * @param value - The value
 * @param color - Optional color function for the value
 */
export declare function kv(key: string, value: string, color?: (s: string) => string): void;
/**
 * Print a code block with syntax highlighting effect
 * @param code - The code to display
 * @param language - Optional language label
 */
export declare function code(code: string, language?: string): void;
/**
 * Print next steps suggestions
 * @param steps - Array of action items
 */
export declare function nextSteps(steps: string[]): void;
/**
 * Print a summary table
 * @param data - Object with key-value pairs
 */
export declare function summary(data: Record<string, string | number>): void;
/**
 * Print final success message with stats
 * @param message - Main success message
 * @param stats - Optional statistics
 */
export declare function done(message: string, stats?: Record<string, string | number>): void;
/**
 * Print a link/URL
 * @param url - The URL to display
 * @param label - Optional label
 */
export declare function link(url: string, label?: string): void;
/**
 * Create a simple spinner for async operations
 * @returns Object with start, update, and stop methods
 */
export declare function createSpinner(message: string): {
    start: () => void;
    update: (msg: string) => void;
    stop: (success?: boolean, finalMsg?: string) => void;
};
/**
 * Display validation error with context
 * @param field - Field name with error
 * @param expected - Expected value/type
 * @param received - Actual received value
 */
export declare function validationError(field: string, expected: string, received: string): void;
/**
 * Display JSON parse error with snippet
 * @param raw - The raw JSON string
 * @param position - Error position index
 */
export declare function jsonParseError(raw: string, position: number): void;
export declare const iconsExports: {
    readonly success: "✓";
    readonly error: "✗";
    readonly warning: "⚠";
    readonly info: "ℹ";
    readonly sparkle: "✨";
    readonly rocket: "🚀";
    readonly package: "📦";
    readonly document: "📝";
    readonly bulb: "💡";
    readonly book: "📚";
    readonly clock: "⏱";
    readonly check: "✅";
    readonly cross: "❌";
    readonly spinner: readonly ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
};
export declare const colorsExports: {
    readonly success: import("chalk").ChalkInstance;
    readonly error: import("chalk").ChalkInstance;
    readonly warning: import("chalk").ChalkInstance;
    readonly info: import("chalk").ChalkInstance;
    readonly highlight: import("chalk").ChalkInstance;
    readonly dim: import("chalk").ChalkInstance;
    readonly brand: import("chalk").ChalkInstance;
    readonly bold: import("chalk").ChalkInstance;
};
declare const _default: {
    success: typeof success;
    error: typeof error;
    warning: typeof warning;
    info: typeof info;
    step: typeof step;
    substep: typeof substep;
    updateSubstep: typeof updateSubstep;
    progress: typeof progress;
    header: typeof header;
    list: typeof list;
    kv: typeof kv;
    code: typeof code;
    nextSteps: typeof nextSteps;
    summary: typeof summary;
    done: typeof done;
    link: typeof link;
    createSpinner: typeof createSpinner;
    validationError: typeof validationError;
    jsonParseError: typeof jsonParseError;
    icons: {
        readonly success: "✓";
        readonly error: "✗";
        readonly warning: "⚠";
        readonly info: "ℹ";
        readonly sparkle: "✨";
        readonly rocket: "🚀";
        readonly package: "📦";
        readonly document: "📝";
        readonly bulb: "💡";
        readonly book: "📚";
        readonly clock: "⏱";
        readonly check: "✅";
        readonly cross: "❌";
        readonly spinner: readonly ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
    };
    colors: {
        readonly success: import("chalk").ChalkInstance;
        readonly error: import("chalk").ChalkInstance;
        readonly warning: import("chalk").ChalkInstance;
        readonly info: import("chalk").ChalkInstance;
        readonly highlight: import("chalk").ChalkInstance;
        readonly dim: import("chalk").ChalkInstance;
        readonly brand: import("chalk").ChalkInstance;
        readonly bold: import("chalk").ChalkInstance;
    };
};
export default _default;
//# sourceMappingURL=cli-ux.d.ts.map