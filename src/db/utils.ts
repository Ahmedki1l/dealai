export function getEnumArray<T extends string>(obj: Record<string, T>) {
  return Object.values(obj)?.map((e) => e as T);
}
