import styled from '@emotion/styled';
import { color } from '@/styles/colors';
import { fontSize, fontWeight } from '@/styles/fonts';
import { spacing } from '@/styles/spacing';
import { borderRadius } from '@/styles/border-radius';
import { formatTime24Hour } from '@/utils/date';

export function StatusBar() {
  return (
    <Container>
      <span>{formatTime24Hour(new Date())}</span>
      <BatteryIcon>
        <BatteryContainer>
          <BatteryFill />
        </BatteryContainer>
      </BatteryIcon>
    </Container>
  );
}

const Container = styled.div`
  background: ${color.white};
  padding: ${spacing[2]} ${spacing[6]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.medium};
  flex-shrink: 0;
`;

const BatteryIcon = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[1]};
`;

const BatteryContainer = styled.div`
  width: 1.5rem;
  height: 0.75rem;
  border: 1px solid ${color.black};
  border-radius: ${borderRadius.sm};
  position: relative;
  padding: 1px;
`;

const BatteryFill = styled.div`
  height: 100%;
  width: 70%;
  background: ${color.black};
  border-radius: ${borderRadius.sm};
`;
