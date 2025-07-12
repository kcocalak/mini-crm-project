import styled from 'styled-components';
export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
`;

export const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PaginationButton = styled.button<{ active?: boolean }>`
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: none;
  background: ${({ active, theme }) =>
    active ? theme.colors.primary.main : theme.colors.background.paper};
  color: ${({ active, theme }) =>
    active ? theme.colors.primary.contrastText : theme.colors.text.primary};
  font-weight: ${({ active }) => (active ? 600 : 400)};
  cursor: pointer;
  transition:
    background 0.18s,
    color 0.18s;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary.light};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PageSizeSelect = styled.select`
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  background: ${({ theme }) => theme.colors.background.paper};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  cursor: pointer;
`;
