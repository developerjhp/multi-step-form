import { ComponentType, useEffect } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { useRouter } from 'next/router';

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

export function useStepForm<T extends FieldValues>(
  stepDefinitions: Record<string, StepConfig<T>>,
  methods: UseFormReturn<T>,
  onSubmit: (data: T) => void | Promise<void>,
): StepFormReturn<T> {
  const router = useRouter();
  const { isReady, query } = router;

  const steps = Object.values(stepDefinitions).sort(
    (a, b) => a.order - b.order,
  );
  const stepCount = steps.length;

  const getStepIndex = () => {
    if (!isReady) return 0;
    const step = Number(query.step);
    if (isNaN(step) || step < 1 || step > stepCount) return 0;
    return step - 1;
  };

  const currentStepIndex = getStepIndex();
  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === stepCount - 1;

  const navigateToStep = (stepNumber: number, replace = false) => {
    const method = replace ? router.replace : router.push;
    method(`?step=${stepNumber}`, undefined, { shallow: true });
  };

  useEffect(() => {
    if (!isReady) return;

    const step = Number(query.step);

    if (isNaN(step) || step < 1 || step > stepCount) {
      navigateToStep(1, true);
    }
  }, [isReady, query, stepCount, router]);

  const handleNext = async () => {
    if (!currentStep) return;

    try {
      const { fields } = currentStep;
      const isValid = await methods.trigger(fields);

      if (!isValid) {
        const firstErrorField = fields.find(
          (field) => methods.formState.errors[field],
        );
        if (firstErrorField) {
          methods.setFocus(firstErrorField as Path<T>);
        }
        return;
      }

      if (isLastStep) {
        await methods.handleSubmit(onSubmit)();
      } else {
        navigateToStep(currentStepIndex + 2);
      }
    } catch (error) {
      console.error('Step navigation failed:', error);
    }
  };

  const handleBack = () => {
    if (isFirstStep) return;

    navigateToStep(currentStepIndex);
  };

  const handleReset = () => {
    navigateToStep(1);
    methods.reset();
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
