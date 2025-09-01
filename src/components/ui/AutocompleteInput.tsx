import React, { useState, useRef, useEffect, forwardRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { color } from '@/styles/colors';
import { fontSize, fontWeight } from '@/styles/fonts';
import { spacing } from '@/styles/spacing';
import { borderRadius } from '@/styles/border-radius';
import { shadow } from '@/styles/shadow';

export interface AutocompleteOption {
  value: string;
  label: string;
  data?: unknown;
}

interface AutocompleteInputProps {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (option: AutocompleteOption) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  options: AutocompleteOption[];
  isLoading?: boolean;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  renderOption?: (option: AutocompleteOption) => React.ReactNode;
  noOptionsMessage?: string;
  loadingMessage?: string;
}

const AutocompleteInput = forwardRef<HTMLInputElement, AutocompleteInputProps>(
  (
    {
      id,
      name,
      label,
      placeholder,
      value = '',
      onChange,
      onSelect,
      onFocus,
      onBlur,
      options = [],
      isLoading = false,
      error,
      required = false,
      disabled = false,
      renderOption,
      noOptionsMessage = '검색 결과가 없습니다',
      loadingMessage = '검색 중...',
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState(value);
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          wrapperRef.current &&
          event.target instanceof Node &&
          !wrapperRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      onChange?.(newValue);
      setIsOpen(true);
      setHighlightedIndex(-1);
    };

    const handleOptionSelect = (option: AutocompleteOption) => {
      setInputValue(option.label);
      onSelect?.(option);
      setIsOpen(false);
      setHighlightedIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (isOpen === false && (e.key === 'ArrowDown' || e.key === 'Enter')) {
        setIsOpen(true);
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : prev,
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < options.length) {
            handleOptionSelect(options[highlightedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
      }
    };

    useEffect(() => {
      if (highlightedIndex >= 0 && listRef.current) {
        const highlightedElement = listRef.current.children[
          highlightedIndex
        ] as HTMLElement;
        if (highlightedElement) {
          highlightedElement.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth',
          });
        }
      }
    }, [highlightedIndex]);

    const showDropdown =
      isOpen && (options.length > 0 || isLoading || inputValue.length > 0);

    return (
      <Container ref={wrapperRef}>
        {label && (
          <Label htmlFor={id}>
            {label}
            {required && <Required>*</Required>}
          </Label>
        )}

        <InputWrapper>
          <Input
            ref={ref}
            id={id}
            name={name}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setIsOpen(true);
              onFocus?.();
            }}
            onBlur={() => {
              setTimeout(() => {
                onBlur?.();
              }, 100);
            }}
            placeholder={placeholder}
            disabled={disabled}
            hasError={error !== undefined && error !== null && error !== ''}
            aria-expanded={showDropdown}
            aria-autocomplete="list"
            aria-controls={`${id}-listbox`}
            aria-activedescendant={
              highlightedIndex >= 0
                ? `${id}-option-${highlightedIndex}`
                : undefined
            }
            autoComplete="off"
          />

          {showDropdown === true && (
            <Dropdown>
              <DropdownList
                ref={listRef}
                id={`${id}-listbox`}
                role="listbox"
                aria-label={`${label} 자동완성 옵션`}
              >
                {isLoading ? (
                  <LoadingItem>{loadingMessage}</LoadingItem>
                ) : options.length === 0 ? (
                  <NoOptionsItem>{noOptionsMessage}</NoOptionsItem>
                ) : (
                  options.map((option, index) => (
                    <DropdownItem
                      key={option.value}
                      id={`${id}-option-${index}`}
                      role="option"
                      aria-selected={index === highlightedIndex}
                      isHighlighted={index === highlightedIndex}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleOptionSelect(option);
                      }}
                      onMouseEnter={() => setHighlightedIndex(index)}
                    >
                      {renderOption ? renderOption(option) : option.label}
                    </DropdownItem>
                  ))
                )}
              </DropdownList>
            </Dropdown>
          )}
        </InputWrapper>

        {error !== undefined && error !== null && error !== '' && (
          <ErrorMessage>{error}</ErrorMessage>
        )}
      </Container>
    );
  },
);

AutocompleteInput.displayName = 'AutocompleteInput';

export default AutocompleteInput;

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${spacing['2']};
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.medium};
  color: ${color.gray700};
`;

const Required = styled.span`
  color: ${color.red500};
  margin-left: 2px;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: ${spacing['3']} ${spacing['4']};
  font-size: ${fontSize.base};
  border: 1px solid ${color.gray300};
  border-radius: ${borderRadius.md};
  background-color: ${color.white};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${color.gray400};
  }

  &:focus {
    outline: none;
    border-color: ${color.blue500};
    box-shadow: 0 0 0 3px ${color.blue100};
  }

  &:disabled {
    background-color: ${color.gray50};
    color: ${color.gray500};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${color.gray400};
  }

  ${({ hasError }) =>
    hasError &&
    css`
      border-color: ${color.red500};

      &:focus {
        border-color: ${color.red500};
        box-shadow: 0 0 0 3px ${color.red100};
      }
    `}
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: ${spacing['2']};
  background: ${color.white};
  border: 1px solid ${color.gray200};
  border-radius: ${borderRadius.md};
  box-shadow: ${shadow.lg};
  z-index: 1000;
  max-height: 300px;
  overflow: hidden;
`;

const DropdownList = styled.ul`
  list-style: none;
  margin: 0;
  padding: ${spacing['2']} 0;
  max-height: 300px;
  overflow-y: auto;
`;

const DropdownItem = styled.li<{ isHighlighted: boolean }>`
  padding: ${spacing['3']} ${spacing['4']};
  cursor: pointer;
  transition: background-color 0.1s ease;

  ${({ isHighlighted }) =>
    isHighlighted &&
    css`
      background-color: ${color.gray50};
    `}

  &:hover {
    background-color: ${color.gray50};
  }

  &:active {
    background-color: ${color.gray100};
  }
`;

const LoadingItem = styled.li`
  padding: ${spacing['4']};
  text-align: center;
  color: ${color.gray500};
  font-size: ${fontSize.sm};
`;

const NoOptionsItem = styled.li`
  padding: ${spacing['4']};
  text-align: center;
  color: ${color.gray500};
  font-size: ${fontSize.sm};
`;

const ErrorMessage = styled.span`
  display: block;
  margin-top: ${spacing['2']};
  font-size: ${fontSize.sm};
  color: ${color.red500};
`;
