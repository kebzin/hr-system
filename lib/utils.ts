import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = async (
  url: string,
  options: RequestInit = {}
): Promise<unknown> => {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  try {
    return await response.json();
  } catch (error) {
    return null;
  }
};

/**
 * Recursively converts a complex object into a plain JavaScript object.
 * This function serializes the object to JSON and then parses it back to
 * ensure that the resulting object is a plain JSON-compatible object, removing
 * any non-serializable properties and converting complex structures to simple formats.
 *
 * @param obj - The input object to be converted into a plain JavaScript object.
 * @returns A plain JavaScript object representation of the input object.
 *
 * @example
 * const complexObject = {
 *   name: "John",
 *   age: 30,
 *   address: {
 *     street: "123 Main St",
 *     city: "Anytown"
 *   },
 *   getFullName: function() {
 *     return `${this.name} Doe`;
 *   }
 * };
 *
 * const plainObject = deepConvertToPlainObject(complexObject);
 * console.log(plainObject);
 * // Output:
 * // {
 * //   name: "John",
 * //   age: 30,
 * //   address: {
 * //     street: "123 Main St",
 * //     city: "Anytown"
 * //   }
 * // }
 */
export const deepConvertToPlainObject = (
  obj: unknown
): Record<string, unknown> => {
  return JSON.parse(JSON.stringify(obj));
};
