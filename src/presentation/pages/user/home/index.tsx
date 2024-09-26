import Carousel from '../components/Carousel';
import ShopSlider from '../components/ShopSlider';
import ProductGrid from '../components/ProductSlide';
import OfferSlider from '../components/OfferSlider';
import CouponSlider from '../components/CouponSlider';
import Footer from '../components/Footer';
import CategoryNavBar from '../components/CategoryNavBar';
import axiosInstance from '@/config/axios';
import { useEffect, useState } from 'react';
import getCurrentCoordinates from '@/infrastructure/utils/getCurrentCoordinates';

async function fetchNearbyShops() {
  try {
    // Attempt to get current coordinates
    let latitude, longitude;
    try {
      const coords = await getCurrentCoordinates();
      latitude = coords.latitude;
      longitude = coords.longitude;
    } catch (error) {
      console.warn('Unable to get coordinates, proceeding without location:', error);
    }

    // Make an API call to fetch nearby shops, with or without coordinates
    const { data } = await axiosInstance.get('/user/shops/nearby', {
      params: latitude && longitude ? { latitude, longitude } : {},
    });

    // Return the list of shops and city
    return { shops: data.shops, city: data.city };
  } catch (err) {
    // If there's an error, log it and return an empty array and null city
    console.error('Error fetching nearby shops:', err);
    return { shops: [], city: null };
  }
}

function Home() {
  const [shops, setShops] = useState([]);
  const [city, setCity] = useState('');

  useEffect(() => {
    fetchNearbyShops().then(({ shops, city }) => {
      setShops(shops);
      if (city) setCity(city);
    });
  }, []);

  return (
    <div>
      {/* Category NavBar */}
      <CategoryNavBar />
      <Carousel />
      <ShopSlider shops={shops} city={city} />
      <ProductGrid />
      <OfferSlider />
      <CouponSlider />
      <Footer />
    </div>
  );
}

export default Home;
