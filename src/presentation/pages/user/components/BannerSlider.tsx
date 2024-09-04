import { useCallback, useRef, useState } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Card, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Divider from '@mui/material/Divider';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

// Container for the whole card slider
const CardContainer = styled(Box)({
  maxWidth: '100%',
  padding: '20px',
  marginBottom: '30px',
  backgroundColor: '#f0f4f8', // Light background color for contrast
  borderRadius: '20px',
  position: 'relative',
  overflow: 'hidden',
});

// Custom card component with styles
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
export interface Item {
  image: string;
  alt: string;
  href: string;
}

// Component to render individual product cards
const ProductCard = ({ image, alt, href }: Item) => (
  <Link to={href}>
    <CustomCard>
      <img src={image} alt={alt} style={{ width: '100%', height: '100%' }} />
    </CustomCard>
  </Link>
);

const BannerSlider = ({ items }: { items: Item[] }) => {
  const sliderRef = useRef<SwiperRef>(null);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);

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

  // Update button state when slide changes
  const handleSlideChange = useCallback(() => {
    if (!sliderRef.current) return;
    const swiper = sliderRef.current.swiper;
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  return (
    <CardContainer>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} padding={2}>
        <Typography variant="h5" fontWeight="bold" gutterBottom color={'#252B42'}>
          TOP SHOP CHAINS IN ERNAKULAM
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          {/* View All Button */}
          <Button variant="outlined" color="primary" component={Link} to="/view-all">
            View All
          </Button>
          {/* Previous and Next Buttons */}
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
        onSlideChange={handleSlideChange} // Listen to slide change
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <ProductCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </CardContainer>
  );
};

export default BannerSlider;
