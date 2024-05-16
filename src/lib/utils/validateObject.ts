export default function validateObject<T>(obj: T, keys: (keyof T)[]) {
  const invalidatedKeys: (keyof T)[] = []
  for (const key of keys) {
    if (!obj[key]) invalidatedKeys.push(key)
  }

  return invalidatedKeys
}
