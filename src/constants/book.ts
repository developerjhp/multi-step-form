export const READING_STATUS = {
  WISH: 'WISH' as const,
  READING: 'READING' as const,
  DONE: 'DONE' as const,
  PAUSE: 'PAUSE' as const,
} as const;

export const READING_STATUS_VALUES = [
  READING_STATUS.WISH,
  READING_STATUS.READING,
  READING_STATUS.DONE,
  READING_STATUS.PAUSE,
] as const;

export type ReadingStatus = (typeof READING_STATUS_VALUES)[number];

export const READING_STATUS_OPTIONS = [
  { value: READING_STATUS.WISH, label: '읽고 싶은 책' },
  { value: READING_STATUS.READING, label: '읽는 중' },
  { value: READING_STATUS.DONE, label: '읽음' },
  { value: READING_STATUS.PAUSE, label: '보류 중' },
];

export const READING_STATUS_LABELS = {
  [READING_STATUS.WISH]: '읽고 싶은 책',
  [READING_STATUS.READING]: '읽는 중',
  [READING_STATUS.DONE]: '읽음',
  [READING_STATUS.PAUSE]: '보류 중',
} as const;

export const BOOK_FORM_STEPS = [
  '도서 정보',
  '추천 & 별점',
  '독후감',
  '인용구',
  '공개 설정',
];
