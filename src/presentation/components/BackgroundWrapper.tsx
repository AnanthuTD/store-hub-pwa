import React from 'react';
import { Box } from '@mui/material';

interface BackgroundWrapperProps {
  children: React.ReactNode;
  backgroundImage?: string; // Path to your SVG file
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({
  children,
  backgroundImage = '/background.svg',
}) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  );
};

export default BackgroundWrapper;
