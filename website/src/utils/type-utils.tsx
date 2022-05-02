export type DateStringed<Type> = { [Property in keyof Type]: Type[Property] extends Date ? string : Type[Property] };

export function stringifyDateAttributes<T>(object: T, converter: (date: Date) => string) {
  const objectCopy: any = { ...object };

  Object.keys(objectCopy).forEach((key) => {
    if (objectCopy[key] instanceof Date) {
      objectCopy[key] = converter(objectCopy[key]);
    }
  });

  return objectCopy as DateStringed<T>;
}

export type DeepDateStringed<Type> = {
  [Property in keyof Type]: Type[Property] extends string | number | boolean | Date
    ? Type[Property] extends Date
      ? string
      : Type[Property]
    : DeepDateStringed<Type[Property]>;
};

export function deepStringifyDateAttributes<T>(object: T, converter: (date: Date) => string) {
  const objectCopy: any = { ...object };

  Object.keys(objectCopy).forEach((key) => {
    if (objectCopy[key] instanceof Date) {
      objectCopy[key] = converter(objectCopy[key]);
    }
    if (objectCopy[key]?.constructor === Object) {
      objectCopy[key] = deepStringifyDateAttributes(objectCopy[key], converter);
    }
  });

  return objectCopy as DeepDateStringed<T>;
}

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;