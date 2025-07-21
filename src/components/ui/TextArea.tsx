import styled from '@emotion/styled';
import { color } from '@/styles/colors';
import { fontSize } from '@/styles/fonts';
import { ComponentProps, forwardRef } from 'react';

interface TextAreaProps extends ComponentProps<'textarea'> {
  hasError?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ hasError, ...props }, ref) => {
    return <StyledTextArea ref={ref} hasError={hasError} {...props} />;
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;

const StyledTextArea = styled.textarea<{ hasError?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid
    ${({ hasError }) => (hasError ? color.red500 : color.gray300)};
  border-radius: 0.375rem;
  font-size: ${fontSize.sm};
  line-height: 1.5;
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: none;
    border-color: ${({ hasError }) =>
      hasError ? color.red500 : color.blue500};
    box-shadow: 0 0 0 1px
      ${({ hasError }) => (hasError ? color.red500 : color.blue500)};
  }

  &::placeholder {
    color: ${color.gray400};
  }

  &:disabled {
    background-color: ${color.gray50};
    color: ${color.gray400};
    cursor: not-allowed;
  }
`;
