'use client';
import styled from '@emotion/styled';
import { color } from '@/styles/colors';
import { fontSize } from '@/styles/fonts';
import { spacing } from '@/styles/spacing';
import Icon from '@/components/ui/Icon';
import Check from '@/assets/icons/check.svg';

import { PhoneFrame } from '@/components/preview/layout/PhoneFrame';
import { StatusBar } from '@/components/preview/layout/StatusBar';
import { AppHeader } from '@/components/preview/layout/AppHeader';
import { ScrollContent } from '@/components/preview/layout/ScrollContent';
import { ActionButtons } from '@/components/preview/layout/ActionButtons';
import { BookFormSchema } from '@/utils/schema';
import { useDebounce } from '@/hooks/useDebounce';

import { BookInfoSection } from './sections/BookInfoSection';
import { DateSection } from './sections/DateSection';
import { RatingSection } from './sections/RatingSection';
import { ReviewSection } from './sections/ReviewSection';
import { QuoteSection } from './sections/QuoteSection';
import { PrivacySection } from './sections/PrivacySection';

const PREVIEW_DEBOUNCE_DELAY_MS = 500;

interface AppPreviewProps {
  bookInfo: BookFormSchema;
}

export function AppPreview({ bookInfo }: AppPreviewProps) {
  const debouncedBookInfo = useDebounce(bookInfo, PREVIEW_DEBOUNCE_DELAY_MS);

  const { startDate, endDate, isPublic = false } = debouncedBookInfo;

  // TODO: 실제 데이터에서 가져오도록 수정 필요
  const recommend = true;
  const rating = 5;
  const review = '독후감을 작성해주세요...';

  return (
    <PreviewContainer>
      <PhoneFrame>
        <StatusBar />
        <AppHeader />
        <ScrollContent>
          <BookInfoSection bookInfo={debouncedBookInfo} />
          <DateSection startDate={startDate} endDate={endDate} />
          <RatingSection recommend={recommend} rating={rating} />
          <ReviewSection review={review} />
          <QuoteSection />
          <PrivacySection isPublic={isPublic} />
        </ScrollContent>
        <ActionButtons />
      </PhoneFrame>

      <AppDescription>
        <Icon as={Check} size={12} style={{ marginRight: '4px' }} />
        실시간 앱 화면 시뮬레이션
      </AppDescription>
    </PreviewContainer>
  );
}

const PreviewContainer = styled.div`
  position: sticky;
  top: ${spacing[8]};
`;

const AppDescription = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: ${spacing[4]};
  font-size: ${fontSize.sm};
  color: ${color.gray600};
`;
