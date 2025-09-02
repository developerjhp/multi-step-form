import { useFormContext, Controller } from 'react-hook-form';
import { RadioGroup, RadioItem } from '@/components/form/Radio';
import Alert from '@/components/ui/Alert';
import Icon from '@/components/ui/Icon';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { type BookFormSchema } from '@/utils/schema';
import { BOOK_FORM_STEPS } from '@/constants/form';
import { color } from '@/styles/colors';
import { fontSize, fontWeight } from '@/styles/fonts';
import AlertTriangleIcon from '@/assets/icons/alert-triangle.svg';

const PRIVACY_OPTIONS = {
  PUBLIC: 'true',
  PRIVATE: 'false',
} as const;

export default function PublicStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext<BookFormSchema>();

  const hasErrors = BOOK_FORM_STEPS.PUBLIC.fields.some(
    (field) => errors[field],
  );

  return (
    <Container>
      {hasErrors && (
        <Alert
          variant="error"
          title="입력 정보를 확인해주세요"
          description="공개 설정을 선택해주세요."
          icon={<Icon as={AlertTriangleIcon} size={20} />}
        />
      )}

      <SectionHeader>
        <SectionTitle>독서 기록을 공개하시겠습니까?</SectionTitle>
        <SectionDescription>
          공개로 설정하면 다른 사용자들이 회원님의 독서 기록을 볼 수 있습니다.
          언제든지 설정에서 변경할 수 있습니다.
        </SectionDescription>
      </SectionHeader>

      <FormSection>
        <Controller
          name="isPublic"
          control={control}
          render={({ field }) => (
            <RadioGroup
              name="isPublic"
              value={
                field.value ? PRIVACY_OPTIONS.PUBLIC : PRIVACY_OPTIONS.PRIVATE
              }
              onChange={(value) =>
                field.onChange(value === PRIVACY_OPTIONS.PUBLIC)
              }
              direction="column"
              errorMessage={errors.isPublic?.message}
            >
              <OptionContainer
                variant="public"
                onClick={() => field.onChange(true)}
              >
                <RadioItem value={PRIVACY_OPTIONS.PUBLIC} label="" />
                <OptionContent>
                  <OptionTitle>공개</OptionTitle>
                  <OptionDescription>
                    다른 사용자들이 내 독서 기록을 볼 수 있습니다. 독서
                    커뮤니티에서 책에 대한 의견을 나누고 소통할 수 있습니다.
                  </OptionDescription>
                </OptionContent>
              </OptionContainer>

              <OptionContainer
                variant="private"
                onClick={() => field.onChange(false)}
              >
                <RadioItem value={PRIVACY_OPTIONS.PRIVATE} label="" />
                <OptionContent>
                  <OptionTitle>비공개</OptionTitle>
                  <OptionDescription>
                    내 독서 기록을 나만 볼 수 있습니다. 개인적인 독서 관리
                    목적으로만 사용됩니다.
                  </OptionDescription>
                </OptionContent>
              </OptionContainer>
            </RadioGroup>
          )}
        />
      </FormSection>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionHeader = styled.div`
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: ${fontSize.xl};
  font-weight: ${fontWeight.bold};
  color: ${color.gray900};
  margin: 0 0 1rem 0;
`;

const SectionDescription = styled.p`
  font-size: ${fontSize.base};
  color: ${color.gray600};
  margin: 0;
  line-height: 1.6;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const optionStyles = {
  public: {
    backgroundColor: color.green50,
    borderColor: color.green200,
    hoverBorderColor: color.green300,
    hoverBackgroundColor: color.green100,
  },
  private: {
    backgroundColor: color.gray50,
    borderColor: color.gray200,
    hoverBorderColor: color.gray300,
    hoverBackgroundColor: color.gray100,
  },
};

const OptionContainer = styled.div<{ variant: 'public' | 'private' }>`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  border: 2px solid;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  width: 100%;
  flex-grow: 1;
  min-height: 120px;

  ${({ variant }) => css`
    background-color: ${optionStyles[variant].backgroundColor};
    border-color: ${optionStyles[variant].borderColor};

    &:hover {
      border-color: ${optionStyles[variant].hoverBorderColor};
      background-color: ${optionStyles[variant].hoverBackgroundColor};
    }
  `}
`;

const OptionContent = styled.div`
  flex: 1;
`;

const OptionTitle = styled.h3`
  font-size: ${fontSize.lg};
  font-weight: ${fontWeight.semiBold};
  color: ${color.gray900};
  margin: 0 0 0.5rem 0;
`;

const OptionDescription = styled.p`
  font-size: ${fontSize.sm};
  color: ${color.gray600};
  margin: 0;
  line-height: 1.5;
`;
