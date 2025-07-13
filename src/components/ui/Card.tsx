import React, { type HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { color } from '@/styles/colors';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Card({ children, ...props }: CardProps) {
  return <CardContainer {...props}>{children}</CardContainer>;
}

const CardContainer = styled.div`
  background-color: ${color.white};
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid ${color.gray100};
`;
