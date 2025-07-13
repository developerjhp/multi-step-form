import React from 'react';
import styled from '@emotion/styled';
import { color } from '@/styles/colors';
import { fontSize, fontWeight } from '@/styles/fonts';

interface StepperProps {
  steps: string[];
  currentStepIndex: number;
}

export default function Stepper({ steps, currentStepIndex }: StepperProps) {
  return (
    <StepperContainer>
      {steps.map((step, index) => (
        <StepItem key={step} isActive={index === currentStepIndex}>
          <StepNumber isActive={index === currentStepIndex}>
            {index + 1}
          </StepNumber>
          <StepLabel isActive={index === currentStepIndex}>{step}</StepLabel>
        </StepItem>
      ))}
    </StepperContainer>
  );
}

const StepperContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: ${color.gray50};
  border-radius: 0.5rem;
`;

const StepItem = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: ${({ isActive }) => (isActive ? 'default' : 'pointer')};
  opacity: ${({ isActive }) => (isActive ? 1 : 0.6)};
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

const StepNumber = styled.div<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${({ isActive }) =>
    isActive ? color.blue500 : color.gray300};
  color: ${color.white};
  font-size: ${fontSize.base};
  font-weight: ${fontWeight.bold};
  margin-bottom: 0.5rem;
  transition: background-color 0.2s ease-in-out;
`;

const StepLabel = styled.span<{ isActive: boolean }>`
  font-size: ${fontSize.sm};
  font-weight: ${({ isActive }) =>
    isActive ? fontWeight.semiBold : fontWeight.medium};
  color: ${({ isActive }) => (isActive ? color.blue700 : color.gray700)};
  text-align: center;
  transition: color 0.2s ease-in-out;
`;
