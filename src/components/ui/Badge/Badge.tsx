import { StyledBadge } from './Badge.styles';

interface BadgeProps {
  active: boolean;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ active, children }) => {
  return (
    <StyledBadge active={active}>
      {children}
    </StyledBadge>
  );
};

export default Badge; 