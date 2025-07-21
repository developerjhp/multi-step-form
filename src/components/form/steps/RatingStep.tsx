import { useFormContext, Controller } from 'react-hook-form';
import { RadioGroup, RadioItem } from '@/components/form/Radio';
import Ratings from '@/components/ui/Ratings';
import Alert from '@/components/ui/Alert';
import Icon from '@/components/ui/Icon';
import styled from '@emotion/styled';
import { type BookFormSchema } from '@/utils/schema';
import { BOOK_FORM_STEPS } from '@/constants/form';
import { color } from '@/styles/colors';
import { fontSize, fontWeight } from '@/styles/fonts';
import AlertTriangleIcon from '@/assets/icons/alert-triangle.svg';

export default function RatingStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext<BookFormSchema>();

  const hasErrors = BOOK_FORM_STEPS.RATING.fields.some(
    (field) => errors[field],
  );

  return (
    <Container>
      {hasErrors && (
        <Alert
          variant="error"
          title="입력 정보를 확인해주세요"
          description="추천 여부와 별점을 모두 선택해주세요."
          icon={<Icon as={AlertTriangleIcon} size={20} />}
        />
      )}

      <FieldContainer>
        <Controller
          name="recommend"
          control={control}
          render={({ field }) => (
            <RadioGroup
              name="recommend"
              value={field.value ? 'yes' : 'no'}
              onChange={(value) => field.onChange(value === 'yes')}
              label="이 책을 추천하시겠어요?"
              errorMessage={errors.recommend?.message}
            >
              <RadioItem value="yes" label="예" />
              <RadioItem value="no" label="아니오" />
            </RadioGroup>
          )}
        />
      </FieldContainer>

      <FieldContainer>
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <RatingContainer>
              <RatingLabel hasError={hasErrors}>
                별점을 선택해주세요 <RequiredMark>*</RequiredMark>
              </RatingLabel>
              <RatingWrapper>
                <Ratings
                  rating={field.value}
                  onChange={field.onChange}
                  size={32}
                  variant={hasErrors ? 'error' : 'yellow'}
                />
                <RatingText>{field.value}점</RatingText>
              </RatingWrapper>
              {errors.rating && (
                <ErrorMessage>{errors.rating.message}</ErrorMessage>
              )}
            </RatingContainer>
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

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const RatingLabel = styled.label<{ hasError?: boolean }>`
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.medium};
  color: ${({ hasError }) => (hasError ? color.red500 : color.gray700)};
`;

const RequiredMark = styled.span`
  color: ${color.red500};
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const RatingText = styled.span`
  font-size: ${fontSize.lg};
  font-weight: ${fontWeight.medium};
  color: ${color.gray700};
  min-width: 3rem;
`;

const ErrorMessage = styled.p`
  font-size: ${fontSize.sm};
  color: ${color.red500};
  margin: 0;
`;
