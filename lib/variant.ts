export type Variant = "b2b" | "b2c";

const variants = new Set<Variant>(["b2b", "b2c"]);

export function resolveVariant(input: string | undefined): Variant {
  if (input && variants.has(input as Variant)) {
    return input as Variant;
  }

  return "b2b";
}
