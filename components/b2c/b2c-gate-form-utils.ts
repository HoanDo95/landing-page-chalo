export function coercePositiveIntegerInput(value: string) {
  if (!value.trim()) {
    return "";
  }

  const parsedValue = Number.parseInt(value, 10);

  if (!Number.isFinite(parsedValue)) {
    return "";
  }

  return String(Math.max(1, parsedValue));
}
