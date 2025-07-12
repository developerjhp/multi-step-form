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
    <IconWrapper iconColor={color} size={size} {...props}>
      <IconComponent
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={{ display: 'block' }}
      />
    </IconWrapper>
  );
}

const IconWrapper = styled.span<{ iconColor: string; size: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  flex-shrink: 0;
  color: ${({ iconColor }) => iconColor};
  overflow: hidden;
`;
