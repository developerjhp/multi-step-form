import styled from '@emotion/styled';
import { color } from '@/styles/colors';
import { fontSize, fontWeight } from '@/styles/fonts';
import { spacing } from '@/styles/spacing';
import { borderRadius } from '@/styles/border-radius';
import Icon from '@/components/ui/Icon';
import Share from '@/assets/icons/share.svg';
import Heart from '@/assets/icons/heart.svg';

export function ActionButtons() {
  return (
    <Container>
      <ButtonContainer>
        <PrimaryButton>수정하기</PrimaryButton>
        <IconButton>
          <Icon as={Share} size={16} />
        </IconButton>
        <IconButton>
          <Icon as={Heart} size={16} />
        </IconButton>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${color.white};
  border-top: 1px solid ${color.gray200};
  padding: ${spacing[3]} ${spacing[4]};
  flex-shrink: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${spacing[2]};
`;

const PrimaryButton = styled.button`
  flex: 1;
  background: ${color.blue600};
  color: ${color.white};
  border: none;
  border-radius: ${borderRadius.md};
  padding: ${spacing[2]} ${spacing[4]};
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.medium};
  cursor: pointer;

  &:hover {
    background: ${color.blue700};
  }
`;

const IconButton = styled.button`
  background: ${color.white};
  border: 1px solid ${color.gray300};
  border-radius: ${borderRadius.md};
  padding: ${spacing[2]};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${color.gray50};
  }
`;
