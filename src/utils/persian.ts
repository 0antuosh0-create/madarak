// Persian typography and numeral utilities
export function toPersianDigits(input: string | number | null | undefined): string {
  if (input === null || input === undefined) return '';
  const str = String(input);
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/[0-9]/g, (digit) => persianDigits[parseInt(digit, 10)]);
}

export function formatPersianNumber(num: number, decimals: number = 2): string {
  if (isNaN(num)) return '۰';
  const factor = Math.pow(10, decimals);
  const rounded = Math.round(num * factor) / factor;
  const parts = rounded.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return toPersianDigits(parts.join('.'));
}
