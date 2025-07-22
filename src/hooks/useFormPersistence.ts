import { useEffect } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { useDebounce } from '@/hooks/useDebounce';
import { localStorageManager } from '@/utils/localStorageManager';
import { LocalStorageKey } from '@/constants/localStorage';

/**
 * react-hook-form의 상태를 localStorage에 자동으로 저장하고 복원합니다.
 * 이 훅은 범용적으로 설계되어 어떤 폼, 어떤 키와도 함께 사용할 수 있습니다.
 * @param methods useForm에서 반환된 객체
 * @param persistenceKey localStorage에 저장할 때 사용할 키
 */
export default function useFormPersistence<T extends FieldValues>(
  methods: UseFormReturn<T>,
  persistenceKey: LocalStorageKey,
) {
  const watchedData = methods.watch();
  const debouncedData = useDebounce(watchedData, 500);

  useEffect(() => {
    const savedData = localStorageManager.getItem(persistenceKey);
    if (savedData) {
      methods.reset(savedData as T, { keepDirty: false });
    }
  }, []);

  useEffect(() => {
    if (!methods.formState.isDirty) {
      return;
    }
    localStorageManager.setItem(persistenceKey, debouncedData);
  }, [debouncedData, methods.formState.isDirty]);

  const clearStoredData = () => {
    localStorageManager.removeItem(persistenceKey);
  };

  return { clearStoredData };
}
