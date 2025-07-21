import { ComponentType } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import useUrlStep from '@/hooks/useUrlStep';
import useFormPersistence from '@/hooks/useFormPersistence';
import { LocalStorageKey } from '@/constants/localStorage';

export interface StepConfig<T extends FieldValues> {
  readonly order: number;
  readonly label: string;
  readonly fields: readonly Path<T>[];
  readonly component: ComponentType;
}

export interface StepFormReturn<T extends FieldValues> {
  readonly currentStepIndex: number;
  readonly currentStep: StepConfig<T>;
  readonly isFirstStep: boolean;
  readonly isLastStep: boolean;
  readonly handleNext: () => Promise<void>;
  readonly handleBack: () => void;
  readonly handleReset: () => void;
  readonly steps: StepConfig<T>[];
}

interface UseStepFormOptions {
  persistenceKey: LocalStorageKey;
}

/**
 * 멀티 스텝 폼의 전체 로직을 관리합니다.
 * @param stepDefinitions 각 스텝의 설정 정보
 * @param methods useForm에서 반환된 객체
 * @param onSubmit 최종 제출 시 실행될 콜백 함수
 * @param defaultValues 폼의 기본값
 * @param options 추가 옵션 (예: { persistenceKey: '...' })
 */
export default function useStepForm<T extends FieldValues>(
  stepDefinitions: Record<string, StepConfig<T>>,
  methods: UseFormReturn<T>,
  onSubmit: (data: T) => void | Promise<void>,
  defaultValues: T,
  options: UseStepFormOptions,
): StepFormReturn<T> {
  const steps = Object.values(stepDefinitions).sort(
    (a, b) => a.order - b.order,
  );
  const stepCount = steps.length;

  const { currentStepIndex, navigateToStep, isFirstStep, isLastStep } =
    useUrlStep(stepCount);
  const { clearStoredData } = useFormPersistence(
    methods,
    options.persistenceKey,
  );

  const currentStep = steps[currentStepIndex];

  const handleNext = async () => {
    if (!currentStep) return;

    const { fields } = currentStep;
    const isValid = await methods.trigger(fields);

    if (!isValid) {
      const firstErrorField = fields.find(
        (field) => methods.formState.errors[field],
      );
      if (firstErrorField) {
        methods.setFocus(firstErrorField);
      }
      return;
    }

    if (isLastStep) {
      await methods.handleSubmit(onSubmit)();
      clearStoredData();
    } else {
      navigateToStep(currentStepIndex + 2);
    }
  };

  const handleBack = () => {
    if (isFirstStep) {
      return;
    }

    navigateToStep(currentStepIndex);
  };

  const handleReset = () => {
    clearStoredData();
    methods.reset(defaultValues);
    navigateToStep(1);
  };

  return {
    currentStepIndex,
    currentStep,
    isFirstStep,
    isLastStep,
    handleNext,
    handleBack,
    handleReset,
    steps,
  };
}
