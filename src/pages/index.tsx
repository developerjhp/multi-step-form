import InputField from '@/components/form/InputField';
import Select from '@/components/form/Select';
import Stepper from '@/components/form/Stepper';
import Alert from '@/components/ui/Alert';
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
        <Select
          label="독서 상태"
          id="readingStatus"
          placeholder="독서 상태를 선택해주세요."
          value="reading"
          options={[
            { value: 'reading', label: '읽는 중' },
            { value: 'wantToRead', label: '읽고 싶은 책' },
            { value: 'finished', label: '읽음' },
            { value: 'onHold', label: '보류 중' },
          ]}
        />
        <InputField label="독서 시작일" id="startDate" type="date" />
        <InputField label="독서 종료일" id="endDate" type="date" />
        <Stepper
          steps={['도서 정보', '독서 기록', '독서 후기']}
          currentStepIndex={0}
        />
        <Alert
          variant="error"
          title="도서 정보"
          description="도서 정보를 입력해주세요."
        />
      </main>
    </>
  );
}
