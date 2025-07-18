import styled from '@emotion/styled';
import { color } from '@/styles/colors';
import { fontSize, fontWeight } from '@/styles/fonts';
import { spacing } from '@/styles/spacing';
import Icon from '@/components/ui/Icon';
import Ratings from '@/components/ui/Ratings';
import Heart from '@/assets/icons/heart.svg';
import { Section, SectionTitle } from '@/components/preview/styles/shared';

interface RatingSectionProps {
  recommend: boolean;
  rating: number;
}

export function RatingSection({ recommend, rating }: RatingSectionProps) {
  return (
    <Section>
      <SectionTitle>나의 평가</SectionTitle>
      <RatingContainer>
        <RatingRow>
          <RatingLabel>추천</RatingLabel>
          <RatingValue>
            <Icon
              as={Heart}
              size={16}
              color={recommend ? color.red500 : color.gray400}
            />
            <RatingText>{recommend ? '예' : '아니오'}</RatingText>
          </RatingValue>
        </RatingRow>
        <RatingRow>
          <RatingLabel>별점</RatingLabel>
          <RatingValue>
            <Ratings rating={rating} size={16} variant="yellow" />
            <RatingText>{rating}</RatingText>
          </RatingValue>
        </RatingRow>
      </RatingContainer>
    </Section>
  );
}

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RatingLabel = styled.span`
  color: ${color.gray600};
  font-size: ${fontSize.xs};
`;

const RatingValue = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[1]};
`;

const RatingText = styled.span`
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.medium};
  margin-left: ${spacing[1]};
`;
