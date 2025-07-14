import React, { useState, useRef, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { TooltipContainer, TooltipContent, TruncatedText } from './Tooltip.styles';

interface TooltipProps {
    content: string;
    children: React.ReactNode;
    maxWidth?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, maxWidth }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('top');
  const [coords, setCoords] = useState({ left: 0, top: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (isVisible && containerRef.current && tooltipRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      let top = containerRect.top - tooltipRect.height - 8;
      let pos: 'top' | 'bottom' = 'top';
      if (top < 0) {
        top = containerRect.bottom + 8;
        pos = 'bottom';
      }
      setPosition(pos);
      setCoords({
        left: containerRect.left + containerRect.width / 2 - tooltipRect.width / 2,
        top,
        width: containerRect.width,
      });
    }
  }, [isVisible]);

  return (
    <TooltipContainer
      ref={containerRef}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <TruncatedText maxWidth={maxWidth}>
        {children}
      </TruncatedText>
      {isVisible && typeof window !== 'undefined'
        ? ReactDOM.createPortal(
            <TooltipContent
              ref={tooltipRef}
              isVisible={isVisible}
              position={position}
              left={coords.left}
              top={coords.top}
              width={coords.width}
            >
              {content}
            </TooltipContent>,
            document.body
          )
        : null}
    </TooltipContainer>
  );
};

export default Tooltip; 