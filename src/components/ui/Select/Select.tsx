import React from 'react';
import { SelectContainer, StyledSelect, SelectLabel, SelectError } from './Select.styles';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({ 
  label, 
  error, 
  options, 
  placeholder = "Select an option",
  ...props 
}) => {
  return (
    <SelectContainer>
      {label && <SelectLabel>{label}</SelectLabel>}
      <StyledSelect {...props} aria-invalid={!!error}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      {error && <SelectError>{error}</SelectError>}
    </SelectContainer>
  );
};

export default Select;