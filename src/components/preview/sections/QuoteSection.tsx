import styled from '@emotion/styled';
import { color } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { borderRadius } from '@/styles/border-radius';
import { fontSize, fontWeight } from '@/styles/fonts';
import Icon from '@/components/ui/Icon';
import Quote from '@/assets/icons/quote.svg';
import { type BookFormSchema } from '@/utils/schema';
import {
  Section,
  SectionTitle,
  PlaceholderText,
} from '@/components/preview/styles/shared';

interface QuoteSectionProps {
  quotes: BookFormSchema['quotes'];
}

export function QuoteSection({ quotes }: QuoteSectionProps) {
  if (quotes == null || quotes.length === 0) {
    return null;
  }

  return (
    <Section>
      <SectionTitle>
        <Icon as={Quote} size={16} color={color.blue600} />
        인상 깊은 구절
      </SectionTitle>
      <QuotesContainer>
        {quotes.length === 0 ? (
          <QuotePlaceholder>
            <PlaceholderText>인상 깊은 구절을 추가해주세요...</PlaceholderText>
          </QuotePlaceholder>
        ) : (
          quotes.map((quote, index) => (
            <QuoteItem key={index}>
              <QuoteText>&quot;{quote.text}&quot;</QuoteText>
              {quote.pageNumber && (
                <QuotePageNumber>
                  {Array.isArray(quote.pageNumber)
                    ? quote.pageNumber.join(', ') + '페이지'
                    : quote.pageNumber + '페이지'}
                </QuotePageNumber>
              )}
            </QuoteItem>
          ))
        )}
      </QuotesContainer>
    </Section>
  );
}

const QuotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
`;

const QuotePlaceholder = styled.div`
  background: ${color.gray50};
  border-radius: ${borderRadius.lg};
  padding: ${spacing[3]};
  border-left: 4px solid ${color.gray300};
`;

const QuoteItem = styled.div`
  background: ${color.white};
  border-radius: ${borderRadius.lg};
  padding: ${spacing[4]};
  border-left: 4px solid ${color.blue500};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

const QuoteText = styled.p`
  font-size: ${fontSize.base};
  font-weight: ${fontWeight.medium};
  color: ${color.gray800};
  line-height: 1.6;
  margin: 0 0 ${spacing[2]} 0;
  font-style: italic;
`;

const QuotePageNumber = styled.span`
  font-size: ${fontSize.sm};
  color: ${color.gray500};
  font-weight: ${fontWeight.regular};
`;
