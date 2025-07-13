/**
 * 날짜를 YYYY-MM-DD 00:00:00으로 정규화합니다.
 * 시간 정보를 제거하여 정확한 날짜 비교를 가능하게 합니다.
 */
export const normalizeDate = (date: Date): Date => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

/**
 * 두 날짜가 같은 날짜인지 확인합니다. (시간 정보는 무시합니다.)
 */
export const isSameDate = (date1: Date, date2: Date): boolean => {
  return normalizeDate(date1).getTime() === normalizeDate(date2).getTime();
};

/**
 * 첫 번째 날짜가 두 번째 날짜보다 이후인지 확인합니다. (시간 정보는 무시합니다.)
 */
export const isAfterDate = (date1: Date, date2: Date): boolean => {
  return normalizeDate(date1) > normalizeDate(date2);
};

/**
 * 첫 번째 날짜가 두 번째 날짜보다 이후이거나 같은지 확인합니다. (시간 정보는 무시합니다.)
 */
export const isAfterOrSameDate = (date1: Date, date2: Date): boolean => {
  return normalizeDate(date1) >= normalizeDate(date2);
};
