import { z } from 'zod';
import { isAfterDate, isAfterOrSameDate } from './date';
import { READING_STATUS_VALUES, READING_STATUS } from '@/constants/book';

export type BookFormSchema = z.infer<typeof bookFormSchema>;
export const BOOK_FORM_DEFAULT_VALUES = {
  title: '',
  author: '',
  publishedDate: '',
  totalPages: 0,
  status: READING_STATUS.WISH,
  startDate: null,
  endDate: null,
  recommend: false,
  rating: 0,
  review: '',
  quotes: [],
  isPublic: false,
} satisfies z.input<typeof bookFormSchema>;

const dateSchema = z.string().refine((val) => !isNaN(Date.parse(val)), {
  message: '유효한 날짜 형식이 아닙니다.',
});

export const bookFormSchema = z
  .object({
    title: z.string().min(1, { message: '도서명을 입력해주세요.' }),
    author: z.string().min(1, { message: '저자명을 입력해주세요.' }),
    publishedDate: dateSchema,
    totalPages: z.coerce
      .number()
      .min(1, { message: '전체 페이지 수를 입력해주세요.' }),
    status: z.enum(READING_STATUS_VALUES, {
      errorMap: () => ({ message: '독서 상태를 선택해주세요.' }),
    }),
    startDate: z.string().nullable().optional(),
    endDate: z.string().nullable().optional(),
    recommend: z.boolean({ required_error: '추천 여부를 선택해주세요.' }),
    rating: z.number().min(0.5, { message: '별점을 선택해주세요.' }).max(5),
    review: z.string().optional(),
    quotes: z.array(z.string()).optional(),
    isPublic: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    const { status, startDate, endDate, publishedDate, rating, review } = data;

    if (status === READING_STATUS.WISH) {
      if (startDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '읽고 싶은 책은 시작일을 입력할 수 없습니다',
          path: ['startDate'],
        });
      }
      if (endDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '읽고 싶은 책은 종료일을 입력할 수 없습니다',
          path: ['endDate'],
        });
      }
    }

    if (
      startDate &&
      publishedDate &&
      isAfterOrSameDate(publishedDate, startDate)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '독서 시작일은 출판일 이후여야 합니다',
        path: ['startDate'],
      });
    }

    if (status === READING_STATUS.READING) {
      if (!startDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '읽는 중인 책은 시작일이 필수입니다',
          path: ['startDate'],
        });
      }
      return;
    }

    if (status === READING_STATUS.DONE) {
      if (!startDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '읽은 책은 시작일이 필수입니다',
          path: ['startDate'],
        });
      }
      if (!endDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '읽은 책은 종료일이 필수입니다',
          path: ['endDate'],
        });
      }

      if (startDate && endDate && isAfterDate(startDate, endDate)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '독서 시작일은 종료일보다 이전이어야 합니다',
          path: ['endDate'],
        });
      }
    }

    if (status === READING_STATUS.PAUSE) {
      if (!startDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '보류 중인 책은 시작일이 필수입니다',
          path: ['startDate'],
        });
      }
    }

    // PRD: 별점이 1점 또는 5점일 경우: 독후감 100자 이상 필수
    if ((rating === 1 || rating === 5) && (!review || review.length < 100)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '별점이 1점 또는 5점인 경우 독후감을 100자 이상 입력해주세요.',
        path: ['review'],
      });
    }
  });
