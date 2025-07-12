import styled from "styled-components";

export const ToastContainer = styled.div<{ visible: boolean; type: string }>`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: ${({ type }) => {
    switch (type) {
      case 'success': return '#28a745';
      case 'error': return '#dc3545';
      case 'info': return '#17a2b8';
      default: return '#28a745';
    }
  }};
  color: white;
  padding: 12px 20px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  transform: ${({ visible }) => visible ? 'translateY(0)' : 'translateY(100%)'};
  opacity: ${({ visible }) => visible ? 1 : 0};
  transition: all 0.3s ease;
  max-width: 300px;
  font-size: 14px;
  font-weight: 500;
`;
