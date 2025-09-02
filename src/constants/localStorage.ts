export const LOCAL_STORAGE_KEYS = {
  MULTI_STEP_FORM_DATA: 'multi-step-form-data',
} as const;

export type LocalStorageKey =
  (typeof LOCAL_STORAGE_KEYS)[keyof typeof LOCAL_STORAGE_KEYS];

export interface LocalStorageValueMap {
  [LOCAL_STORAGE_KEYS.MULTI_STEP_FORM_DATA]: Record<string, unknown>;
}
