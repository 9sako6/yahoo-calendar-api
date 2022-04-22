export function hasProperty<Key extends PropertyKey>(
  obj: unknown,
  key: Key,
): obj is { [K in Key]: unknown } {
  return obj instanceof Object && key in obj;
}
