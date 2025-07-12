import React from 'react';
import { CheckboxContainer, HiddenCheckbox, Label, StyledCheckbox } from './Checkbox.styles';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  id,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(event.target.checked);
    }
  };

  const handleCheckboxClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <CheckboxContainer $disabled={disabled}>
      <HiddenCheckbox
        id={checkboxId}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <StyledCheckbox 
        $checked={checked} 
        $disabled={disabled}
        onClick={handleCheckboxClick}
      />
      {label && (
        <Label htmlFor={checkboxId} $disabled={disabled}>
          {label}
        </Label>
      )}
    </CheckboxContainer>
  );
};

export default Checkbox; 