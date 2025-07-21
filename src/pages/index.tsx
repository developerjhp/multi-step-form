import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  bookFormSchema,
  type BookFormSchema,
  BOOK_FORM_DEFAULT_VALUES,
} from '@/utils/schema';
import Stepper from '@/components/form/Stepper';
import styled from '@emotion/styled';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { color } from '@/styles/colors';
import { fontSize, fontWeight } from '@/styles/fonts';
import { BOOK_FORM_STEPS } from '@/constants/form';
import { AppPreview } from '@/components/preview/AppPreview';
import {
  DESKTOP_MIN_WIDTH,
  useIsAboveMinWidth,
} from '@/hooks/useIsAboveMinWidth';
import { useStepForm } from '@/hooks/useStepForm';

export default function HomePage() {
  const isDesktop = useIsAboveMinWidth(DESKTOP_MIN_WIDTH);

  const methods = useForm<BookFormSchema>({
    resolver: zodResolver(bookFormSchema),
    mode: 'onChange',
    defaultValues: BOOK_FORM_DEFAULT_VALUES,
  });

  const formData = useWatch({
    control: methods.control,
  }) as BookFormSchema;

  const onSubmit = (data: BookFormSchema) => {
    // 최종 제출 로직
    console.log(data);
  };

  const {
    currentStepIndex,
    currentStep,
    isFirstStep,
    isLastStep,
    handleNext,
    handleBack,
    handleReset,
    steps,
  } = useStepForm<BookFormSchema>(BOOK_FORM_STEPS, methods, onSubmit);

  const CurrentStepComponent = currentStep?.component;

  return (
    <PageContainer>
      <Container>
        <HeaderSection>
          <Title>독서 기록</Title>
          <Description>단계별로 독서 경험을 기록해보세요</Description>
        </HeaderSection>

        <PageLayout>
          <FormWrapper>
            <Card>
              <Stepper
                steps={steps.map((step) => step.label)}
                currentStepIndex={currentStepIndex}
              />
              <FormProvider {...methods}>
                <StyledForm noValidate>
                  <CurrentStepComponent />

                  <FormActionButtons
                    isFirstStep={isFirstStep}
                    isLastStep={isLastStep}
                    onBack={handleBack}
                    onNext={handleNext}
                    onReset={handleReset}
                  />
                </StyledForm>
              </FormProvider>
            </Card>
          </FormWrapper>

          {isDesktop && <AppPreview bookInfo={formData} />}
        </PageLayout>
      </Container>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${color.gray50};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: ${fontSize['3xl']};
  font-weight: ${fontWeight.bold};
  color: ${color.gray900};
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: ${color.gray600};
  font-size: ${fontSize.base};
`;

const PageLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 400px;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
`;

const StyledForm = styled.form`
  margin-top: 2rem;
`;

interface FormActionButtonsProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  onBack: () => void;
  onNext: () => void;
  onReset: () => void;
}

function FormActionButtons({
  isFirstStep,
  isLastStep,
  onBack,
  onNext,
  onReset,
}: FormActionButtonsProps) {
  return (
    <ButtonContainer hasBackButton={!isFirstStep}>
      {!isFirstStep && (
        <Button type="button" variant="secondary" onClick={onBack}>
          이전
        </Button>
      )}

      <ActionButtonGroup>
        <Button type="button" variant="red" onClick={onReset}>
          초기화
        </Button>
        <Button type="button" variant="blue" onClick={onNext}>
          {isLastStep ? '제출' : '다음'}
        </Button>
      </ActionButtonGroup>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div<{ hasBackButton?: boolean }>`
  width: 100%;
  display: flex;
  justify-content: ${({ hasBackButton }) =>
    hasBackButton ? 'space-between' : 'flex-end'};
  padding: 1rem;
  background-color: ${color.white};
`;

const ActionButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;
