// fonction utilitaire pour générer les classes CSS conditionnelles pour les colonnes

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: 'USD' | 'EUR' | 'GBP' | 'BDT'
    notation?: Intl.NumberFormatOptions['notation']
  } = {}
) {
  const { currency = 'USD', notation = 'compact' } = options

  const numericPrice =
    typeof price === 'string' ? parseFloat(price) : price

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice)
}


export const getNumberColumns = (index: number) => {
  if (index > 2) return 'hidden lg:table-cell';
  if (index > 1) return 'hidden md:table-cell';
  if (index > 0) return 'hidden sm:table-cell';
  return '';
};


