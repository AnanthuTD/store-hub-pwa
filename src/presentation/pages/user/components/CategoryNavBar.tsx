import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Popper, Fade } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import axiosInstance from '@/config/axios';

interface Category {
  _id: string;
  name: string;
}

function CategoryNavBar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [childCategories, setChildCategories] = useState<Category[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // For the floating box

  useEffect(() => {
    // Fetch parent categories from an API
    const fetchCategories = async () => {
      try {
        const { data } = await axiosInstance.get('/user/categories/parent'); // Replace with your API URL
        setCategories(data.categories || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryHover = async (event: React.MouseEvent<HTMLElement>, category: Category) => {
    setSelectedCategory(category);
    console.log(event.currentTarget);

    setAnchorEl(event.currentTarget);

    // Fetch child categories when a parent category is hovered
    try {
      const { data } = await axiosInstance.get(`/user/categories/${category._id}/childs`);
      setChildCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching child categories:', error);
    }
  };

  const handleChildCategoryClick = (childCategoryId: string) => {
    // Open product listing page for the selected child category
    window.open(`/products/list?categoryId=${childCategoryId}`, '_blank');
  };

  const handleMouseLeave = () => {
    console.log('mouse left :(');

    setAnchorEl(null); // Hide the floating box when mouse leaves the area
  };

  return (
    <Box>
      {/* Parent Category Swiper */}
      {categories.length > 0 ? (
        <Swiper
          spaceBetween={10}
          slidesPerView={6}
          navigation={false}
          breakpoints={{
            1024: {
              slidesPerView: 6,
            },
            768: {
              slidesPerView: 4,
            },
            640: {
              slidesPerView: 2,
            },
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category._id}>
              <Button
                key={'button' + category._id}
                onMouseEnter={(event) => handleCategoryHover(event, category)}
                // onMouseLeave={handleMouseLeave}
                endIcon={<ExpandMoreIcon />}
                sx={{
                  textTransform: 'none',
                  borderRadius: '20px',
                  padding: '5px 15px',
                  fontWeight: 'semi-bold',
                  color: selectedCategory?._id === category._id ? '#fff' : '#000',
                  bgcolor: selectedCategory?._id === category._id ? '#008ECC' : '#f1f8fc',
                  '&:hover': {
                    bgcolor: selectedCategory?._id === category._id ? '#005bb5' : '#e8f4fc',
                  },
                }}
              >
                {category.name}
              </Button>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Box>Loading categories...</Box>
      )}

      {/* Floating Box for Child Categories */}
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement="bottom-end"
        transition
        onMouseLeave={handleMouseLeave} // Hide the floating box on mouse leave
        style={{ zIndex: 2 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={200}>
            <Box
              sx={{
                bgcolor: '#fff',
                boxShadow: 1,
                borderRadius: '5px',
                padding: '10px',
                mt: 1,
                minWidth: '200px',
                zIndex: 1300, // Higher z-index to make sure it floats over content
              }}
            >
              {childCategories.length > 0 ? (
                <Box display="flex" flexDirection="column" gap={1}>
                  {childCategories.map((childCategory) => (
                    <Button
                      key={childCategory._id}
                      onClick={() => handleChildCategoryClick(childCategory._id)}
                      sx={{
                        textTransform: 'none',
                        padding: '8px',
                        fontWeight: 'semi-bold',
                        color: '#000',
                        justifyContent: 'flex-start',
                        '&:hover': {
                          bgcolor: '#f1f8fc',
                        },
                      }}
                    >
                      {childCategory.name}
                    </Button>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2">No subcategories available</Typography>
              )}
            </Box>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}

export default CategoryNavBar;
