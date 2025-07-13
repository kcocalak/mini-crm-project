import React from 'react';
import { HiddenInput, SwitchContainer, SwitchLabel, SwitchThumb, SwitchTrack } from './Switch.styles';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  label?: string;
  leftLabel?: string;
  rightLabel?: string;
}



export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  size = 'medium',
  label,
  leftLabel,
  rightLabel
}) => {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <SwitchContainer disabled={disabled}>
      <HiddenInput
        type="checkbox"
        checked={checked}
        onChange={handleToggle}
        disabled={disabled}
      />
      {leftLabel && <SwitchLabel size={size} disabled={disabled} active={!checked}>{leftLabel}</SwitchLabel>}
      <SwitchTrack checked={checked} size={size} disabled={disabled}>
        <SwitchThumb checked={checked} size={size} />
      </SwitchTrack>
      {rightLabel && <SwitchLabel size={size} disabled={disabled} active={checked}>{rightLabel}</SwitchLabel>}
      {label && !leftLabel && !rightLabel && <SwitchLabel size={size} disabled={disabled}>{label}</SwitchLabel>}
    </SwitchContainer>
  );
}; 