import React from 'react';
import { Button } from '@mui/material';

interface SubmitButtonProps {
  text: string;
  onClick?: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, onClick }) => {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{ backgroundColor: '#FF6464', color: '#FFF', borderRadius: 4 }}
      onClick={onClick}
      size="large"
    >
      {text}
    </Button>
  );
};

export default SubmitButton;
