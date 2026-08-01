export function pickMessages<T extends Record<string, unknown>>(
  messages: T,
  namespaces: (keyof T)[],
) {
  return namespaces.reduce((acc, ns) => {
    acc[ns] = messages[ns];
    return acc;
  }, {} as Partial<T>);
}
