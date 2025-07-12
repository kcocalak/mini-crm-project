import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline';

interface ButtonProps {
  variant?: ButtonVariant;
}

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.contrastText};
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary.dark};
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.secondary.main};
    color: ${({ theme }) => theme.colors.secondary.contrastText};
    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary.dark};
    }
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.error.main};
    color: ${({ theme }) => theme.colors.white};
    &:hover {
      background-color: ${({ theme }) => theme.colors.error.dark};
    }
  `,
  outline: css`
          background: transparent;
          color: ${({theme})=>theme.colors.primary.main};
          border: 1px solid ${({theme})=>theme.colors.primary.main};
          &:hover:enabled {
            background: ${({theme})=>theme.colors.primary.light};
            color: ${({theme})=>theme.colors.white};
          }
        `
};

export const StyledButton = styled.button<ButtonProps>`
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.button.fontSize};
  font-weight: ${({ theme }) => theme.typography.button.fontWeight};
  line-height: ${({ theme }) => theme.typography.button.lineHeight};
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    scale: 1.02;
    opacity: 0.9;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background.disabled};
    color: ${({ theme }) => theme.colors.text.disabled};
    cursor: not-allowed;

    &:hover {
      scale: 1;
      opacity: 1;
      background-color: ${({ theme }) => theme.colors.background.disabled};
    }
  }

  ${({ variant = 'primary' }) => variantStyles[variant]}
`;

export const FullWidthButton = styled(StyledButton)`
  width: 100%;
`;
