export const WORK_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const EMAIL_INPUT_PATTERN = String.raw`[^\s@]+@[^\s@]+\.[^\s@]+`;

export function isValidWorkEmail(value: string) {
  return WORK_EMAIL_REGEX.test(value.trim());
}
