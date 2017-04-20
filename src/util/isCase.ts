/**
 * Indicates whether a string is in "camelCase".
 *
 * A string is in camel-case when
 *
 *   - it begins with a lowercase letter, and
 *   - it contains only alphanumeric characters
 *
 * @param  str  The string to test
 * @return      Returns `true` when *str* is in camel-case; otherwise
 *              returns `false`
 */
export function isCamelCase(str: string): boolean {
  return /^[a-z][0-9A-Za-z]*$/.test(str);
}

/**
 * Indicates whether a string is in "CAPS_CASE".
 *
 * A string is in caps-case when
 *
 *   - it begins with an uppercase letter
 *   - it ends with either an uppercase letter or a number, and
 *   - it contains only uppercase letters, numbers, and underscores
 *
 * @param  str  The string to test
 * @return      Returns `true` when *str* is in caps-case; otherwise
 *              returns `false`
 */
export function isCapsCase(str: string): boolean {
  return /^[A-Z][0-9A-Z_]*[0-9A-Z]$|^[A-Z]$/.test(str);
}

/**
 * Indicates whether a string is in "PascalCase".
 *
 * A string is in pascal-case when
 *
 *   - it begins with an uppercase letter,
 *   - it contains only alphanumeric characters, and
 *   - it either contains at least one lowercase letter or is one
 *     character in length
 *
 * @param  str  The string to test
 * @return      Returns `true` when *str* is in pascal-case; otherwise
 *              returns `false`
 */
export function isPascalCase(str: string): boolean {
  return /^[A-Z][0-9A-Za-z]*$/.test(str) && (str.length === 1 || /[a-z]/.test(str));
}

/**
 * Indicates whether a string is in "snake_case".
 *
 * A string is in snake-case when
 *
 *   - it begins with a lowercase letter
 *   - it ends with either an lowercase letter or a number, and
 *   - it contains only lowercase letters, numbers, and underscores
 *
 * @param  str  The string to test
 * @return      Returns `true` when *str* is in snake-case; otherwise
 *              returns `false`
 */
export function isSnakeCase(str: string): boolean {
  return /^[a-z][0-9a-z_]*[0-9a-z]$|^[a-z]$/.test(str);
}
