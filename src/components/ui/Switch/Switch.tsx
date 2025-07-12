import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../constants/theme/theme';


interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  label?: string;
}


const SwitchContainer = styled.label<{ disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};
  user-select: none;
  gap: 8px;
  transition: opacity 0.2s ease;
`;

const SwitchTrack = styled.div<{ checked: boolean; size: string; disabled?: boolean }>`
  position: relative;
  width: ${props => {
    switch (props.size) {
      case 'small': return '32px';
      case 'large': return '56px';
      default: return '44px';
    }
  }};
  height: ${props => {
    switch (props.size) {
      case 'small': return '18px';
      case 'large': return '28px';
      default: return '22px';
    }
  }};
  background-color: ${props => props.checked ? theme.colors.secondary.main : '#ccc'};
  border-radius: 999px;
  transition: background-color 0.2s ease;
  opacity: ${props => props.disabled ? 0.6 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
`;

const SwitchThumb = styled.div<{ checked: boolean; size: string }>`
  position: absolute;
  top: 2px;
  left: ${props => props.checked ? 'calc(100% - 18px)' : '2px'};
  width: ${props => {
    switch (props.size) {
      case 'small': return '14px';
      case 'large': return '24px';
      default: return '18px';
    }
  }};
  height: ${props => {
    switch (props.size) {
      case 'small': return '14px';
      case 'large': return '24px';
      default: return '18px';
    }
  }};
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: left 0.2s ease;
`;

const SwitchLabel = styled.span<{ size: string; disabled?: boolean }>`
  font-size: ${props => {
    switch (props.size) {
      case 'small': return '12px';
      case 'large': return '16px';
      default: return '14px';
    }
  }};
  color: ${props => props.disabled ? '#999' : '#333'};
  transition: color 0.2s ease;
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  size = 'medium',
  label
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
      <SwitchTrack checked={checked} size={size} disabled={disabled}>
        <SwitchThumb checked={checked} size={size} />
      </SwitchTrack>
      {label && <SwitchLabel size={size} disabled={disabled}>{label}</SwitchLabel>}
    </SwitchContainer>
  );
}; 