import styled from '@emotion/styled';
import { color } from '@/styles/colors';
import { fontSize, fontWeight } from '@/styles/fonts';
import { spacing } from '@/styles/spacing';

export const Section = styled.div`
  padding: ${spacing[4]};
  border-bottom: 1px solid ${color.gray100};
`;

export const SectionTitle = styled.h3`
  font-weight: ${fontWeight.medium};
  color: ${color.gray900};
  margin: 0 0 ${spacing[2]} 0;
  font-size: ${fontSize.sm};
  display: flex;
  align-items: center;
  gap: ${spacing[1]};
`;

export const PlaceholderText = styled.p`
  color: ${color.gray400};
  font-style: italic;
  font-size: ${fontSize.xs};
  margin: 0;
`;
