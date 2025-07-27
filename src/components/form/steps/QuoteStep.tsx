import { useFormContext, Controller, useFieldArray } from 'react-hook-form';
import RHFCommaSeparatedInput from '@/components/form/RHFCommaSeparatedInput';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import Icon from '@/components/ui/Icon';
import styled from '@emotion/styled';
import { type BookFormSchema } from '@/utils/schema';
import { color } from '@/styles/colors';
import { fontSize, fontWeight } from '@/styles/fonts';
import AlertTriangleIcon from '@/assets/icons/alert-triangle.svg';

export default function QuoteStep() {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<BookFormSchema>();

  const { fields, append, remove } = useFieldArray({
    name: 'quotes',
  });

  const totalPages = watch('totalPages');
  const quotes = watch('quotes') || [];

  const hasMultipleQuotes = quotes.length >= 2;
  const hasErrors = Boolean(errors.quotes);

  const handleAddQuote = () => {
    append({ text: '', pageNumber: undefined });
  };

  return (
    <Container>
      {hasErrors && (
        <Alert
          variant="error"
          title="입력 정보를 확인해주세요"
          description="인용구 정보를 올바르게 입력해주세요."
          icon={<Icon as={AlertTriangleIcon} size={20} />}
        />
      )}

      <SectionHeader>
        <SectionTitle>인상 깊었던 구절을 인용해주세요</SectionTitle>
        <SectionDescription>
          기억에 남는 문장이나 구절을 자유롭게 추가해보세요.
        </SectionDescription>
      </SectionHeader>

      <QuotesContainer>
        {fields.length === 0 ? (
          <EmptyState>
            <EmptyMessage>아직 추가된 인용구가 없습니다.</EmptyMessage>
            <Button type="button" variant="blue" onClick={handleAddQuote}>
              첫 번째 인용구 추가
            </Button>
          </EmptyState>
        ) : (
          <>
            {fields.map((field, index) => (
              <QuoteItem key={field.id}>
                <QuoteHeader>
                  <QuoteNumber>인용구 {index + 1}</QuoteNumber>
                  <Button
                    type="button"
                    variant="red"
                    onClick={() => remove(index)}
                  >
                    삭제
                  </Button>
                </QuoteHeader>

                <Controller
                  name={`quotes.${index}.text`}
                  control={control}
                  render={({ field }) => (
                    <TextAreaContainer>
                      <TextArea
                        {...field}
                        placeholder="인상 깊었던 구절을 입력해주세요"
                        rows={4}
                        hasError={Boolean(errors.quotes?.[index]?.text)}
                      />
                      {errors.quotes?.[index]?.text && (
                        <ErrorMessage>
                          {errors.quotes[index]?.text?.message}
                        </ErrorMessage>
                      )}
                    </TextAreaContainer>
                  )}
                />

                <RHFCommaSeparatedInput
                  id={`quote-page-${index}`}
                  name={`quotes.${index}.pageNumber`}
                  control={control}
                  label="페이지 번호"
                  placeholder="페이지 번호를 입력해주세요"
                  required={hasMultipleQuotes}
                />
              </QuoteItem>
            ))}

            <AddQuoteButton
              type="button"
              variant="secondary"
              onClick={handleAddQuote}
            >
              인용구 추가
            </AddQuoteButton>
          </>
        )}
      </QuotesContainer>

      {hasMultipleQuotes && (
        <ValidationInfo>
          <InfoIcon as={AlertTriangleIcon} size={16} />
          인용구가 2개 이상인 경우 페이지 번호는 필수입니다.
          {totalPages && ` (1~${totalPages} 페이지)`}
        </ValidationInfo>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionHeader = styled.div`
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: ${fontSize.xl};
  font-weight: ${fontWeight.bold};
  color: ${color.gray900};
  margin: 0 0 0.5rem 0;
`;

const SectionDescription = styled.p`
  font-size: ${fontSize.base};
  color: ${color.gray600};
  margin: 0;
`;

const QuotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem 1rem;
  background-color: ${color.gray50};
  border-radius: 0.75rem;
  border: 2px dashed ${color.gray300};
`;

const EmptyMessage = styled.p`
  font-size: ${fontSize.base};
  color: ${color.gray500};
  margin: 0;
`;

const QuoteItem = styled.div`
  padding: 1.5rem;
  background-color: ${color.white};
  border: 1px solid ${color.gray200};
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const QuoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuoteNumber = styled.h3`
  font-size: ${fontSize.lg};
  font-weight: ${fontWeight.semiBold};
  color: ${color.gray900};
  margin: 0;
`;

const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddQuoteButton = styled(Button)`
  align-self: flex-start;
`;

const ValidationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: ${color.blue50};
  border: 1px solid ${color.blue200};
  border-radius: 0.5rem;
  font-size: ${fontSize.sm};
  color: ${color.blue700};
`;

const InfoIcon = styled(Icon)`
  color: ${color.blue500};
  flex-shrink: 0;
`;

const ErrorMessage = styled.p`
  font-size: ${fontSize.sm};
  color: ${color.red500};
  margin: 0.25rem 0 0 0;
`;
