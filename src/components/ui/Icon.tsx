import React, { type HTMLAttributes } from 'react';
import styled from '@emotion/styled';

interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  as?: React.ElementType;
  size?: number;
  color?: string;
}

export default function Icon({
  as: IconComponent,
  size = 24,
  color = 'currentColor',
  ...props
}: IconProps) {
  if (!IconComponent) {
    return null;
  }

  return (
    <IconWrapper size={size} iconColor={color} {...props}>
      <IconComponent style={{ width: '100%', height: '100%' }} />
    </IconWrapper>
  );
}

const IconWrapper = styled.span<{ size: number; iconColor: string }>`
  display: inline-block;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  flex-shrink: 0;
  color: ${({ iconColor }) => iconColor};
`;
