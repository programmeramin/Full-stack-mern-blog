import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const delay = async seconds => {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};
