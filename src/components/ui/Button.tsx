import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import styled from '@emotion/styled';
import { color } from '@/styles/colors';
import { fontSize, fontWeight } from '@/styles/fonts';

type ButtonVariant = 'primary' | 'secondary' | 'red' | 'blue';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const variantStyles = {
  primary: {
    backgroundColor: color.gray800,
    color: color.white,
    borderColor: color.gray800,
  },
  secondary: {
    backgroundColor: color.white,
    color: color.gray800,
    borderColor: color.gray300,
  },
  red: {
    backgroundColor: color.red600,
    color: color.white,
    borderColor: color.red600,
  },
  blue: {
    backgroundColor: color.blue600,
    color: color.white,
    borderColor: color.blue600,
  },
} as const;

export default function Button({
  children,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<{ variant: ButtonVariant }>`
  padding: 0.5rem 1rem;
  border: 1px solid;
  border-radius: 0.5rem;
  font-size: ${fontSize.base};
  font-weight: ${fontWeight.semiBold};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  ${({ variant }) => variantStyles[variant]};

  &:hover:not(:disabled) {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
