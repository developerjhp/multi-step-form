import BookInfoStep from '@/components/form/steps/BookInfoStep';
import RatingStep from '@/components/form/steps/RatingStep';
import ReviewStep from '@/components/form/steps/ReviewStep';

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
    ],
    component: BookInfoStep,
  },
  RATING: {
    order: 2,
    label: '추천 & 별점',
    fields: ['recommend', 'rating'],
    component: RatingStep,
  },
  REVIEW: {
    order: 3,
    label: '독후감',
    fields: ['review'],
    component: ReviewStep,
  },
  QUOTES: {
    order: 4,
    label: '인용구',
    fields: ['quotes'],
    component: ReviewStep, // FIXME: QuoteStep으로 교체 필요
  },
  PUBLIC: {
    order: 5,
    label: '공개 설정',
    fields: ['isPublic'],
    component: ReviewStep, // FIXME: PublicStep으로 교체 필요
  },
} as const;
