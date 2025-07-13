import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { color } from '@/styles/colors';

const ratingVariants = {
  default: {
    star: color.yellow500,
    emptyStar: color.gray300,
  },
  error: {
    star: color.red500,
    emptyStar: color.red200,
  },
  yellow: {
    star: color.yellow500,
    emptyStar: color.yellow200,
  },
} as const;

interface RatingsProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  totalStars?: number;
  size?: number;
  fill?: boolean;
  Icon?: React.ElementType;
  variant?: keyof typeof ratingVariants;
}

export function Ratings({
  rating,
  totalStars = 5,
  size = 20,
  Icon = DefaultStarIcon,
  variant = 'default',
  ...props
}: RatingsProps) {
  const fullStars = Math.floor(rating);
  const partial = rating % 1;
  const hasPartial = partial > 0;

  return (
    <Container {...props}>
      {[...Array(fullStars)].map((_, i) => (
        <Icon
          key={i}
          size={size}
          css={css`
            color: ${ratingVariants[variant].star};
          `}
        />
      ))}

      {hasPartial && (
        <PartialStar
          key="partial"
          Icon={Icon}
          fillPercentage={partial}
          size={size}
          filledColor={ratingVariants[variant].star}
          emptyColor={ratingVariants[variant].emptyStar}
        />
      )}

      {[...Array(totalStars - fullStars - (hasPartial ? 1 : 0))].map((_, i) => (
        <Icon
          key={`empty-${i}`}
          size={size}
          css={css`
            color: ${ratingVariants[variant].emptyStar};
          `}
        />
      ))}
    </Container>
  );
}

interface PartialStarProps {
  fillPercentage: number;
  size: number;
  filledColor: string;
  emptyColor: string;
  Icon: React.ElementType;
}

function PartialStar({
  fillPercentage,
  size,
  filledColor,
  emptyColor,
  Icon,
}: PartialStarProps) {
  return (
    <PartialStarWrapper>
      <Icon
        size={size}
        css={css`
          color: ${emptyColor};
        `}
      />
      <PartialFill style={{ width: `${fillPercentage * 100}%` }}>
        <Icon
          size={size}
          css={css`
            color: ${filledColor};
          `}
        />
      </PartialFill>
    </PartialStarWrapper>
  );
}

const DefaultStarIcon = styled.div<{ size?: number }>`
  display: inline-block;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    mask: url('/icons/star.svg') no-repeat center;
    mask-size: contain;
    background-color: currentColor;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const PartialStarWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const PartialFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  height: 100%;
`;
