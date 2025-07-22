import { useFormContext, Controller } from 'react-hook-form';
import TextArea from '@/components/ui/TextArea';
import Alert from '@/components/ui/Alert';
import Icon from '@/components/ui/Icon';
import styled from '@emotion/styled';
import { type BookFormSchema } from '@/utils/schema';
import { BOOK_FORM_STEPS } from '@/constants/form';
import { color } from '@/styles/colors';
import { fontSize, fontWeight } from '@/styles/fonts';
import AlertTriangleIcon from '@/assets/icons/alert-triangle.svg';

export default function ReviewStep() {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<BookFormSchema>();

  const rating = watch('rating');
  const review = watch('review');
  const isReviewRequired = rating === 1 || rating === 5;
  const reviewCharCount = review?.length || 0;

  const hasErrors = BOOK_FORM_STEPS.REVIEW.fields.some(
    (field) => errors[field],
  );

  return (
    <Container>
      {hasErrors && (
        <Alert
          variant="error"
          title="입력 정보를 확인해주세요"
          description="독후감을 입력해주세요."
          icon={<Icon as={AlertTriangleIcon} size={20} />}
        />
      )}

      <FieldContainer>
        <Controller
          name="review"
          control={control}
          render={({ field }) => (
            <ReviewContainer>
              <ReviewLabelContainer>
                <ReviewLabel hasError={hasErrors}>
                  이 책에 대한 독후감을 작성해주세요
                  {isReviewRequired && <RequiredMark>*</RequiredMark>}
                </ReviewLabel>
                <CharCount isError={isReviewRequired && reviewCharCount < 100}>
                  {reviewCharCount}
                  {isReviewRequired && '/100'}자
                </CharCount>
              </ReviewLabelContainer>

              <TextArea
                {...field}
                placeholder={
                  isReviewRequired
                    ? '별점이 1점 또는 5점인 경우 독후감을 100자 이상 작성해주세요.'
                    : '이 책에 대한 독후감을 자유롭게 작성해주세요.'
                }
                rows={8}
                hasError={hasErrors}
              />

              {errors.review && (
                <ErrorMessage>{errors.review.message}</ErrorMessage>
              )}
            </ReviewContainer>
          )}
        />
      </FieldContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ReviewLabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReviewLabel = styled.label<{ hasError?: boolean }>`
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.medium};
  color: ${({ hasError }) => (hasError ? color.red500 : color.gray700)};
`;

const RequiredMark = styled.span`
  color: ${color.red500};
`;

const CharCount = styled.span<{ isError?: boolean }>`
  font-size: ${fontSize.sm};
  color: ${({ isError }) => (isError ? color.red500 : color.gray500)};
  font-weight: ${fontWeight.medium};
`;

const ErrorMessage = styled.p`
  font-size: ${fontSize.sm};
  color: ${color.red500};
  margin: 0;
`;
