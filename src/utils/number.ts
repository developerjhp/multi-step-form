export const formatNumber = (
  value: number | string | null | undefined,
): string => {
  if (
    value === '' ||
    value === null ||
    value === undefined ||
    isNaN(Number(value))
  ) {
    return '';
  }

  const num =
    typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;

  return new Intl.NumberFormat('ko-KR').format(num);
};

export const parseNumber = (value: string): number | undefined => {
  const parsed = parseInt(value.replace(/,/g, ''), 10);

  return isNaN(parsed) ? undefined : parsed;
};
