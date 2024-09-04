import React, { useCallback, useRef, useState } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Card, CardContent, Typography, Box, Rating } from '@mui/material';
import { styled } from '@mui/system';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Divider from '@mui/material/Divider';
import 'swiper/css/navigation';

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

// Custom Typography for the shop name
const ShopName = styled(Typography)({
  fontWeight: 'bold',
  marginTop: '10px',
  fontSize: '18px',
  color: '#29384E',
});

// Custom Typography for the location
const LocationText = styled(Typography)({
  color: '#8B8B8B',
  fontSize: '14px',
  marginBottom: '5px',
});

// Custom ShopCard component
const ShopCard = ({ name, location, rating, distance }) => {
  return (
    <CustomCard>
      <StorefrontIcon style={{ fontSize: 80, color: '#0071e3', margin: '10px 0' }} />
      <CardContent>
        <ShopName>{name}</ShopName>
        <LocationText>{location}</LocationText>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Rating name="read-only" value={rating} readOnly precision={0.5} />
          <Typography style={{ marginLeft: '8px' }}>{rating}</Typography>
        </Box>
        <Typography color="primary" style={{ marginTop: '5px', fontWeight: 'bold' }}>
          {distance} KM
        </Typography>
      </CardContent>
    </CustomCard>
  );
};

const ShopSlider = ({ shops }) => {
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
      <Box display={'flex'} justifyContent={'space-between'} padding={2}>
        <Typography variant="h5" fontWeight="bold" gutterBottom color={'#252B42'}>
          TOP SHOP CHAINS IN ERNAKULAM
        </Typography>
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
        onSlideChange={handleSlideChange} // Listen to slide change
        // onReachBeginning={() => {setIsBeginning(true)}} // When at the beginning
        // onReachEnd={() => setIsEnd(true)} // When at the end
        /* onFromEdge={() => {
          setIsBeginning(false);
          setIsEnd(false);
        }} */ // When not at the edge
      >
        {shops.map((shop, index) => (
          <SwiperSlide key={index}>
            <ShopCard
              name={shop.name}
              location={shop.location}
              rating={shop.rating}
              distance={shop.distance}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </CardContainer>
  );
};

export default ShopSlider;
