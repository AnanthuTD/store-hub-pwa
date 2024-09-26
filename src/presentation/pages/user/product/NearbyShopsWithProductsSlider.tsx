import { Box, Divider, styled, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import ShopCard from './ShopCard';
import { useCallback, useEffect, useRef, useState } from 'react';
import 'swiper/css/navigation';
import 'swiper/css';

const CardContainer = styled(Box)({
  maxWidth: '100%',
  padding: '20px',
  marginBottom: '30px',
  backgroundColor: '#f0f4f8', // Light background color for contrast
  borderRadius: '20px',
  position: 'relative',
  overflow: 'hidden',
});

const NearbyShopsWithProductsSlider = ({ shops, productName }) => {
  const sliderRef = useRef<SwiperRef>(null);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const handleSlideChange = useCallback(() => {
    if (!sliderRef.current) return;
    const swiper = sliderRef.current.swiper;
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  useEffect(() => {
    if (!sliderRef.current) return;
    const swiper = sliderRef.current.swiper;
    setIsEnd(swiper.isEnd);
  }, []);

  const calculateDistance = (distance: number) => {
    distance = Number(distance.toFixed(2));
    if (distance > 0 && distance <= 999) return `${distance} meters`;
    else if (distance >= 1000 && distance <= 99999) return `${(distance / 1000).toFixed(1)} KM`;
    else return 'you are here';
  };

  return (
    <CardContainer>
      <Box display={'flex'} justifyContent={'space-between'} padding={2}>
        <Typography variant="h5" fontWeight="bold" gutterBottom color={'#252B42'}>
          Nearby Shops for Product: {productName} {/* Display product ID or product name */}
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
        onSlideChange={handleSlideChange}
      >
        {shops.map((shop, index) => (
          <SwiperSlide key={index}>
            <ShopCard
              name={shop.name}
              rating={shop.rating}
              distance={calculateDistance(shop.distance)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </CardContainer>
  );
};

export default NearbyShopsWithProductsSlider;
