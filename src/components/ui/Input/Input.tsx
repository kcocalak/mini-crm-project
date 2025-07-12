import React from 'react';
import { StyledInput, InputWrapper, InputLabel, InputError } from './Input.styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <InputWrapper>
      {label && <InputLabel>{label}</InputLabel>}
      <StyledInput {...props} aria-invalid={!!error} />
      {error && <InputError>{error}</InputError>}
    </InputWrapper>
  );
};

export default Input;
