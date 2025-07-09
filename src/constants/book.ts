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

export const READING_STATUS_OPTIONS = [
  { value: READING_STATUS.WISH, label: '읽고 싶은 책' },
  { value: READING_STATUS.READING, label: '읽는 중' },
  { value: READING_STATUS.DONE, label: '읽음' },
  { value: READING_STATUS.PAUSE, label: '보류 중' },
];
