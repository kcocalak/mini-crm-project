import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { UsersIcon } from '../Icons';
import { IconWrapper, Logo, MenuIcon, MenuItem, MenuLink, MenuList, SidebarContainer, SidebarContent, SidebarHeader, type SidebarProps } from './Sidebar.styles'



interface MenuItemType {
  label: string;
  path: string;
  icon: string;
}

const menuItems: MenuItemType[] = [
  {
    label: 'Users',
    path: '/',
    icon: 'users',
  },

];

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const renderIcon = (icon: string, isActive: boolean) => {
    if (icon === 'users') {
      return (
        <IconWrapper isActive={isActive}>
          <UsersIcon />
        </IconWrapper>
      );
    }
    return <MenuIcon>{icon}</MenuIcon>;
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarHeader>
        <Logo>
            <img src="https://evreka.co/wp-content/themes/evreka-theme/assets/img/logo/evreka-logo.svg" width="163" height="28" />
        </Logo>
      </SidebarHeader>
      
      <SidebarContent>
        <MenuList>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <MenuItem key={item.path} isActive={isActive}>
                <MenuLink
                  isActive={isActive}
                  onClick={() => handleMenuClick(item.path)}
                >
                  {renderIcon(item.icon, isActive)}
                  {item.label}
                </MenuLink>
              </MenuItem>
            );
          })}
        </MenuList>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar; 