import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeIcon from '@mui/icons-material/InvertColors';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import { FlexBox } from '@/presentation/components/styled';
// import useTheme from '@/store/theme';

interface HeaderProps {
  variant: 'signin' | 'signup';
}

const Header: React.FC<HeaderProps> = ({ variant }) => {
  // const [theme, themeActions] = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    if (variant === 'signin') {
      navigate('/signin');
    } else if (variant === 'signup') {
      navigate('/signup');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }} data-pw={`theme-${'light'}`}>
      <AppBar color="transparent" elevation={1} position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <FlexBox sx={{ alignItems: 'center' }}>
            <IconButton size="medium" edge="start" color="info" aria-label="menu" sx={{ mr: 1 }}>
              <LogoDevIcon />
            </IconButton>
          </FlexBox>
          <FlexBox>
            <Divider orientation="vertical" flexItem />
            <Button variant="outlined" size="small" color="inherit" onClick={handleClick}>
              {variant === 'signin' ? 'Sign in' : 'Sign up'}
            </Button>
            <Divider orientation="vertical" flexItem />
            <Tooltip title="Switch theme" arrow>
              <IconButton
                color="info"
                edge="end"
                size="medium"
                // onClick={themeActions.toggle}
                data-pw="theme-toggle"
              >
                <ThemeIcon />
              </IconButton>
            </Tooltip>
          </FlexBox>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
