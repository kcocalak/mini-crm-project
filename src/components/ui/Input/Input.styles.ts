import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

export const InputLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 500;
  margin-bottom: 2px;
`;

export const StyledInput = styled.input`
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  background: ${({ theme }) => theme.colors.background.paper};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.light};
    outline: none;
  }

  &[aria-invalid='true'] {
    border-color: ${({ theme }) => theme.colors.error.main};
  }
`;

export const InputError = styled.span`
  color: ${({ theme }) => theme.colors.error.main};
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  margin-top: 2px;
`;
