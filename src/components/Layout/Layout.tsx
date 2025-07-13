import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../ui/Sidebar';
import { LayoutContainer, MainContent } from './Layout.styles';


const Layout: React.FC = () => {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout; 