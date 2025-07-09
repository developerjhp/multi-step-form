import styled from '@emotion/styled';
import Head from 'next/head';
import { type ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Container>
      <Head>
        <title>독서 기록장</title>
      </Head>

      {children}
    </Container>
  );
}

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 2.5rem 1.25rem;
`;
