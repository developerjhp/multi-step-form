import styled from '@emotion/styled';
import { color } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { borderRadius } from '@/styles/border-radius';
import Icon from '@/components/ui/Icon';
import Quote from '@/assets/icons/quote.svg';
import {
  Section,
  SectionTitle,
  PlaceholderText,
} from '@/components/preview/styles/shared';

export function QuoteSection() {
  return (
    <Section>
      <SectionTitle>
        <Icon as={Quote} size={16} color={color.blue600} />
        인상 깊은 구절
      </SectionTitle>
      <QuotesContainer>
        <QuotePlaceholder>
          <PlaceholderText>인상 깊은 구절을 추가해주세요...</PlaceholderText>
        </QuotePlaceholder>
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
