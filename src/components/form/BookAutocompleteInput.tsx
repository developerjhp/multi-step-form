import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import AutocompleteInput, {
  AutocompleteOption,
} from '@/components/ui/AutocompleteInput';
import { useBookAutocomplete } from '@/hooks/useBookAutocomplete';
import type { Book } from '@/types/book';
import { BookFormSchema } from '@/utils/schema';

interface BookAutocompleteInputProps {
  name: keyof BookFormSchema;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function BookAutocompleteInput({
  name,
  label = '도서명',
  placeholder = '도서명을 검색하거나 직접 입력해주세요',
  required,
  disabled,
}: BookAutocompleteInputProps) {
  const {
    control,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useFormContext<BookFormSchema>();
  const [isFocused, setIsFocused] = useState(false);

  const currentValue = watch(name);
  const searchQuery = typeof currentValue === 'string' ? currentValue : '';

  const shouldShowAllBooks = isFocused && !searchQuery.trim();

  const { data: books = [], isLoading } = useBookAutocomplete(
    searchQuery,
    shouldShowAllBooks,
  );

  const updateFormWithBookData = (book: Book) => {
    const formData = {
      title: book.title,
      author: book.authors.join(', '),
      publishedDate: book.publishedDate || '',
      totalPages: book.pageCount || 0,
    };
    const currentValues = getValues();

    reset(
      {
        ...currentValues,
        ...formData,
      },
      {
        keepDirty: false,
        keepErrors: false,
      },
    );
  };

  const options: AutocompleteOption[] = books.map((book) => ({
    value: book.id,
    label: book.title,
    data: book,
  }));

  const handleSelect = (option: AutocompleteOption) => {
    if (option.data) {
      updateFormWithBookData(option.data as Book);
    }
  };

  const renderOption = (option: AutocompleteOption) => {
    if (!option.data) {
      return option.label;
    }

    const book = option.data as Book;
    const publishYear = book.publishedDate
      ? new Date(book.publishedDate).getFullYear()
      : null;

    return (
      <div style={{ padding: '8px 0' }}>
        <div style={{ fontWeight: 500, marginBottom: '4px' }}>{book.title}</div>
        <div
          style={{
            fontSize: '14px',
            color: '#6b7280',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>{book.authors.join(', ')}</span>
          {book.publisher && (
            <>
              <span style={{ color: '#9ca3af' }}>•</span>
              <span>{book.publisher}</span>
            </>
          )}
          {publishYear && (
            <>
              <span style={{ color: '#9ca3af' }}>•</span>
              <span>{publishYear}</span>
            </>
          )}
          {book.pageCount && (
            <>
              <span style={{ color: '#9ca3af' }}>•</span>
              <span>{book.pageCount}쪽</span>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <AutocompleteInput
          ref={field.ref}
          id={name}
          name={name}
          label={label}
          placeholder={placeholder}
          value={typeof field.value === 'string' ? field.value : ''}
          onChange={field.onChange}
          onSelect={handleSelect}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          options={options}
          isLoading={isLoading}
          error={errors[name]?.message}
          required={required}
          disabled={disabled}
          renderOption={renderOption}
          noOptionsMessage="검색 결과가 없습니다. 직접 입력해주세요."
          loadingMessage="도서 정보를 검색하고 있습니다..."
        />
      )}
    />
  );
}
