import styled from '@emotion/styled';
import { color } from '@/styles/colors';
import { fontSize } from '@/styles/fonts';
import { spacing } from '@/styles/spacing';
import { borderRadius } from '@/styles/border-radius';
import Icon from '@/components/ui/Icon';
import MessageCircle from '@/assets/icons/message-circle.svg';
import {
  Section,
  SectionTitle,
  PlaceholderText,
} from '@/components/preview/styles/shared';

interface ReviewSectionProps {
  review?: string;
}

export function ReviewSection({ review }: ReviewSectionProps) {
  return (
    <Section>
      <SectionTitle>
        <Icon as={MessageCircle} size={16} color={color.blue600} />
        독후감
      </SectionTitle>
      <ReviewContainer>
        {review && review.trim() ? (
          <ReviewText>
            {review.length > 150 ? `${review.substring(0, 150)}...` : review}
          </ReviewText>
        ) : (
          <PlaceholderText>독후감을 작성해주세요...</PlaceholderText>
        )}
      </ReviewContainer>
    </Section>
  );
}

const ReviewContainer = styled.div`
  background: ${color.gray50};
  border-radius: ${borderRadius.lg};
  padding: ${spacing[3]};
`;

const ReviewText = styled.p`
  color: ${color.gray700};
  font-size: ${fontSize.xs};
  line-height: 1.6;
  white-space: pre-wrap;
  margin: 0;
`;
