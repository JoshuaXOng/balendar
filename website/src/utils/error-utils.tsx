export async function wrappedTryCatch<T>(onSuccess: () => T | Promise<T>): Promise<[T | undefined, any]> {
  try {
    return [await onSuccess(), undefined];
  } catch (error) {
    return [undefined, error];
  }
}
