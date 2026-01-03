import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Compose class names from one or more class values and produce a single normalized string with Tailwind conflicts resolved.
 *
 * @param inputs - One or more class values (strings, arrays, objects, or falsy values) to be combined
 * @returns A single class string with combined names and Tailwind CSS class conflicts merged
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}