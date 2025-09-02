/**
 * Determine whether a given value conforms to a standard GUID format.
 *
 * A GUID (globally unique identifier) is represented by 32 hexadecimal characters
 * displayed in five groups separated by hyphens, for example:
 * {@code 123e4567-e89b-12d3-a456-426614174000}.
 *
 * @param {string} value - The string to validate.
 * @returns {boolean} {@code true} if the value matches the GUID pattern; otherwise {@code false}.
 */
export default function isGuid(value) {
  const guidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return guidPattern.test(value);
}

