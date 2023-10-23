export {};

declare global {
  interface String {
    toTitleCase(): string;
  }
}

/**
 * Function that converts a string to title case.
 *
 * @returns the title case string.
 * @example
 * ```ts
 * const s = 'caique';
 * s.toTitleCase(); // Caique
 * ```
 */
function toTitleCase(): string {
  return this.replace(/\w\S*/g, function (txt: string) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
}

String.prototype.toTitleCase = toTitleCase;
