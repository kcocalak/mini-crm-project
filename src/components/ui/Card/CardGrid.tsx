import React from 'react';
import styled from 'styled-components';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import Card from './Card';
import type { User } from '../../../constants/types/User';

interface CardGridProps {
  data: User[];
  onViewClick: (user: User) => void;
}

const GridContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 8px 16px;
  box-sizing: border-box;
`;

const CARD_WIDTH = 320;
const CARD_HEIGHT = 230;
const CARD_GAP = 24;

const CardGrid: React.FC<CardGridProps> = ({ data, onViewClick }) => {
  return (
    <GridContainer>
      <AutoSizer>
        {({ height, width }) => {
          const availableWidth = width - 32; 
          const columnCount = Math.max(1, Math.floor(availableWidth / (CARD_WIDTH + CARD_GAP)));
          const rowCount = Math.ceil(data.length / columnCount);
          
          const Cell = ({ columnIndex, rowIndex, style }: { columnIndex: number; rowIndex: number; style: React.CSSProperties }) => {
            const userIndex = rowIndex * columnCount + columnIndex;
            const user = data[userIndex];

            if (!user) return null;

            return (
              <div style={{
                ...style,
                padding: CARD_GAP / 2,
                boxSizing: 'border-box'
              }}>
                <Card user={user} onViewClick={onViewClick} />
              </div>
            );
          };
          
          return (
            <Grid
              columnCount={columnCount}
              columnWidth={CARD_WIDTH + CARD_GAP}
              height={height - 32}
              rowCount={rowCount}
              rowHeight={CARD_HEIGHT + CARD_GAP}
              width={width - 32}
            >
              {Cell}
            </Grid>
          );
        }}
      </AutoSizer>
    </GridContainer>
  );
};

export default CardGrid; 