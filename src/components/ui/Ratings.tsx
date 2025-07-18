import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { color } from '@/styles/colors';
import Icon from '@/components/ui/Icon';
import StarIcon from '@/assets/icons/star.svg';

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

interface RatingsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  rating: number;
  totalStars?: number;
  size?: number;
  fill?: boolean;
  Icon?: React.ElementType;
  variant?: keyof typeof ratingVariants;
  onChange?: (rating: number) => void;
}

export default function Ratings({
  rating,
  totalStars = 5,
  size = 20,
  Icon = DefaultStarIcon,
  variant = 'default',
  onChange,
  ...props
}: RatingsProps) {
  const handleStarClick = (starIndex: number, event: React.MouseEvent) => {
    if (!onChange) return;

    const starValue = starIndex + 1;
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const isHalf = clickX < rect.width / 2;

    const newRating = starValue - (isHalf ? 0.5 : 0);

    if (rating === newRating) {
      onChange(0);
    } else {
      onChange(newRating);
    }
  };

  return (
    <Container {...props}>
      {[...Array(totalStars)].map((_, index) => (
        <StarItem
          key={index}
          index={index}
          rating={rating}
          size={size}
          Icon={Icon}
          variant={variant}
          onChange={onChange}
          onStarClick={handleStarClick}
        />
      ))}
    </Container>
  );
}

interface StarItemProps {
  index: number;
  rating: number;
  size: number;
  Icon: React.ElementType;
  variant: keyof typeof ratingVariants;
  onChange?: (rating: number) => void;
  onStarClick: (starIndex: number, event: React.MouseEvent) => void;
}

function StarItem({
  index,
  rating,
  size,
  Icon,
  variant,
  onChange,
  onStarClick,
}: StarItemProps) {
  const fullStars = Math.floor(rating);
  const partial = rating % 1;

  const isFilledStar = index < fullStars;
  const isPartialStar = index === fullStars && partial > 0;
  const isEmptyStar = !isFilledStar && !isPartialStar;

  return (
    <StarButton
      onClick={onChange ? (e) => onStarClick(index, e) : undefined}
      aria-label={`Rate ${index + 1} stars`}
      type="button"
      disabled={!onChange}
    >
      {isFilledStar && <FilledStar size={size} Icon={Icon} variant={variant} />}
      {isPartialStar && (
        <PartialStar
          size={size}
          Icon={Icon}
          variant={variant}
          fillPercentage={partial}
        />
      )}
      {isEmptyStar && <EmptyStar size={size} Icon={Icon} variant={variant} />}
    </StarButton>
  );
}

interface StarComponentProps {
  size: number;
  Icon: React.ElementType;
  variant: keyof typeof ratingVariants;
}

function FilledStar({ size, Icon, variant }: StarComponentProps) {
  return (
    <Icon
      size={size}
      css={css`
        color: ${ratingVariants[variant].star};
      `}
    />
  );
}

function EmptyStar({ size, Icon, variant }: StarComponentProps) {
  return (
    <Icon
      size={size}
      css={css`
        color: ${ratingVariants[variant].emptyStar};
      `}
    />
  );
}

interface PartialStarProps extends StarComponentProps {
  fillPercentage: number;
}

function PartialStar({
  fillPercentage,
  size,
  Icon,
  variant,
}: PartialStarProps) {
  return (
    <PartialStarWrapper>
      <EmptyStar size={size} Icon={Icon} variant={variant} />
      <PartialFill style={{ width: `${fillPercentage * 100}%` }}>
        <FilledStar size={size} Icon={Icon} variant={variant} />
      </PartialFill>
    </PartialStarWrapper>
  );
}

interface DefaultStarIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

function DefaultStarIcon({ size = 20, ...props }: DefaultStarIconProps) {
  return <Icon as={StarIcon} size={size} color="currentColor" {...props} />;
}

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

const StarButton = styled.button`
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }
`;
