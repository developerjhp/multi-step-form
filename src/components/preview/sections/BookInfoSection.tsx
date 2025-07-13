import styled from '@emotion/styled';
import { color } from '@/styles/colors';
import { fontSize, fontWeight } from '@/styles/fonts';
import { spacing } from '@/styles/spacing';
import { shadow } from '@/styles/shadow';
import { borderRadius } from '@/styles/border-radius';
import Icon from '@/components/ui/Icon';
import BookOpen from '@/assets/icons/book-open.svg';
import { READING_STATUS_LABELS } from '@/constants/book';
import { ReadingStatus } from '@/constants/book';
import { BookFormSchema } from '@/utils/schema';

interface BookInfoSectionProps {
  bookInfo: BookFormSchema;
}

const readingStatusColors: Record<ReadingStatus, string> = {
  WISH: color.blue500,
  READING: color.green500,
  DONE: color.gray500,
  PAUSE: color.orange500,
};

export function BookInfoSection({ bookInfo }: BookInfoSectionProps) {
  const { title, author, status, totalPages } = bookInfo;

  return (
    <Container>
      <BookInfoContainer>
        <BookCover>
          <Icon as={BookOpen} size={24} color={color.white} />
        </BookCover>
        <BookDetails>
          <BookTitle>{title || '도서명을 입력하세요'}</BookTitle>
          <BookAuthor>{author || '저자명을 입력하세요'}</BookAuthor>
          {status && (
            <div>
              <StatusBadge status={status}>
                {READING_STATUS_LABELS[status]}
              </StatusBadge>
            </div>
          )}
          <BookPages>
            {totalPages ? totalPages.toLocaleString() : 0}페이지
          </BookPages>
        </BookDetails>
      </BookInfoContainer>
    </Container>
  );
}

const Container = styled.div`
  background: linear-gradient(to bottom, ${color.blue50}, ${color.white});
  padding: ${spacing[4]};
`;

const BookInfoContainer = styled.div`
  display: flex;
  gap: ${spacing[3]};
`;

const BookCover = styled.div`
  width: 4rem;
  height: 6rem;
  background: linear-gradient(
    to bottom right,
    ${color.blue400},
    ${color.blue600}
  );
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadow.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const BookDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing[1]};
`;

const BookTitle = styled.h2`
  font-size: ${fontSize.lg};
  font-weight: ${fontWeight.bold};
  color: ${color.gray900};
  line-height: 1.3;
  margin: 0;
`;

const BookAuthor = styled.p`
  color: ${color.gray600};
  font-size: ${fontSize.sm};
  margin: 0;
`;

const StatusBadge = styled.div<{ status: ReadingStatus }>`
  background: ${(props) => readingStatusColors[props.status]};
  color: ${color.white};
  padding: ${spacing[1]} ${spacing[2]};
  border-radius: ${borderRadius.full};
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.medium};
  display: inline-block;
  width: fit-content;
`;

const BookPages = styled.p`
  color: ${color.gray500};
  font-size: ${fontSize.xs};
  margin: 0;
`;
