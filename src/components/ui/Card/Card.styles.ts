import styled from 'styled-components';

export const CardContainer = styled.div`
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  flex-shrink: 0;
`;

export const UserName = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #212529;
`;

export const ActiveBadge = styled.span<{ active: boolean }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${({ active }) => (active ? '#d4edda' : '#f8d7da')};
  color: ${({ active }) => (active ? '#155724' : '#721c24')};
  flex-shrink: 0;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-height: 0;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

export const Label = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #6c757d;
  min-width: 60px;
  flex-shrink: 0;
`;

export const Value = styled.span`
  font-size: 14px;
  color: #495057;
  word-break: break-word;
  line-height: 1.4;
  flex: 1;
`;

export const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e9ecef;
  flex-shrink: 0;
`;