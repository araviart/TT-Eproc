// fonction utilitaire pour générer les classes CSS conditionnelles pour les colonnes

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getNumberColumns = (index: number) => {
  if (index > 2) return 'hidden lg:table-cell';
  if (index > 1) return 'hidden md:table-cell';
  if (index > 0) return 'hidden sm:table-cell';
  return '';
};
