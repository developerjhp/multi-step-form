/**
 * 날짜를 YYYY-MM-DD 00:00:00으로 정규화합니다.
 * 시간, 분, 초, 밀리초 정보를 모두 제거하여 정확한 날짜 비교를 가능하게 합니다.
 * 원본 Date 객체는 변경되지 않고, 새로운 Date 객체를 반환합니다.
 *
 * @param date 정규화할 날짜 객체
 * @returns 시간 정보가 제거된 새로운 Date 객체 (00:00:00.000)
 * @example
 * const date = new Date('2024-12-25T14:30:45.123');
 * const normalized = normalizeDate(date);
 * console.log(normalized); // 2024-12-25T00:00:00.000Z (로컬 시간대)
 *
 * @example
 * // 같은 날짜의 다른 시간들을 정규화
 * const morning = new Date('2024-12-25T09:00:00');
 * const evening = new Date('2024-12-25T21:30:00');
 * console.log(normalizeDate(morning).getTime() === normalizeDate(evening).getTime()); // true
 */
export const normalizeDate = (date: Date | string): Date => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

/**
 * 두 날짜가 같은 날짜인지 확인합니다.
 * 시간 정보는 무시하고 년, 월, 일만 비교합니다.
 *
 * @param date1 비교할 첫 번째 날짜
 * @param date2 비교할 두 번째 날짜
 * @returns 같은 날짜면 true, 다른 날짜면 false
 * @example
 * const morning = new Date('2024-12-25T09:00:00');
 * const evening = new Date('2024-12-25T21:30:00');
 * console.log(isSameDate(morning, evening)); // true
 *
 * @example
 * const today = new Date('2024-12-25T12:00:00');
 * const tomorrow = new Date('2024-12-26T12:00:00');
 * console.log(isSameDate(today, tomorrow)); // false
 *
 * @example
 * // 실제 사용 케이스: 오늘 날짜 확인
 * const targetDate = new Date('2024-12-25');
 * const isToday = isSameDate(targetDate, new Date());
 */
export const isSameDate = (
  date1: Date | string,
  date2: Date | string,
): boolean => {
  return normalizeDate(date1).getTime() === normalizeDate(date2).getTime();
};

/**
 * 첫 번째 날짜가 두 번째 날짜보다 이후(미래)인지 확인합니다.
 * 시간 정보는 무시하고 년, 월, 일만 비교합니다.
 * 같은 날짜인 경우 false를 반환합니다.
 *
 * @param date1 비교할 첫 번째 날짜 (이후 날짜인지 확인할 날짜)
 * @param date2 비교할 두 번째 날짜 (기준 날짜)
 * @returns date1이 date2보다 이후 날짜면 true, 같거나 이전이면 false
 * @example
 * const tomorrow = new Date('2024-12-26');
 * const today = new Date('2024-12-25');
 * console.log(isAfterDate(tomorrow, today)); // true
 *
 * @example
 * const today = new Date('2024-12-25T09:00:00');
 * const todayEvening = new Date('2024-12-25T21:00:00');
 * console.log(isAfterDate(today, todayEvening)); // false (같은 날짜)
 *
 * @example
 * // 실제 사용 케이스: 독서 완료일이 시작일보다 이후인지 확인
 * const startDate = new Date('2024-12-01');
 * const endDate = new Date('2024-12-15');
 * const isValidPeriod = isAfterDate(endDate, startDate); // true
 */
export const isAfterDate = (
  date1: Date | string,
  date2: Date | string,
): boolean => {
  return normalizeDate(date1) > normalizeDate(date2);
};

/**
 * 첫 번째 날짜가 두 번째 날짜보다 이후이거나 같은 날짜인지 확인합니다.
 * 시간 정보는 무시하고 년, 월, 일만 비교합니다.
 * 같은 날짜인 경우 true를 반환합니다.
 *
 * @param date1 비교할 첫 번째 날짜 (이후이거나 같은 날짜인지 확인할 날짜)
 * @param date2 비교할 두 번째 날짜 (기준 날짜)
 * @returns date1이 date2보다 이후이거나 같은 날짜면 true, 이전이면 false
 * @example
 * const tomorrow = new Date('2024-12-26');
 * const today = new Date('2024-12-25');
 * console.log(isAfterOrSameDate(tomorrow, today)); // true
 *
 * @example
 * const today = new Date('2024-12-25T09:00:00');
 * const todayEvening = new Date('2024-12-25T21:00:00');
 * console.log(isAfterOrSameDate(today, todayEvening)); // true (같은 날짜)
 *
 * @example
 * // 실제 사용 케이스: 독서 기간 유효성 검사
 * const startDate = new Date('2024-12-01');
 * const endDate = new Date('2024-12-01'); // 같은 날 시작하고 끝남
 * const isValidPeriod = isAfterOrSameDate(endDate, startDate); // true
 *
 * @example
 * // 실제 사용 케이스: 날짜 범위 필터링
 * const filterDate = new Date('2024-12-15');
 * const items = bookRecords.filter(record =>
 *   isAfterOrSameDate(record.date, filterDate)
 * ); // filterDate 이후의 기록들만 필터링
 */
export const isAfterOrSameDate = (
  date1: Date | string,
  date2: Date | string,
): boolean => {
  return normalizeDate(date1) >= normalizeDate(date2);
};

/**
 * 날짜를 한국 현지화된 짧은 형식으로 포맷합니다.
 * 월과 일만 표시하여 간결한 날짜 표현을 제공합니다.
 *
 * @param date 포맷할 날짜. null 또는 undefined인 경우 빈 문자열 반환
 * @returns "12월 25일" 형식의 문자열, 날짜가 없으면 빈 문자열
 * @example
 * formatKoreanShortDate(new Date('2024-12-25')) // "12월 25일"
 * formatKoreanShortDate(new Date('2024-01-05')) // "1월 5일"
 * formatKoreanShortDate(null) // ""
 *
 * @example
 * // 실제 사용 케이스: 독서 기간 표시
 * const startDate = new Date('2024-12-01');
 * const endDate = new Date('2024-12-15');
 * const period = `${formatKoreanShortDate(startDate)} - ${formatKoreanShortDate(endDate)}`;
 * // "12월 1일 - 12월 15일"
 */
export const formatKoreanShortDate = (
  date: Date | string | null | undefined,
): string => {
  if (!date) {
    return '';
  }

  if (typeof date === 'string') {
    date = new Date(date);
  }

  return date.toLocaleDateString('ko-KR', {
    month: 'short',
    day: 'numeric',
  });
};

/**
 * 현재 시간을 24시간 형식으로 포맷합니다.
 * 시와 분만 표시하며, 초는 포함하지 않습니다.
 *
 * @param date 포맷할 날짜/시간 객체
 * @returns "HH:mm" 형식의 문자열 (24시간 형식)
 * @example
 * formatTime24Hour(new Date('2024-12-25T14:30:45')) // "14:30"
 * formatTime24Hour(new Date('2024-12-25T09:05:00')) // "09:05"
 * formatTime24Hour(new Date('2024-12-25T23:59:59')) // "23:59"
 *
 * @example
 * // 실제 사용 케이스: 앱 상태바 시간 표시
 * const currentTime = formatTime24Hour(new Date()); // "15:42"
 *
 * @example
 * // 실제 사용 케이스: 독서 시작/종료 시간 기록
 * const startTime = formatTime24Hour(readingSession.startTime); // "09:30"
 * const endTime = formatTime24Hour(readingSession.endTime); // "11:15"
 */
export const formatTime24Hour = (date: Date): string => {
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

/**
 * 날짜를 ISO 8601 형식(YYYY-MM-DD)으로 포맷합니다.
 * 국제 표준 날짜 형식으로, API 통신이나 데이터베이스 저장에 적합합니다.
 *
 * @param date 포맷할 날짜. null 또는 undefined인 경우 빈 문자열 반환
 * @returns "YYYY-MM-DD" 형식의 문자열, 날짜가 없으면 빈 문자열
 * @example
 * formatDateISO(new Date('2024-12-25')) // "2024-12-25"
 * formatDateISO(new Date('2024-01-05')) // "2024-01-05"
 * formatDateISO(null) // ""
 *
 * @example
 * // 실제 사용 케이스: API 요청 데이터 준비
 * const bookData = {
 *   title: "독서록",
 *   startDate: formatDateISO(form.startDate), // "2024-12-01"
 *   endDate: formatDateISO(form.endDate)      // "2024-12-15"
 * };
 *
 * @example
 * // 실제 사용 케이스: HTML input[type="date"] 값 설정
 * const dateInput = document.querySelector('input[type="date"]');
 * dateInput.value = formatDateISO(selectedDate); // "2024-12-25"
 */
export const formatDateISO = (date: Date | null | undefined): string => {
  if (!date) {
    return '';
  }

  return date.toISOString().split('T')[0];
};

/**
 * 날짜를 한국어 전체 형식으로 포맷합니다.
 * 년, 월, 일을 모두 포함한 완전한 날짜 표현을 제공합니다.
 *
 * @param date 포맷할 날짜. null 또는 undefined인 경우 빈 문자열 반환
 * @returns "YYYY년 M월 D일" 형식의 문자열, 날짜가 없으면 빈 문자열
 * @example
 * formatKoreanFullDate(new Date('2024-12-25')) // "2024년 12월 25일"
 * formatKoreanFullDate(new Date('2024-01-05')) // "2024년 1월 5일"
 * formatKoreanFullDate(null) // ""
 *
 * @example
 * // 실제 사용 케이스: 독서 기록 상세 정보 표시
 * const completedDate = formatKoreanFullDate(book.completedAt);
 * const message = `${completedDate}에 완독했습니다.`; // "2024년 12월 25일에 완독했습니다."
 *
 * @example
 * // 실제 사용 케이스: 공식 문서나 인증서 날짜 표시
 * const issueDate = formatKoreanFullDate(certificate.issuedAt); // "2024년 12월 25일"
 */
export const formatKoreanFullDate = (date: Date | null | undefined): string => {
  if (!date) {
    return '';
  }

  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
