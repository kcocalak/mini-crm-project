import React from 'react';
import {
  TableContainer,
  StyledTable,
  TableHeaderRow,
  TableHeaderCell,
  TableHeaderContent,
  TableSortIndicator,
  TableBody,
  TableRow,
  TableCell,
  TableEmptyMessage,
  TableActions,
  TableLoading,
  TableSpinner,
  TableLoadingText,
} from './Table.styles';
import Button from '../Button';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

export interface TableAction {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: any) => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  disabled?: (row: any) => boolean;
}

export interface TableProps {
  columns: TableColumn[];
  data: any[];
  actions?: TableAction[];
  loading?: boolean;
  emptyMessage?: string;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  className?: string;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  actions = [],
  loading = false,
  emptyMessage = 'No data found',
  onSort,
  className = '',
}) => {
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';

    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });
    onSort?.(key, direction);
  };

  const renderCell = (column: TableColumn, row: any) => {
    const value = row[column.key];

    if (column.render) {
      return column.render(value, row);
    }

    return value;
  };

  if (loading) {
    return (
      <TableLoading>
        <TableSpinner />
        <TableLoadingText>Loading...</TableLoadingText>
      </TableLoading>
    );
  }

  return (
    <TableContainer className={className}>
      <StyledTable>
        <thead>
          <TableHeaderRow>
            {columns.map((column) => (
              <TableHeaderCell
                key={column.key}
                sortable={column.sortable}
                style={{ width: column.width }}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <TableHeaderContent>
                  {column.label}
                  {column.sortable && (
                    <TableSortIndicator>
                      {sortConfig?.key === column.key
                        ? sortConfig.direction === 'asc'
                          ? '↑'
                          : '↓'
                        : '↕'}
                    </TableSortIndicator>
                  )}
                </TableHeaderContent>
              </TableHeaderCell>
            ))}
            {actions.length > 0 && (
              <TableHeaderCell className="table-header-cell--actions"> </TableHeaderCell>
            )}
          </TableHeaderRow>
        </thead>
        <TableBody>
          {data.length === 0 ? (
            <tr>
              <TableEmptyMessage colSpan={columns.length + (actions.length > 0 ? 1 : 0)}>
                {emptyMessage}
              </TableEmptyMessage>
            </tr>
          ) : (
            data.map((row, index) => (
              <TableRow key={row.id || index}>
                {columns.map((column) => (
                  <TableCell key={column.key}>{renderCell(column, row)}</TableCell>
                ))}
                {actions.length > 0 && (
                  <TableCell className="table-cell--actions">
                    <TableActions>
                      {actions.map((action, actionIndex) => {
                        const isDisabled = action.disabled?.(row) || false;
                        return (
                            <Button key={actionIndex}
                            onClick={() => !isDisabled && action.onClick(row)}
                            variant={action.variant}
                            disabled={isDisabled}>
                              {action.icon}
                              {action.label}
                            </Button>
                        );
                      })}
                    </TableActions>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};

export default Table;
