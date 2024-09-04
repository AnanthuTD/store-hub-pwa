import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Card, CardContent, Typography, Box, Divider, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/system';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import 'swiper/css/navigation';

// Styled component for the container of the card slider
const CardContainer = styled(Box)({
  maxWidth: '100%',
  padding: '20px',
  marginBottom: '30px',
  backgroundColor: '#f0f4f8',
  borderRadius: '20px',
  position: 'relative',
  overflow: 'hidden',
});

// Styled component for individual product cards
const CustomCard = styled(Card)({
  maxWidth: 280,
  margin: '0 auto',
  textAlign: 'center',
  backgroundColor: '#ffffff',
  borderRadius: 15,
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
  },
});

// TypeScript interfaces for product and product collection
export interface Product {
  image: string;
  title: string;
  department: string;
  originalPrice: number;
  discountedPrice: number;
  rating: number;
}

export interface ProductCollection {
  [category: string]: {
    label: string;
    products: Product[];
  };
}

// Component to render individual product cards
const ProductCard = ({
  image,
  title,
  department,
  originalPrice,
  discountedPrice,
  rating,
}: Product) => (
  <CustomCard>
    <img src={image} alt={title} style={{ width: '100px', height: '100px', margin: '10px 0' }} />
    <CardContent>
      <Box textAlign="center" p={2}>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {department}
        </Typography>
        <Typography variant="body2" sx={{ textDecoration: 'line-through' }}>
          ${originalPrice}
        </Typography>
        <Typography variant="h6" color="primary">
          ${discountedPrice}
        </Typography>
        <Typography variant="body2" color="green">
          {rating}
        </Typography>
      </Box>
    </CardContent>
  </CustomCard>
);

// Function to create a list of products for a given category
function createProductsList(category: string): Product[] {
  return Array.from({ length: 10 }, () => ({
    image: '/product-1.png',
    title: 'Graphic Design',
    department: category,
    originalPrice: 16.4,
    discountedPrice: 6.4,
    rating: parseFloat((Math.random() * 10).toFixed(1)),
  }));
}

// Sample product collection data
const productCollection: ProductCollection = {
  men: {
    label: 'Men',
    products: createProductsList('Men'),
  },
  women: {
    label: 'Women',
    products: createProductsList('Women'),
  },
  kids: {
    label: 'Kids',
    products: createProductsList('Kids'),
  },
};

// Function to generate props for each tab
function productTabProps(key: string, label: string) {
  return {
    id: `product-tab-${key}`,
    'aria-controls': `simple-tabpanel-${key}`,
    label,
  };
}

// Main ShopSlider component
const ShopSlider = () => {
  // Refs and states
  const sliderRef = useRef<SwiperRef>(null);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [value, setValue] = useState<number>(0);
  const [categoryIndices, setCategoryIndices] = useState<{ [key: string]: number }>({});

  // Sync swiper slider with selected tab
  useEffect(() => {
    const selectedCategoryKey = Object.keys(productCollection)[value];
    const newIndex = categoryIndices[selectedCategoryKey] || 0;
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideTo(newIndex);
  }, [value, categoryIndices]);

  // Handle tab change
  const handleCategoryTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Handle previous slide
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  // Handle next slide
  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  // Handle slide change
  const handleSlideChange = useCallback(() => {
    if (!sliderRef.current) return;
    const swiper = sliderRef.current.swiper;
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);

    // Update category index state
    const selectedCategoryKey = Object.keys(productCollection)[value];
    setCategoryIndices((prevIndices) => ({
      ...prevIndices,
      [selectedCategoryKey]: swiper.activeIndex,
    }));
  }, [value]);

  // Get products for the selected category
  const selectedCategoryKey = Object.keys(productCollection)[value];
  const selectedProducts = productCollection[selectedCategoryKey]?.products || [];

  return (
    <CardContainer>
      <Box display={'flex'} justifyContent={'space-between'} padding={2}>
        <Typography variant="h5" fontWeight="bold" gutterBottom color={'#252B42'}>
          BESTSELLER PRODUCTS
        </Typography>
        <Tabs value={value} onChange={handleCategoryTabChange} aria-label="basic tabs example">
          {Object.keys(productCollection).map((key) => (
            <Tab key={key} {...productTabProps(key, productCollection[key].label)} />
          ))}
        </Tabs>
        <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
          <Box
            height={'40px'}
            width={'40px'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            borderRadius={'50%'}
            border={'1px solid'}
            onClick={handlePrev}
            component={'button'}
            disabled={isBeginning}
            style={{ cursor: isBeginning ? 'not-allowed' : 'pointer' }}
          >
            <ArrowBackIosNewIcon />
          </Box>
          <Box
            height={'40px'}
            width={'40px'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            borderRadius={'50%'}
            border={'1px solid'}
            onClick={handleNext}
            component={'button'}
            disabled={isEnd}
            style={{ cursor: isEnd ? 'not-allowed' : 'pointer' }}
          >
            <ArrowForwardIosIcon />
          </Box>
        </Box>
      </Box>
      <Divider />
      <Swiper
        ref={sliderRef}
        slidesPerView={4}
        spaceBetween={30}
        breakpoints={{
          1200: { slidesPerView: 4 },
          1024: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          480: { slidesPerView: 1 },
        }}
        style={{ paddingBlock: '15px' }}
        onSlideChange={handleSlideChange}
      >
        {selectedProducts.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </CardContainer>
  );
};

export default ShopSlider;
