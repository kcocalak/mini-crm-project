import styled from 'styled-components';

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

export const SelectLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 2px;
`;

export const StyledSelect = styled.select<{ 'aria-invalid'?: boolean }>`
  padding: 8px 12px;
  border: 1px solid ${({ 'aria-invalid': isInvalid }) => isInvalid ? '#dc3545' : '#ddd'};
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  color: #333;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
  
  &:hover {
    border-color: ${({ 'aria-invalid': isInvalid }) => isInvalid ? '#dc3545' : '#007bff'};
  }
  
  option {
    padding: 8px;
    background-color: white;
    color: #333;
  }
  
  option:first-child {
    color: #999;
  }
`;

export const SelectError = styled.div`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  color: #dc3545;
  margin-top: 2px;
`;
