import styled from '@emotion/styled';
import { color } from '@/styles/colors';
import { fontSize, fontWeight } from '@/styles/fonts';
import { spacing } from '@/styles/spacing';
import Icon from '@/components/ui/Icon';
import Calendar from '@/assets/icons/calendar.svg';
import { Section, SectionTitle } from '@/components/preview/styles/shared';
import { formatKoreanShortDate } from '@/utils/date';

interface DateSectionProps {
  startDate?: Date | null;
  endDate?: Date | null;
}

export function DateSection({ startDate, endDate }: DateSectionProps) {
  return (
    <Section>
      <SectionTitle>
        <Icon as={Calendar} size={16} color={color.blue600} />
        독서 기간
      </SectionTitle>
      <DateGrid>
        {startDate && (
          <DateItem>
            <span>시작</span>
            <p>{formatKoreanShortDate(startDate)}</p>
          </DateItem>
        )}
        {endDate && (
          <DateItem>
            <span>완료</span>
            <p>{formatKoreanShortDate(endDate)}</p>
          </DateItem>
        )}
      </DateGrid>
    </Section>
  );
}

const DateGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing[2]};
  font-size: ${fontSize.xs};
`;

const DateItem = styled.div`
  span {
    color: ${color.gray500};
    display: block;
  }

  p {
    font-weight: ${fontWeight.medium};
    margin: 0;
  }
`;
