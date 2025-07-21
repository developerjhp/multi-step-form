import { BookFormSchema } from '@/utils/schema';

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

export const BOOK_FORM_STEPS = {
  BOOK_INFO: {
    order: 1,
    label: '도서 정보',
    fields: [
      'title',
      'author',
      'publishedDate',
      'totalPages',
      'status',
      'startDate',
      'endDate',
    ] as (keyof BookFormSchema)[],
  },
  RATING: {
    order: 2,
    label: '추천 & 별점',
    fields: ['recommend', 'rating'] as (keyof BookFormSchema)[],
  },
  REVIEW: {
    order: 3,
    label: '독후감',
    fields: ['review'] as (keyof BookFormSchema)[],
  },
  QUOTES: {
    order: 4,
    label: '인용구',
    fields: ['quotes'] as (keyof BookFormSchema)[],
  },
  PUBLIC: {
    order: 5,
    label: '공개 설정',
    fields: ['isPublic'] as (keyof BookFormSchema)[],
  },
} as const;
