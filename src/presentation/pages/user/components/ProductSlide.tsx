import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Card, CardContent, Typography, Box, Divider, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/system';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import 'swiper/css/navigation';
import axiosInstance from '@/config/axios';
import { StarFilled } from '@ant-design/icons';

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
  width: 'fit-content',
  aspectRatio: '1/1',
});

// TypeScript interfaces for product and product collection
export interface Product {
  images: string[];
  name: string;
  variants: { averagePrice: number }[];
  rating: number;
  _id: string;
}

export interface ProductCollectionItem {
  category: string;
  products: Product[];
}

// Updated: Array of ProductCollectionItems
export type ProductCollection = ProductCollectionItem[];

// Component to render individual product cards
const ProductCard = ({ images, name, variants, rating, _id }: Product) => {
  return (
    <CustomCard onClick={() => window.open(`/product?productId=${_id}`)}>
      {/* Image */}
      <img
        src={images[0]}
        alt={name}
        style={{ width: '100px', height: '100px', margin: '10px 0' }}
      />

      {/* Card Content */}
      <CardContent>
        <Box textAlign="center" p={2}>
          {/* Product Name - Limit to 1 line and use ellipsis for overflow */}
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              maxWidth: '100%', // Ensure it takes the full width of the card
              whiteSpace: 'nowrap', // Prevents the text from wrapping to the next line
              overflow: 'hidden', // Hides overflowed text
              textOverflow: 'ellipsis', // Adds ellipsis for text overflow
            }}
          >
            {name}
          </Typography>

          {/* Product Price */}
          {variants[0].discountedPrice ? (
            <Box>
              <Typography variant="body2">${variants[0].discountedPrice}</Typography>
              <Typography
                variant="body2"
                sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
              >
                ${variants[0].price}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body2">${variants[0].price}</Typography>
          )}

          {/* Product Rating */}
          <Typography variant="body2" color="green">
            {rating} <StarFilled />
          </Typography>
        </Box>
      </CardContent>
    </CustomCard>
  );
};

// Function to generate props for each tab
function productTabProps(label: string) {
  return {
    id: `product-tab-${label}`,
    'aria-controls': `simple-tabpanel-${label}`,
    label,
  };
}

// Main ShopSlider component
const ProductSlider = () => {
  // Refs and states
  const sliderRef = useRef<SwiperRef>(null);
  const [productCollection, setProductCollection] = useState<ProductCollection>([]);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [value, setValue] = useState<number>(0);
  const [categoryIndices, setCategoryIndices] = useState<{ [key: number]: number }>({}); // Track indices by array position

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/user/products/popular-by-random-categories/v2'); // Adjust endpoint as necessary
        const fetchedProducts: ProductCollection = response.data; // Adjust data structure if needed
        setProductCollection(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Handle error state if necessary
      }
    };

    fetchProducts();
  }, []);

  // Sync swiper slider with selected tab
  useEffect(() => {
    const newIndex = categoryIndices[value] || 0;
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
    setCategoryIndices((prevIndices) => ({
      ...prevIndices,
      [value]: swiper.activeIndex,
    }));
  }, [value]);

  // Get products for the selected category
  const selectedProducts = productCollection[value]?.products || [];

  return (
    <CardContainer>
      <Box display={'flex'} justifyContent={'space-between'} padding={2}>
        <Typography variant="h5" fontWeight="bold" gutterBottom color={'#252B42'}>
          POPULAR PRODUCTS
        </Typography>
        <Tabs value={value} onChange={handleCategoryTabChange} aria-label="basic tabs example">
          {productCollection.map(({ category }) => (
            <Tab key={category} {...productTabProps(category)} />
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

export default ProductSlider;
