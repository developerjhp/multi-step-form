import InputField from '@/components/form/InputField';
import Select from '@/components/form/Select';
import Stepper from '@/components/form/Stepper';
import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import { Ratings } from '@/components/ui/Rating';
import Tag from '@/components/ui/Tag';
import Head from 'next/head';
import ShareIcon from '@/assets/icons/share.svg';
import { RadioItem } from '@/components/form/Radio';
import { RadioGroup } from '@/components/form/Radio';

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

        <Ratings rating={4.5} variant="default" size={30} />
        <Ratings rating={3.5} variant="error" size={30} />
        <Ratings rating={2.5} variant="yellow" size={30} />

        <Card>
          <h2>도서 기본 정보</h2>
          <InputField label="도서명" id="bookName" required />
          <InputField label="저자명" id="authorName" required />
        </Card>

        <Tag variant="default">기본 태그</Tag>
        <Tag variant="info">정보 태그</Tag>
        <Tag variant="success">성공 태그</Tag>
        <Tag variant="warning">경고 태그</Tag>
        <Tag variant="error">오류 태그</Tag>

        <Icon as={ShareIcon} size={24} color="red" />

        <RadioGroup
          name="recommend"
          value="yes"
          onChange={() => {}}
          direction="row"
        >
          <RadioItem value="yes" label="추천합니다." />
          <RadioItem value="no" label="추천하지 않습니다." />
        </RadioGroup>
      </main>
    </>
  );
}
