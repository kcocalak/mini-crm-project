import styled from 'styled-components';

export const SwitchContainer = styled.label<{ disabled?: boolean }>`
display: inline-flex;
align-items: center;
cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
opacity: ${props => props.disabled ? 0.6 : 1};
user-select: none;
gap: 8px;
transition: opacity 0.2s ease;
`;

export const SwitchTrack = styled.div<{ checked: boolean; size: string; disabled?: boolean }>`
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
background-color: ${props => props.checked ? ({theme})=>theme.colors.secondary.main : '#ccc'};
border-radius: 999px;
transition: background-color 0.2s ease;
opacity: ${props => props.disabled ? 0.6 : 1};
pointer-events: ${props => props.disabled ? 'none' : 'auto'};
`;

export const SwitchThumb = styled.div<{ checked: boolean; size: string }>`
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

export const SwitchLabel = styled.span<{ size: string; disabled?: boolean; active?: boolean }>`
font-size: ${props => {
  switch (props.size) {
    case 'small': return '12px';
    case 'large': return '16px';
    default: return '14px';
  }
}};
color: ${(props) => {
  if (props.disabled) return '#999';
  if (props.active) return ({theme})=>theme.colors.secondary.main;
  return '#666';
}};
font-weight: ${props => props.active ? '500' : '500'};
font-size: 14px;
transition: color 0.2s ease;
`;

export const HiddenInput = styled.input`
position: absolute;
opacity: 0;
width: 0;
height: 0;
`;