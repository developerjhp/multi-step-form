import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { color } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { shadow } from '@/styles/shadow';

interface PhoneFrameProps {
  children: ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <Container>
      <Screen>{children}</Screen>
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  max-width: 24rem;
  background: ${color.gray900};
  border-radius: 2.5rem;
  padding: ${spacing[2]};
  box-shadow: ${shadow['2xl']};
`;

const Screen = styled.div`
  background: ${color.white};
  border-radius: 2rem;
  overflow: hidden;
  max-height: 800px;
  position: relative;
  display: flex;
  flex-direction: column;
`;
