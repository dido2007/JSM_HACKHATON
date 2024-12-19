/**
 * Module Description:
 *
 * Provides utility functions for handling CSS class names, specifically for merging them
 * in a way that's compatible with Tailwind CSS. This ensures cleaner and more maintainable
 * style management within component classes.
 */

import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

/**
 * Combines multiple class names into a single string with deduplicated classes.
 * Tailwind utility classes are merged intelligently to avoid conflicts.
 */
export function combineClassNames(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Documentation generated with GitHub Copilot.
 */
