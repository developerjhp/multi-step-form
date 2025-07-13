import React, { type HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { color } from '@/styles/colors';
import { fontSize, fontWeight } from '@/styles/fonts';

type TagVariant = 'default' | 'info' | 'success' | 'warning' | 'error';

const tagVariantStyles = {
  default: css`
    background-color: ${color.gray100};
    color: ${color.gray800};
  `,
  info: css`
    background-color: ${color.blue100};
    color: ${color.blue700};
  `,
  success: css`
    background-color: ${color.green100};
    color: ${color.green700};
  `,
  warning: css`
    background-color: ${color.yellow100};
    color: ${color.yellow700};
  `,
  error: css`
    background-color: ${color.red100};
    color: ${color.red700};
  `,
} as const;

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: TagVariant;
}

export default function Tag({
  children,
  variant = 'default',
  ...props
}: TagProps) {
  return (
    <TagContainer variant={variant} {...props}>
      {children}
    </TagContainer>
  );
}

const TagContainer = styled.span<{ variant: TagVariant }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.medium};
  white-space: nowrap;

  ${({ variant }) => tagVariantStyles[variant]}
`;
