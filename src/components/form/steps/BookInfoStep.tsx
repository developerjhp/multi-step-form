import { useFormContext, Controller } from 'react-hook-form';
import InputField from '@/components/form/InputField';
import Select from '@/components/form/Select';
import Alert from '@/components/ui/Alert';
import Icon from '@/components/ui/Icon';
import styled from '@emotion/styled';
import { type BookFormSchema } from '@/utils/schema';
import { READING_STATUS, READING_STATUS_OPTIONS } from '@/constants/book';
import AlertTriangleIcon from '@/assets/icons/alert-triangle.svg';

export default function BookInfoStep() {
  const {
    register,
    watch,
    control,
    formState: { errors },
  } = useFormContext<BookFormSchema>();

  const status = watch('status');
  const shouldShowStartDate = status && status !== READING_STATUS.WISH;
  const shouldShowEndDate = status === READING_STATUS.DONE;

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <Container>
      {hasErrors && (
        <Alert
          variant="error"
          title="입력 정보를 확인해주세요"
          description="필수 항목들을 올바르게 입력해주세요."
          icon={<Icon as={AlertTriangleIcon} size={20} />}
        />
      )}

      <GridContainer>
        <InputField
          id="title"
          label="도서명"
          {...register('title')}
          errorMessage={errors.title?.message}
          placeholder="도서명을 입력해주세요"
          required
        />
        <InputField
          id="author"
          label="저자명"
          {...register('author')}
          errorMessage={errors.author?.message}
          placeholder="저자명을 입력해주세요"
          required
        />
      </GridContainer>

      <GridContainer>
        <InputField
          id="publishedDate"
          label="출판일"
          type="date"
          {...register('publishedDate')}
          errorMessage={errors.publishedDate?.message}
          required
        />

        {/* TODO: 3.6 요구사항에 따라 RHFCommaSeparatedInput 컴포넌트 사용 */}
        <InputField
          id="totalPages"
          label="전체 페이지 수"
          type="number"
          {...register('totalPages')}
          errorMessage={errors.totalPages?.message}
          placeholder="숫자를 입력해주세요"
          required
        />
      </GridContainer>

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <Select
            id="status"
            label="독서 상태"
            options={READING_STATUS_OPTIONS}
            placeholder="독서 상태를 선택해주세요"
            errorMessage={errors.status?.message}
            required
            value={field.value}
            onChange={field.onChange}
            ref={field.ref}
          />
        )}
      />

      <GridContainer>
        {shouldShowStartDate && (
          <InputField
            id="startDate"
            label="독서 시작일"
            type="date"
            {...register('startDate')}
            errorMessage={errors.startDate?.message}
            required
          />
        )}
        {shouldShowEndDate && (
          <InputField
            id="endDate"
            label="독서 종료일"
            type="date"
            {...register('endDate')}
            errorMessage={errors.endDate?.message}
            required
          />
        )}
      </GridContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
