import React from 'react';
import { AppBar } from '@mui/material';
import TopBar from './TopBar';
import MainHeader from './MainHeader';

const Header = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      {/* Top Bar Component */}
      <TopBar />
      {/* Main Header Component */}
      <MainHeader />
    </AppBar>
  );
};

export default Header;
