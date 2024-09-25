import React, { useState, useMemo } from 'react';
import { Autocomplete, TextField, CircularProgress, IconButton, Box } from '@mui/material';
import debounce from 'lodash/debounce';
import axiosInstance from '@/config/axios';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const SearchAutocomplete = () => {
  // const [searchQuery, setSearchQuery] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchSuggestions = useMemo(
    () =>
      debounce(async (query: string) => {
        if (query.trim()) {
          setLoading(true);
          try {
            const response = await axiosInstance.get('/user/products/suggest', {
              params: { query },
            });
            setOptions(response.data); // Assuming response.data is an array of product names
          } catch (error) {
            console.error('Error fetching suggestions:', error);
          } finally {
            setLoading(false);
          }
        } else {
          setOptions([]);
        }
      }, 300), // debounce delay
    [],
  );

  const handleInputChange = (event: React.SyntheticEvent, value: string) => {
    fetchSuggestions(value);
  };

  const handleSelect = (event: React.SyntheticEvent, value: string | null) => {
    if (value) {
      navigate(`/products/list?query=${encodeURIComponent(value)}`);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f1f8fc',
        borderRadius: '20px',
        padding: '5px 15px',
        width: '50%',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <SearchIcon color="action" />
      <Autocomplete
        freeSolo
        options={options}
        loading={loading}
        onInputChange={handleInputChange}
        onChange={handleSelect}
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{ ml: 1, flex: 1, color: '#6e7a84' }}
            label="Search essentials, groceries, and more..."
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <IconButton type="submit" sx={{ p: 1 }}>
        <SearchIcon color="action" />
      </IconButton>
    </Box>
  );
};

export default SearchAutocomplete;
