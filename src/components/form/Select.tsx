import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { color } from '@/styles/colors';
import { fontSize, fontWeight } from '@/styles/fonts';
import { KEYS } from '@/constants/keyboard';
import Icon from '@/components/ui/Icon';
import ChevronDownIcon from '@/assets/icons/chevron-down.svg';
import CheckIcon from '@/assets/icons/check.svg';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  id: string;
  options: SelectOption[];
  errorMessage?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const { ARROW_UP, ARROW_DOWN, ENTER, SPACE, ESCAPE } = KEYS;

export default function Select({
  label,
  id,
  options,
  errorMessage,
  required,
  placeholder,
  value,
  onChange,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const selectRef = useRef<HTMLDivElement>(null);
  const hasError = Boolean(errorMessage);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!isOpen) {
      if (
        event.key === ARROW_DOWN ||
        event.key === ENTER ||
        event.key === SPACE
      ) {
        event.preventDefault();
        setIsOpen(true);
        setHighlightedIndex(0);
      }
      return;
    }

    switch (event.key) {
      case ARROW_DOWN:
        event.preventDefault();
        setHighlightedIndex((prev) => Math.min(prev + 1, options.length - 1));
        break;
      case ARROW_UP:
        event.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case ENTER:
      case SPACE:
        event.preventDefault();
        const option = options[highlightedIndex];
        if (option) {
          onChange?.(option.value);
          setIsOpen(false);
        }
        break;
      case ESCAPE:
        setIsOpen(false);
        break;
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const displayValue = value
    ? options.find((opt) => opt.value === value)?.label
    : placeholder;

  return (
    <SelectFieldContainer ref={selectRef}>
      <Label htmlFor={id}>
        {label}
        {required && <RequiredAsterisk>*</RequiredAsterisk>}
      </Label>
      <TriggerButton
        id={id}
        type="button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        hasError={hasError}
      >
        {displayValue}
        <ChevronIconWrapper isOpen={isOpen}>
          <Icon as={ChevronDownIcon} size={20} color={color.gray600} />
        </ChevronIconWrapper>
      </TriggerButton>

      {isOpen && (
        <OptionList>
          {options.map((option, index) => (
            <OptionItem
              key={option.value}
              onClick={() => {
                onChange?.(option.value);
                setIsOpen(false);
              }}
              isSelected={value === option.value}
              highlighted={highlightedIndex === index}
            >
              {value === option.value && (
                <Icon as={CheckIcon} size={20} color={color.blue500} />
              )}
              <OptionText hasIcon={value === option.value}>
                {option.label}
              </OptionText>
            </OptionItem>
          ))}
        </OptionList>
      )}

      {hasError && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </SelectFieldContainer>
  );
}

const SelectFieldContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.medium};
  color: ${color.gray700};
  margin-bottom: 0.5rem;
`;

const RequiredAsterisk = styled.span`
  color: ${color.red500};
  margin-left: 0.25rem;
`;

const TriggerButton = styled.button<{ hasError: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border: 1px solid
    ${({ hasError }) => (hasError ? color.red500 : color.gray300)};
  border-radius: 0.5rem;
  font-size: ${fontSize.base};
  color: ${color.gray900};
  background-color: ${color.white};
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: ${({ hasError }) =>
      hasError ? color.red500 : color.blue500};
  }
`;

const ChevronIconWrapper = styled.div<{ isOpen: boolean }>`
  margin-left: 0.5rem;
  transition: transform 0.2s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  display: flex;
  align-items: center;
`;

const OptionList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: ${color.white};
  border: 1px solid ${color.gray300};
  border-radius: 0.5rem;
  margin-top: 0.25rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
`;

const OptionItem = styled.li<{ isSelected: boolean; highlighted?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  font-size: ${fontSize.base};
  color: ${color.gray900};
  cursor: pointer;
  background-color: ${({ isSelected, highlighted }) =>
    isSelected ? color.gray300 : highlighted ? color.gray100 : 'transparent'};

  &:hover {
    background-color: ${color.gray100};
  }
`;

const OptionText = styled.span<{ hasIcon: boolean }>`
  margin-left: ${({ hasIcon }) => (hasIcon ? '0.5rem' : '0')};
`;

const ErrorMessage = styled.p`
  font-size: ${fontSize.sm};
  color: ${color.red500};
  margin-top: 0.25rem;
`;
