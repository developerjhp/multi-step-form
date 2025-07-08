import Button from '@/components/ui/Button';
import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>독서 기록장</title>
      </Head>
      <main>
        <h1>독서 기록 폼</h1>
        <Button variant="primary">다음</Button>
        <Button variant="secondary">이전</Button>
        <Button variant="red">삭제</Button>
        <Button variant="blue">저장</Button>
        <Button variant="primary" disabled>
          다음 (비활성화)
        </Button>
      </main>
    </>
  );
}
