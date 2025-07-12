import styled, { css } from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  ${({ theme }) => theme.spacing(3)};
  margin: ${({ theme }) => theme.spacing(2)} 0;
  max-height: 700px;
  overflow-y: auto;

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    background: #bbbbbb;
    border-radius: 7px;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: transparent;
  min-width: 700px;
`;

export const TableHeaderRow = styled.tr``;

export const TableHeaderCell = styled.th<{ sortable?: boolean }>`
  position: sticky;
  top: 0;
  z-index: 2;
  padding: 10px 16px;
  text-align: left;
  font-weight: 400;
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  background: ${({ theme }) => theme.colors.background.default};
  color: ${({ theme }) => theme.colors.text.neutral};
  user-select: none;
  cursor: ${({ sortable }) => (sortable ? 'pointer' : 'default')};
  letter-spacing: 0.02em;
  transition: background 0.2s;

  &:hover {
    background: ${({ sortable, theme }) =>
      sortable ? theme.colors.action.hover : theme.colors.background.default};
  }

  &.table-header-cell--actions {
    text-align: center;
    width: 120px;
  }
`;

export const TableHeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const TableSortIndicator = styled.span`
  font-size: 1.1rem;
  margin-left: 4px;
  color: ${({ theme }) => theme.colors.primary.main};
  opacity: 0.7;
`;

export const TableBody = styled.tbody`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

export const TableRow = styled.tr`
  transition: background 0.18s;
  &:hover {
    background: ${({ theme }) => theme.colors.action.hover};
  }
  &.table-cell--actions {
    text-align: center;
  }
  &:first-child td:first-child {
    border-top-left-radius: 12px;
  }
  &:first-child td:last-child {
    border-top-right-radius: 12px;
  }
  &:last-child td:first-child {
    border-bottom-left-radius: 12px;
  }
  &:last-child td:last-child {
    border-bottom-right-radius: 12px;
  }
`;

export const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(1)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  vertical-align: middle;
`;

export const TableEmptyMessage = styled.td`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.disabled};
  padding: ${({ theme }) => theme.spacing(4)};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  background: ${({ theme }) => theme.colors.background.paper};
`;

export const TableActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  justify-content: center;
`;

const actionBtnBase = css`
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.button.fontSize};
  font-weight: ${({ theme }) => theme.typography.button.fontWeight};
  line-height: ${({ theme }) => theme.typography.button.lineHeight};
  padding: 6px 14px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: none;
  cursor: pointer;
  transition:
    background 0.18s,
    color 0.18s,
    box-shadow 0.18s,
    opacity 0.18s;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  outline: none;

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.light};
  }
`;

export const TableActionBtn = styled.button<{ variant?: string; disabled?: boolean }>`
  ${actionBtnBase}
  ${({ variant = 'secondary', theme }) => {
    switch (variant) {
      case 'primary':
        return css`
          background: ${theme.colors.primary.main};
          color: ${theme.colors.primary.contrastText};
          &:hover:enabled {
            background: ${theme.colors.primary.dark};
          }
        `;
      case 'danger':
        return css`
          background: ${theme.colors.error.main};
          color: ${theme.colors.error.contrastText};
          &:hover:enabled {
            background: ${theme.colors.error.dark};
          }
        `;
      case 'outline':
        return css`
          background: transparent;
          color: ${theme.colors.primary.main};
          border: 1px solid ${theme.colors.primary.main};
          &:hover:enabled {
            background: ${theme.colors.primary.light};
            color: ${theme.colors.white};
          }
        `;
      default:
        return css`
          background: ${theme.colors.secondary.main};
          color: ${theme.colors.secondary.contrastText};
          &:hover:enabled {
            background: ${theme.colors.secondary.dark};
          }
        `;
    }
  }}

  &:disabled,
  &.table-action-btn--disabled {
    background: ${({ theme }) => theme.colors.background.disabled};
    color: ${({ theme }) => theme.colors.text.disabled};
    cursor: not-allowed;
    opacity: 0.7;
    box-shadow: none;
  }
`;

export const TableLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(6)};
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

export const TableSpinner = styled.div`
  border: 4px solid ${({ theme }) => theme.colors.divider};
  border-top: 4px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 1s linear infinite;
  margin-bottom: ${({ theme }) => theme.spacing(2)};

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const TableLoadingText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
`;
