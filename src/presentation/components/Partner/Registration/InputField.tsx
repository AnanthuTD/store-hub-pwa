import React, { ChangeEvent } from 'react';
import { TextField } from '@mui/material';

interface InputFieldProps {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, onChange }) => {
  return (
    <TextField
      variant="outlined"
      label={label}
      placeholder={placeholder}
      fullWidth
      sx={{ my: 2, backgroundColor: '#FFF', borderRadius: 1 }}
      onChange={onChange}
    />
  );
};

export default InputField;
