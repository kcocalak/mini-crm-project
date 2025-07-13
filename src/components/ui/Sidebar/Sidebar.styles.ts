import styled from 'styled-components';

export interface SidebarProps {
  isOpen?: boolean;
}

export const SidebarContainer = styled.div<SidebarProps>`
width: 250px;
height: 100vh;
background: ${({ theme }) => theme.colors.primary.main};
color: white;
position: fixed;
left: 0;
top: 0;
z-index: 1000;
box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
transition: transform 0.3s ease;
transform: ${({ isOpen }) => (isOpen === false ? 'translateX(-100%)' : 'translateX(0)')};
`;

export const SidebarHeader = styled.div`
padding: 20px;
border-bottom: 1px solid #333;
background:rgba(197, 221, 246, 0.42);
`;

export const Logo = styled.h1`
margin: 0;
font-size: 18px;
font-weight: 600;
color: #fff;
display: flex;
align-items: center;
gap: 8px;
backgroundColor:#fff
`;

export const LogoIcon = styled.span`
font-size: 20px;
color: #fff;
`;

export const SidebarContent = styled.div`
padding: 20px 0;
`;

export const MenuList = styled.ul`
list-style: none;
margin: 0;
padding: 0;
`;

export const MenuItem = styled.li<{ isActive: boolean }>`
margin: 0;
padding: 0;
`;

export const MenuLink = styled.a<{ isActive: boolean }>`
display: flex;
align-items: center;
gap: 12px;
padding: 12px 20px;
color: ${({ isActive }) => (isActive ? '#ccc' : '#fff')};
text-decoration: none;
font-size: 14px;
font-weight: ${({ isActive }) => (isActive ? '500' : '400')};
border-left: 3px solid ${({ isActive }) => (isActive ? '#007bff' : 'transparent')};
transition: all 0.2s ease;
cursor: pointer;

&:hover {
  background: ${({ isActive }) => (isActive ? 'rgba(0, 123, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)')};
  color: ${({ isActive }) => (isActive ? '#fff' : '#ccc')};
  text-decoration: none;
}
`;

export const MenuIcon = styled.span`
font-size: 16px;
width: 20px;
text-align: center;
`;

export const IconWrapper = styled.div<{ isActive: boolean }>`
width: 20px;
height: 20px;
display: flex;
align-items: center;
justify-content: center;
color: ${({ isActive }) => (isActive ? '#ccc' : '#fff')};
transition: color 0.2s ease;

&:hover {
color: ${({ isActive }) => (isActive ? 'red' : '#ccc')};

}
`;