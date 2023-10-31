export {};

declare global {
  interface String {
    /**
     * Method that converts a string to title case.
     *
     * @returns the title case string.
     * @example
     * ```ts
     * const s = 'caique';
     * s.toTitleCase(); // Caique
     * ```
     */
    toTitleCase(): string;
  }
}

String.prototype.toTitleCase = function (): string {
  return this.replace(/\w\S*/g, function (text: string) {
    return text.charAt(0).toUpperCase() + text.substring(1).toLowerCase();
  });
};
