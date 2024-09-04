import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const categories = [
  'Groceries',
  'Premium Fruits',
  'Home & Kitchen',
  'Fashion',
  'Electronics',
  'Beauty',
  'Home Improvement',
  'Sports, Toys & Luggage',
];

function CategoryNavBar() {
  const [selectedCategory, setSelectedCategory] = useState('Groceries');

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <Box display={'flex'} justifyContent={'space-around'}>
      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', padding: '10px 0', bgcolor: '#fff' }}>
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => handleCategoryClick(category)}
            endIcon={<ExpandMoreIcon />}
            sx={{
              textTransform: 'none',
              borderRadius: '20px',
              padding: '5px 15px',
              fontWeight: 'semi-bold',
              color: selectedCategory === category ? '#fff' : '#000',
              bgcolor: selectedCategory === category ? '#008ECC' : '#f1f8fc',
              '&:hover': {
                bgcolor: selectedCategory === category ? '#005bb5' : '#e8f4fc',
              },
            }}
          >
            {category}
          </Button>
        ))}
      </Box>
    </Box>
  );
}

export default CategoryNavBar;
