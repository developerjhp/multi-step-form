import {
  useController,
  UseControllerProps,
  FieldValues,
} from 'react-hook-form';
import InputField, { type InputFieldProps } from '@/components/form/InputField';

import { formatNumber, parseNumber } from '@/utils/number';

type RHFCommaSeparatedInputProps<T extends FieldValues> = Omit<
  InputFieldProps,
  'value' | 'onChange' | 'onBlur' | 'name'
> &
  UseControllerProps<T>;

export default function RHFCommaSeparatedInput<T extends FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  ...props
}: RHFCommaSeparatedInputProps<T>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    if (/^[0-9,]*$/.test(rawValue)) {
      const numericValue = parseNumber(rawValue);
      onChange(numericValue === undefined ? undefined : numericValue);
    }
  };

  return (
    <InputField
      {...props}
      ref={ref}
      value={formatNumber(value)}
      onChange={handleChange}
      onBlur={onBlur}
      errorMessage={error?.message}
      type="text"
      inputMode="numeric"
    />
  );
}
