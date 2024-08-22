import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getDate(timestamp: string): string {
  return new Date(timestamp).toISOString().split("T")[0];
}

export function getTime(timestamp: string): string {
  return new Intl.
  DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
  .format(new Date(timestamp));
}
