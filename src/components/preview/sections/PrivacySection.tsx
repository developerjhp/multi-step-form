import styled from '@emotion/styled';
import { color } from '@/styles/colors';
import { fontSize, fontWeight } from '@/styles/fonts';
import { spacing } from '@/styles/spacing';
import { borderRadius } from '@/styles/border-radius';

interface PrivacySectionProps {
  isPublic?: boolean;
}

export function PrivacySection({ isPublic = false }: PrivacySectionProps) {
  return (
    <Container>
      <PrivacyLabel>공개 설정</PrivacyLabel>
      <PrivacyBadge isPublic={isPublic}>
        {isPublic ? '공개' : '비공개'}
      </PrivacyBadge>
    </Container>
  );
}

const Container = styled.div`
  padding: ${spacing[4]};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PrivacyLabel = styled.span`
  color: ${color.gray600};
  font-size: ${fontSize.sm};
`;

const PrivacyBadge = styled.div<{ isPublic: boolean }>`
  background: ${(props) => (props.isPublic ? color.blue500 : color.gray500)};
  color: ${color.white};
  padding: ${spacing[1]} ${spacing[2]};
  border-radius: ${borderRadius.base};
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.medium};
`;
