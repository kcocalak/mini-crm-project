import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
  overflow: auto;
  margin: ${({ theme }) => theme.spacing(3)} 0;
  max-height: 700px;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.colors.divider};

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
  border-collapse: collapse;
  min-width: 800px;
  background: ${({ theme }) => theme.colors.background.paper};
  table-layout: fixed;
`;

export const TableHeaderRow = styled.tr`
  background: ${({ theme }) => theme.colors.background.default};
  border-bottom: 2px solid ${({ theme }) => theme.colors.divider};

`;

export const TableHeaderCell = styled.th<{ sortable?: boolean }>`
  padding: 10px 16px;
  text-align: left;
  font-weight: 700;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.neutral};
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  white-space: nowrap;
  cursor: ${({ sortable }) => (sortable ? 'pointer' : 'default')};
  transition: background-color 0.2s ease;
  width: 25%;

  &:hover {
    background-color: ${({ theme, sortable }) =>
      sortable ? theme.colors.action.hover : 'transparent'};
  }

  &.table-header-cell--actions {
    width: 120px;
  }
`;

export const TableHeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const TableSortIndicator = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  transition: background-color 0.2s ease;
  height: 50px;
  align-items:center;
  flex:1;
  width:100%;
  

  &:hover {
    background-color: ${({ theme }) => theme.colors.action.hover};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td`
  padding: 0 16px;
  color: ${({ theme }) => theme.colors.text.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  width: 25%;
  font-size:0.875rem;
  font-weight:400;

  &.table-cell--actions {
    width: 120px;
  }
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
