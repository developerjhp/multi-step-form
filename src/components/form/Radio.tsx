import React, {
  createContext,
  useContext,
  type InputHTMLAttributes,
} from 'react';
import styled from '@emotion/styled';
import { color } from '@/styles/colors';
import { fontSize, fontWeight } from '@/styles/fonts';

interface RadioGroupContextType {
  name: string;
  selectedValue: string;
  onChange: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(
  undefined,
);

interface RadioGroupProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  label?: string;
  direction?: 'row' | 'column';
}

export function RadioGroup({
  name,
  value,
  onChange,
  children,
  label,
  direction = 'column',
}: RadioGroupProps) {
  return (
    <RadioGroupContainer direction={direction}>
      {label && <GroupLabel>{label}</GroupLabel>}
      <RadioGroupContext.Provider
        value={{ name, selectedValue: value, onChange }}
      >
        {children}
      </RadioGroupContext.Provider>
    </RadioGroupContainer>
  );
}

interface RadioItemProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label: string;
}

export function RadioItem({
  value,
  label,
  disabled,
  ...props
}: RadioItemProps) {
  const context = useContext(RadioGroupContext);

  if (!context) {
    throw new Error('RadioItem must be used within a RadioGroup');
  }

  const { name, selectedValue, onChange } = context;
  const isChecked = selectedValue === value;

  return (
    <RadioItemWrapper disabled={disabled}>
      <HiddenRadio
        type="radio"
        name={name}
        value={value}
        checked={isChecked}
        onChange={() => onChange(value)}
        disabled={disabled}
        {...props}
      />
      <StyledRadio isChecked={isChecked} disabled={disabled}>
        <RadioDot isChecked={isChecked} />
      </StyledRadio>
      <RadioLabel disabled={disabled}>{label}</RadioLabel>
    </RadioItemWrapper>
  );
}

const RadioGroupContainer = styled.div<{ direction: 'row' | 'column' }>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  gap: ${({ direction }) => (direction === 'row' ? '1.5rem' : '0.75rem')};
  align-items: ${({ direction }) =>
    direction === 'row' ? 'center' : 'flex-start'};
  margin-bottom: 1rem;
`;

const GroupLabel = styled.label`
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.medium};
  color: ${color.gray700};
  margin-bottom: 0.5rem;
`;

const RadioItemWrapper = styled.label<{ disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const HiddenRadio = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
`;

const StyledRadio = styled.div<{ isChecked: boolean; disabled?: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  border: 2px solid
    ${({ isChecked, disabled }) =>
      disabled ? color.gray300 : isChecked ? color.blue500 : color.gray400};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease-in-out;
  background-color: ${({ disabled }) =>
    disabled ? color.gray100 : color.white};

  ${HiddenRadio}:focus + & {
    box-shadow: 0 0 0 3px ${color.blue200};
  }
`;

const RadioDot = styled.div<{ isChecked: boolean }>`
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
  background-color: ${color.blue500};
  opacity: ${({ isChecked }) => (isChecked ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
`;

const RadioLabel = styled.span<{ disabled?: boolean }>`
  margin-left: 0.5rem;
  font-size: ${fontSize.base};
  color: ${({ disabled }) => (disabled ? color.gray500 : color.gray900)};
`;
