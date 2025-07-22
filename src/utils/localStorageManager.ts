import {
  LocalStorageKey,
  LocalStorageValueMap,
} from '@/constants/localStorage';

const isBrowser = typeof window !== 'undefined';

interface LocalStorageManager {
  setItem<K extends LocalStorageKey>(
    key: K,
    value: LocalStorageValueMap[K],
  ): void;
  getItem<K extends LocalStorageKey>(key: K): LocalStorageValueMap[K] | null;
  removeItem(key: LocalStorageKey): void;
  clear(except?: LocalStorageKey[]): void;
}

/**
 * localStorage를 안전하고 편리하게 관리하기 위한 객체입니다.
 * - 서버 사이드 렌더링(SSR) 환경을 고려하여 브라우저에서만 동작합니다!
 * - key와 value 타입을 미리 정의하여 타입 안정성을 보장합니다. (`LocalStorageKey`, `LocalStorageValueMap`)
 * - JSON 파싱/직렬화 과정에서 발생할 수 있는 오류를 처리합니다.
 */
export const localStorageManager: LocalStorageManager = {
  /**
   * 지정된 key와 value를 localStorage에 저장합니다.
   * (주의) value는 JSON 문자열로 변환되어 저장됩니다!
   * @template K - LocalStorage의 key 타입
   * @param {K} key - 저장할 데이터의 key
   * @param {LocalStorageValueMap[K]} value - 저장할 데이터의 값
   */
  setItem(key, value) {
    if (!isBrowser) return;

    try {
      const stringValue = JSON.stringify(value);
      localStorage.setItem(key, stringValue);
    } catch (error) {
      console.error(
        `[LocalStorageManager] Error setting item "${key}":`,
        error,
      );
    }
  },

  /**
   * localStorage에서 지정된 key에 해당하는 값을 가져옵니다.
   * (주의) 값은 JSON 파싱을 거쳐 원래 타입으로 변환됩니다.
   * @template K - LocalStorage의 key 타입
   * @param {K} key - 가져올 데이터의 key
   * @returns {LocalStorageValueMap[K] | null} - key에 해당하는 값 또는 값이 없거나 오류 발생 시 null
   */
  getItem(key) {
    if (!isBrowser) return null;

    try {
      const stringValue = localStorage.getItem(key);
      if (stringValue === null) {
        return null;
      }
      return JSON.parse(stringValue) as LocalStorageValueMap[typeof key];
    } catch (error) {
      console.error(
        `[LocalStorageManager] Error getting item "${key}":`,
        error,
      );
      this.removeItem(key);
      return null;
    }
  },

  /**
   * localStorage에서 지정된 key의 아이템을 삭제합니다.
   * @param {LocalStorageKey} key - 삭제할 데이터의 key
   */
  removeItem(key) {
    if (!isBrowser) return;

    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(
        `[LocalStorageManager] Error removing item "${key}":`,
        error,
      );
    }
  },

  /**
   * localStorage의 모든 데이터를 삭제합니다.
   * (주의) 'except' 배열에 포함된 key들은 삭제되지 않습니다.
   * @param {LocalStorageKey[]} [except=[]] - 삭제에서 제외할 key들의 배열
   */
  clear(except: LocalStorageKey[] = []) {
    if (!isBrowser) return;

    const localStorageKeys = Object.keys(localStorage) as LocalStorageKey[];

    localStorageKeys.forEach((key) => {
      if (!except.includes(key)) {
        this.removeItem(key);
      }
    });
  },
};
