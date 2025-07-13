import React, { type ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { color } from '@/styles/colors';
import { fontSize, fontWeight } from '@/styles/fonts';

type AlertVariant = 'default' | 'error';

interface AlertProps {
  variant?: AlertVariant;
  title: string;
  description: string;
  icon?: ReactNode;
}

export default function Alert({
  variant = 'default',
  title,
  description,
  icon,
}: AlertProps) {
  return (
    <AlertContainer variant={variant}>
      {icon && <AlertIconWrapper>{icon}</AlertIconWrapper>}

      <AlertContent>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </AlertContent>
    </AlertContainer>
  );
}

const variantStyles = {
  default: css`
    background-color: ${color.gray50};
    border-color: ${color.gray200};
    color: ${color.gray800};
  `,
  error: css`
    background-color: ${color.red100};
    border-color: ${color.red200};
    color: ${color.red700};
  `,
} as const;

const AlertContainer = styled.div<{ variant: AlertVariant }>`
  position: relative;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;

  ${({ variant }) => variantStyles[variant]};
`;

const AlertIconWrapper = styled.div`
  flex-shrink: 0;
  font-size: 1.25rem;
  line-height: 1;
  margin-top: 0.125rem;
`;

const AlertContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const AlertTitle = styled.h5`
  font-size: ${fontSize.base};
  font-weight: ${fontWeight.bold};
  margin-bottom: 0.25rem;
  line-height: 1.2;
`;

const AlertDescription = styled.p`
  font-size: ${fontSize.sm};
  line-height: 1.5;
  opacity: 0.9;
`;
