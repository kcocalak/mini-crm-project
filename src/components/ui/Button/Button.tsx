import type { ButtonHTMLAttributes } from 'react';
import { StyledButton } from './Button.styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  onClick: () => void;
}

const Button = ({ variant = 'primary', ...props }: ButtonProps) => {
  return (
    <StyledButton {...props} variant={variant}>
      {props.children}
    </StyledButton>
  );
};

export default Button;
