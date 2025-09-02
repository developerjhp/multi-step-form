import { type InputHTMLAttributes, forwardRef } from 'react';
import styled from '@emotion/styled';
import { color } from '@/styles/colors';
import { fontSize, fontWeight } from '@/styles/fonts';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  errorMessage?: string;
  required?: boolean;
}

export default forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    {
      label,
      id,
      type = 'text',
      placeholder,
      value,
      onChange,
      errorMessage,
      required,
      ...props
    },
    ref,
  ) {
    const hasError = Boolean(errorMessage);

    return (
      <InputFieldContainer>
        <Label htmlFor={id}>
          {label}
          {required && <RequiredAsterisk>*</RequiredAsterisk>}
        </Label>
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          hasError={hasError}
          {...props}
          ref={ref}
        />
        {hasError && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </InputFieldContainer>
    );
  },
);

const InputFieldContainer = styled.div`
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

const Input = styled.input<{ hasError: boolean }>`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: ${fontSize.base};
  color: ${color.gray900};
  outline: none;
  transition: border-color 0.2s ease-in-out;
  border: 1px solid
    ${({ hasError }) => (hasError ? color.red500 : color.gray300)};

  &:focus {
    border-color: ${({ hasError }) =>
      hasError ? color.red500 : color.blue500};
  }

  &::placeholder {
    color: ${color.gray400};
  }
`;

const ErrorMessage = styled.p`
  font-size: ${fontSize.sm};
  color: ${color.red500};
  margin-top: 0.25rem;
`;
