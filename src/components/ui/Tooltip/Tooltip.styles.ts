import styled from 'styled-components';

export const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const TooltipContent = styled.div<{
  isVisible: boolean;
  position: 'top' | 'bottom';
  left: number;
  top: number;
  width: number;
}>`
  position: fixed;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
  min-width: ${({ width }) => width}px;
  background: #333;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 1000;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  transition: opacity 0.2s ease, visibility 0.2s ease;
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    ${({ position }) =>
      position === 'top'
        ? `top: 100%; border-top-color: #333; border-bottom: none;`
        : `bottom: 100%; border-bottom-color: #333; border-top: none;`}
  }
`;

export const TruncatedText = styled.div<{ maxWidth?: string }>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: ${({ maxWidth }) => maxWidth || '100%'};
`;