import Carousel from '../components/Carousel';
import ShopSlider from '../components/ShopSlider';
import ProductGrid from '../components/ProductSlide';
import OfferSlider from '../components/OfferSlider';
import CouponSlider from '../components/CouponSlider';
import Footer from '../components/Footer';
import CategoryNavBar from '../components/CategoryNavBar';

const shops = Array.from({ length: 10 }, (_, index) => ({
  name: `Shop ${index + 1}`,
  location: 'Aluva',
  rating: (4.5 + Math.random() * 0.5).toFixed(1),
  distance: (Math.random() * 10).toFixed(1), // Distance between 0.0 and 10.0 KM
}));

function Home() {
  return (
    <div>
      {/* Category NavBar */}
      <CategoryNavBar />
      <Carousel />
      <ShopSlider shops={shops} />
      <ProductGrid />
      <OfferSlider />
      <CouponSlider />
      <Footer />
    </div>
  );
}

export default Home;
