import React from 'react';
import { Button } from '@mui/material';

interface SubmitButtonProps {
  onClick: () => void;
  label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, label }) => {
  return (
    <Button variant="contained" color="slateBlue" fullWidth onClick={onClick}>
      {label}
    </Button>
  );
};

export default SubmitButton;
