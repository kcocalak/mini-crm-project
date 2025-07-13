import styled from "styled-components";

export const StyledBadge = styled.span<{ active: boolean }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${({ active }) => (active ? '#d4edda' : '#f8d7da')};
  color: ${({ active }) => (active ? '#155724' : '#721c24')};
  flex-shrink: 0;
  display: inline-block;
`;