import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Box, Button, Typography } from '@mui/material';
import SwiperCore from 'swiper';
import { useEffect, useState } from 'react';
import axiosInstance from '@/config/axios';
import { message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Banner {
  _id: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  link?: string;
  startDate: string;
  endDate: string;
  buttonText: string;
}

SwiperCore.use([Autoplay, Pagination]);

const Carousel = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axiosInstance.get<Banner[]>('/user/banners');
      setBanners(response.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        message.error(
          e.response?.data?.message || 'Failed to fetch banner! Please try again after some time.',
        );
      } else message.error('Failed to fetch banners');
    }
  };

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={30}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
    >
      {banners.map((item, index) => (
        <SwiperSlide key={index}>
          <Box
            sx={{
              height: '500px',
              background: `url(${item.imageUrl}) center center/cover no-repeat`,
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
              {item.subtitle}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{
                bgcolor: '#0071e3',
                borderRadius: '20px',
                padding: '10px 20px',
              }}
              onClick={() => navigate(item.link)}
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
