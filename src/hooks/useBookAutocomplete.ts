import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { useDebounce } from '@/hooks/useDebounce';
import type { Book } from '@/types/book';

const DEBOUNCE_DELAY_MS = 300;
const MIN_SEARCH_LENGTH = 2;
const DEFAULT_LIMIT = 10;
const STALE_TIME_MS = 5 * 60 * 1000;

/**
 * 도서 자동완성 훅
 * 사용자가 입력한 텍스트로 도서를 검색하고, 자동완성된 도서 정보를 제공합니다.
 *
 * @param query - 검색 쿼리
 * @param shouldShowAll - 전체 도서 목록을 표시할지 여부
 * @returns 도서 검색 결과
 */
export function useBookAutocomplete(
  query: string,
  shouldShowAll: boolean = false,
) {
  const debouncedQuery = useDebounce(query, DEBOUNCE_DELAY_MS);
  const isSearching = debouncedQuery.length >= MIN_SEARCH_LENGTH;

  return useQuery({
    queryKey: [
      'books',
      'autocomplete',
      { query: debouncedQuery, all: shouldShowAll },
    ],
    queryFn: async () => {
      try {
        if (shouldShowAll) {
          const response = await api<{
            items: Book[];
          }>(`/api/books/all?limit=${DEFAULT_LIMIT}`);

          return response.items || [];
        }

        if (isSearching) {
          const params = new URLSearchParams({
            query: debouncedQuery,
            limit: String(DEFAULT_LIMIT),
          });

          const response = await api<{
            items: Book[];
          }>(`/api/books/search?${params}`);

          return response.items || [];
        }

        return [];
      } catch (error) {
        console.error('Failed to fetch books:', error);
        return [];
      }
    },
    enabled: shouldShowAll || isSearching,
    staleTime: STALE_TIME_MS,
    placeholderData: (previousData) => previousData,
    retry: 1,
    retryDelay: 1000,
  });
}
