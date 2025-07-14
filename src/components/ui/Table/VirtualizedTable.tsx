import React from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import styled from 'styled-components';
import Button from '../Button';

export interface Column<T> {
  key: keyof T;
  header: string;
  width?: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface VirtualizedTableProps<T> {
  data: T[];
  columns: Column<T>[];
  height: string;
  rowHeight?: number;
  actions?: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: (row: T) => void;
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
    disabled?: (row: T) => boolean;
  }>;
  emptyMessage?: string;
}

const ROW_HEIGHT = 50;
const MIN_TABLE_WIDTH = 800;


const VirtualizedHeaderRow = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.background.default};
  border-bottom: 2px solid ${({ theme }) => theme.colors.divider};
  width: calc(100%-20px);
  min-width: ${MIN_TABLE_WIDTH}px;
  flex-shrink: 0;
  padding-right: 16px;
`;

const VirtualizedRow = styled.div<{ isEven?: boolean }>`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  transition: background-color 0.2s ease;
  min-width: ${MIN_TABLE_WIDTH}px;
  background: ${({ theme }) => 
    theme.colors.background.paper };

  &:hover {
    background-color: ${({ theme }) => theme.colors.action.hover};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const VirtualizedCell = styled.div<{ width?: string }>`
  flex: ${({ width }) => (width ? 'none' : '1')};
  width: ${({ width }) => width || 'auto'};
  min-width: 0;
  overflow: hidden;
  display:flex;
  align-items:center;
`;

const VirtualizedTh = styled.div`
  padding: 10px 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.neutral};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  

`;

const VirtualizedTd = styled.div`
  padding: 10px 16px;
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
`;

const VirtualizedTable = <T extends object>({
  data,
  columns,
  height,
  rowHeight = ROW_HEIGHT,
  actions = [],
  emptyMessage = 'No data found',
}: VirtualizedTableProps<T>) => {
  if (data.length === 0) {
    return (
      <div style={{
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #ddd',
        borderRadius: '8px',
        background: '#fff',
        color: '#888',
        fontSize: 18,
      }}>
        {emptyMessage}
      </div>
    );
  }

  const VirtualizedBody = ({ height, width }: { height: number; width: number }) => {
    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const row = data[index];
      const isEven = index % 2 === 0;

      return (
        <VirtualizedRow style={style} isEven={isEven}>
          {columns.map((column) => (
            <VirtualizedCell key={String(column.key)} width={column.width}>
              <VirtualizedTd>
                {column.render
                  ? column.render((row as any)[column.key], row)
                  : String((row as any)[column.key] ?? '')}
              </VirtualizedTd>
            </VirtualizedCell>
          ))}
          {actions.length > 0 && (
            <VirtualizedCell width="120px">
              <VirtualizedTd>
                <ActionsContainer>
                  {actions.map((action, actionIndex) => {
                    const isDisabled = action.disabled?.(row) || false;
                    return (
                      <Button
                        key={actionIndex}
                        onClick={() => !isDisabled && action.onClick(row)}
                        disabled={isDisabled}
                        variant={action.variant}
                      >
                        {action.icon}
                        {action.label}
                      </Button>
                    );
                  })}
                </ActionsContainer>
              </VirtualizedTd>
            </VirtualizedCell>
          )}
        </VirtualizedRow>
      );
    };

    return (
      <List
        height={height}
        width={Math.max(width, MIN_TABLE_WIDTH)}
        itemCount={data.length}
        itemSize={rowHeight}
        overscanCount={5}
      >
        {Row}
      </List>
    );
  };

  return (
    <div style={{ 
      height: height, 
      border: '1px solid #ddd', 
      borderRadius: '8px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <VirtualizedHeaderRow>
        {columns.map((column) => (
          <VirtualizedCell key={String(column.key)} width={column.width}>
            <VirtualizedTh>{column.header}</VirtualizedTh>
          </VirtualizedCell>
        ))}
        {actions.length > 0 && (
          <VirtualizedCell width="120px" >
            <VirtualizedTh>Actions</VirtualizedTh>
          </VirtualizedCell>
        )}
      </VirtualizedHeaderRow>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <AutoSizer>
          {({ height, width }) => <VirtualizedBody height={height} width={width} />}
        </AutoSizer>
      </div>
    </div>
  );
};

export default VirtualizedTable; 