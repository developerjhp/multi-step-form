import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface UseUrlStepOptions {
  /** URL 쿼리 파라미터로 사용할 이름입니다. (기본값: 'step') */
  paramName?: string;
}

/**
 * URL 쿼리 파라미터를 사용해 멀티스텝 UI의 상태를 관리하는 React 훅입니다.
 * @param totalSteps - 전체 스텝의 수.
 * @param options - `paramName`을 포함하는 추가 옵션.
 */
export default function useUrlStep(
  totalSteps: number,
  options: UseUrlStepOptions = {},
) {
  const { paramName = 'step' } = options;
  const router = useRouter();
  const { query, isReady } = router;

  const stepFromQuery = Number(query[paramName]);
  const isValidStep =
    !isNaN(stepFromQuery) && 0 < stepFromQuery && stepFromQuery <= totalSteps;

  const currentStepIndex = isReady && isValidStep ? stepFromQuery - 1 : 0;

  const navigateToStep = (stepNumber: number, replace = false) => {
    const method = replace ? router.replace : router.push;
    method({ query: { ...query, [paramName]: stepNumber } }, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    if (isReady && isValidStep === false) {
      navigateToStep(1, true);
    }
  }, [isReady, isValidStep]);

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === totalSteps - 1;

  return {
    currentStepIndex,
    navigateToStep,
    isFirstStep,
    isLastStep,
  };
}
