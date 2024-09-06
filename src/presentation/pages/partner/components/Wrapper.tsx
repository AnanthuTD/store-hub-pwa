import React from 'react';
import { Box } from '@mui/material';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#f9f9f9',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#f9f9f9',
          overflow: 'hidden',
          width: 390,
          height: 931,
          position: 'relative',
          borderRadius: '30px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Wrapper;
