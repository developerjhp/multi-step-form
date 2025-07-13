import { ReactNode } from 'react';
import styled from '@emotion/styled';

interface ScrollContentProps {
  children: ReactNode;
}

export function ScrollContent({ children }: ScrollContentProps) {
  return (
    <Container>
      {children}
      <BottomSpacer />
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BottomSpacer = styled.div`
  height: 4rem;
`;
