import { z } from 'zod';
import { isAfterOrSameDate } from './date';
import { READING_STATUS_VALUES } from '@/constants/book';

export const bookFormSchema = z
  .object({
    title: z.string().min(1, { message: '도서명을 입력해주세요.' }),
    author: z.string().min(1, { message: '저자명을 입력해주세요.' }),
    publishedDate: z.coerce
      .date({
        errorMap: () => ({ message: '유효한 날짜 형식이 아닙니다.' }),
      })
      .min(new Date('1900-01-01'), {
        message: '1900년 이후의 날짜를 입력해주세요.',
      })
      .max(new Date(), { message: '오늘 이전의 날짜를 입력해주세요.' }),
    totalPages: z.coerce
      .number()
      .min(1, { message: '전체 페이지 수를 입력해주세요.' }),
    status: z.enum(READING_STATUS_VALUES, {
      errorMap: () => ({ message: '독서 상태를 선택해주세요.' }),
    }),
    startDate: z.coerce
      .date({
        errorMap: () => ({ message: '유효한 날짜 형식이 아닙니다.' }),
      })
      .min(new Date('1900-01-01'), {
        message: '1900년 이후의 날짜를 입력해주세요.',
      })
      .max(new Date(), { message: '오늘 이전의 날짜를 입력해주세요.' }),
    endDate: z.coerce
      .date({
        errorMap: () => ({ message: '유효한 날짜 형식이 아닙니다.' }),
      })
      .min(new Date('1900-01-01'), {
        message: '1900년 이후의 날짜를 입력해주세요.',
      })
      .max(new Date(), { message: '오늘 이전의 날짜를 입력해주세요.' }),
  })
  .refine((data) => isAfterOrSameDate(data.startDate, data.publishedDate), {
    message: '독서 시작일은 출판일보다 빠를 수 없습니다.',
    path: ['startDate'],
  })
  .refine((data) => isAfterOrSameDate(data.endDate, data.startDate), {
    message: '독서 종료일은 시작일보다 빠를 수 없습니다.',
    path: ['endDate'],
  });

export type BookFormSchema = z.infer<typeof bookFormSchema>;
