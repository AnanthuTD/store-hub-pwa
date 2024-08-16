import React from 'react';
import { TextField } from '@mui/material';

interface InputFieldProps {
  label: string;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder }) => {
  return (
    <TextField
      variant="outlined"
      label={label}
      placeholder={placeholder}
      fullWidth
      sx={{ my: 2, backgroundColor: '#FFF', borderRadius: 1 }}
    />
  );
};

export default InputField;
