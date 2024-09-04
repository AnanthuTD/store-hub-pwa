import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Box, Button, Typography } from '@mui/material';
import SwiperCore from 'swiper';

SwiperCore.use([Autoplay, Pagination]);

const carouselData = [
  {
    title: 'GROCERIES DELIVERY',
    description: 'Find the Nearest Stores with Your Desired Products',
    buttonText: 'Start Now',
    image: '/carousel.png',
  },
  {
    title: 'FRESH PRODUCTS',
    description: 'Get Fresh Products Delivered at Your Doorstep',
    buttonText: 'Order Now',
    image: '/carousel.png',
  },
];

const Carousel = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={30}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
    >
      {carouselData.map((item, index) => (
        <SwiperSlide key={index}>
          <Box
            sx={{
              height: '500px',
              background: `url(${item.image}) center center/cover no-repeat`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              textAlign: 'center',
              color: '#fff',
              padding: '20px',
            }}
          >
            <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
              {item.title}
            </Typography>
            <Typography variant="body1" sx={{ margin: '20px 0' }}>
              {item.description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{
                bgcolor: '#0071e3',
                borderRadius: '20px',
                padding: '10px 20px',
              }}
            >
              {item.buttonText}
            </Button>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
