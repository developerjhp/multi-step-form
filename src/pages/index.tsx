import InputField from '@/components/form/InputField';
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

        <InputField
          label="도서명"
          id="bookName"
          type="text"
          errorMessage="도서명을 입력해주세요."
          required
        />
        <InputField label="저자명" id="authorName" />
        <InputField label="출판일" id="publicationDate" />
        <InputField label="전체 페이지 수" id="totalPages" />
        <InputField label="독서 상태" id="readingStatus" />
        <InputField label="독서 시작일" id="startDate" type="date" />
        <InputField label="독서 종료일" id="endDate" type="date" />
      </main>
    </>
  );
}
