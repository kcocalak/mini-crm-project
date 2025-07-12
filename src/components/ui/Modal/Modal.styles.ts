import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: 32px 24px;
  min-width: 340px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  position: relative;
`;

export const ModalTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 18px;
  font-size: 1.3rem;
  font-weight: 600;
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
`;

export const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.error.main};
  font-size: ${({ theme }) => theme.colors.error.main};
`;
export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  margin-top: 16px;
`;

export const SubmitBtn = styled.button`
  width: 100%;
  padding: 10px 0;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: none;
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.primary.contrastText};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.18s;
  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
  &:disabled {
    background: ${({ theme }) => theme.colors.background.disabled};
    color: ${({ theme }) => theme.colors.text.disabled};
    cursor: not-allowed;
  }
`;
