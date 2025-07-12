import styled from 'styled-components';

interface CheckboxContainerProps {
  $disabled?: boolean;
}

interface StyledCheckboxProps {
  $checked: boolean;
  $disabled?: boolean;
}

interface LabelProps {
  $disabled?: boolean;
}

export const CheckboxContainer = styled.div<CheckboxContainerProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  padding: 4px 0;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
`;

export const StyledCheckbox = styled.div<StyledCheckboxProps>`
  width: 20px;
  height: 20px;
  border: 2px solid ${({ $checked, $disabled }) => {
    if ($disabled) return '#ccc';
    return $checked ? '#007bff' : '#ddd';
  }};
  border-radius: 4px;
  background: ${({ $checked, $disabled }) => {
    if ($disabled) return '#f5f5f5';
    return $checked ? '#007bff' : '#fff';
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    border-color: ${({ $checked, $disabled }) => {
      if ($disabled) return '#ccc';
      return $checked ? '#0056b3' : '#007bff';
    }};
  }

  ${({ $checked }) =>
    $checked &&
    `
    &::after {
      content: '';
      width: 6px;
      height: 10px;
      border: 2px solid #fff;
      border-top: none;
      border-left: none;
      transform: rotate(45deg) translate(-1px, -1px);
      transition: transform 0.2s ease;
    }
  `}
`;

export const Label = styled.label<LabelProps>`
  font-size: 14px;
  color: ${({ $disabled }) =>
    $disabled ? '#999' : '#333'};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
  font-weight: 500;
`; 