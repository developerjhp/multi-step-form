import styled from '@emotion/styled';
import { color } from '@/styles/colors';
import { fontSize, fontWeight } from '@/styles/fonts';
import { spacing } from '@/styles/spacing';
import Icon from '@/components/ui/Icon';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import Share from '@/assets/icons/share.svg';
import More from '@/assets/icons/more.svg';

export function AppHeader() {
  return (
    <Container>
      <HeaderLeft>
        <Icon as={ArrowLeft} size={24} />
        <HeaderTitle>독서 기록</HeaderTitle>
      </HeaderLeft>
      <HeaderRight>
        <Icon as={Share} size={20} />
        <Icon as={More} size={20} />
      </HeaderRight>
    </Container>
  );
}

const Container = styled.div`
  background: ${color.blue600};
  color: ${color.white};
  padding: ${spacing[3]} ${spacing[4]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
`;

const HeaderTitle = styled.h1`
  font-size: ${fontSize.lg};
  font-weight: ${fontWeight.semiBold};
  margin: 0;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
`;
