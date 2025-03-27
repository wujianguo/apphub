import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { randomInt } from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
* A utility function that creates random strings using Math.random function
* @param length  The length of the string you want to generate
* @returns string
*/
export function generateRandomString(length: number): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  return [...Array(length).keys()].reduce(
    (result) => result + characters.charAt(randomInt(characters.length)),
    ""
  );
}