const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatPrice(paisa: number): string {
  return formatter.format(paisa / 100);
}

export function parsePriceString(price: string): number {
  const cleaned = price.replace(/[₹,\s]/g, '');
  return Math.round(parseFloat(cleaned) * 100);
}
