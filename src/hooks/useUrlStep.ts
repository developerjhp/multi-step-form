import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface UseUrlStepOptions {
  /** URL 쿼리 파라미터로 사용할 이름입니다. 기본값은 'step'입니다. */
  paramName?: string;
}

/**
 * URL 쿼리 파라미터를 기반으로 멀티스텝 UI의 현재 스텝을 관리합니다.
 * 이 훅은 범용적으로 설계되어 어떤 이름의 쿼리 파라미터와도 함께 사용할 수 있습니다.
 * @param totalSteps 전체 스텝의 수
 * @param options 추가 옵션 (예: { paramName: 'tab' })
 */
export default function useUrlStep(
  totalSteps: number,
  options?: UseUrlStepOptions,
) {
  const router = useRouter();
  const { isReady, query } = router;
  const paramName = options?.paramName ?? 'step';

  const navigateToStep = (stepNumber: number, replace = false) => {
    const method = replace ? router.replace : router.push;
    method({ query: { ...query, [paramName]: stepNumber } }, undefined, {
      shallow: true,
    });
  };

  const getStepIndex = () => {
    if (!isReady) {
      return 0;
    }
    const step = Number(query[paramName]);
    if (isNaN(step) || step < 1 || step > totalSteps) {
      return 0;
    }
    return step - 1;
  };

  const currentStepIndex = getStepIndex();
  useEffect(() => {
    if (!isReady) {
      return;
    }
    const step = Number(query[paramName]);
    if (isNaN(step) || step < 1 || step > totalSteps) {
      navigateToStep(1, true);
    }
  }, [isReady, query, totalSteps, paramName]);

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === totalSteps - 1;

  return { currentStepIndex, navigateToStep, isFirstStep, isLastStep };
}
