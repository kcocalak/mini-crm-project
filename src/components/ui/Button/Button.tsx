import type { ButtonHTMLAttributes } from 'react';
import { FullWidthButton, StyledButton } from './Button.styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  onClick?: () => void;
  fullWidth?: boolean;
}

const Button = ({ variant = 'primary', fullWidth = false, ...props }: ButtonProps) => {
  return (
    fullWidth ? (
      <FullWidthButton {...props} variant={variant}>
        {props.children}
      </FullWidthButton>
    ) : (
      <StyledButton {...props} variant={variant}>
        {props.children}
      </StyledButton>
    )
  );
};

export default Button;
