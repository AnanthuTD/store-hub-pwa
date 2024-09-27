import React, { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import NearbyShopsWithProductsSlider from './NearbyShopsWithProductsSlider';
import { Box, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import ProductDescription from './components/ProductDescription';
import Footer from '../components/Footer';
import { useSearchParams } from 'react-router-dom';
import useProductDetails from './hooks/useProductDetails';
import useNearbyShopsWithProduct from './hooks/useNearbyShopsWithProduct';

function Index() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId');

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [selectedDistance, setSelectedDistance] = useState<number>(10000); // Default to 10 km (10000 meters)

  const {
    shops,
    loading: shopsLoading,
    error: shopsError,
    fetchNearbyShops,
  } = useNearbyShopsWithProduct();

  const { loading: productLoading, product, error: productError } = useProductDetails(productId);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setGeoError(null);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setGeoError('Location access denied. Please enable it in your browser settings.');
            break;
          case error.POSITION_UNAVAILABLE:
            setGeoError('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setGeoError('The request to get your location timed out.');
            break;
          default:
            setGeoError('An unknown error occurred.');
        }
      },
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (product && product.productId) {
      fetchNearbyShops(latitude || '', longitude || '', product?.productId, selectedDistance); // Pass selectedDistance
    }
  }, [latitude, longitude, product, selectedDistance, fetchNearbyShops]);

  if (!productId) {
    return <h2>Product not found</h2>;
  }

  if (productLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (productError) {
    return <Typography color="error">Error loading product details: {productError}</Typography>;
  }

  if (!product) {
    return <Typography>No product found</Typography>;
  }

  return (
    <>
      {/* Product Card */}
      <ProductCard product={product} />

      <Box marginInline={10}>
        {/* Additional info like description, review, etc... */}
        <ProductDescription product={product} />

        {/* Distance Selection */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="distance-select-label">Select Distance</InputLabel>
          <Select
            labelId="distance-select-label"
            value={selectedDistance}
            onChange={(e) => setSelectedDistance(e.target.value as unknown as number)}
          >
            <MenuItem value={5000}>5 km</MenuItem>
            <MenuItem value={10000}>10 km</MenuItem>
            <MenuItem value={20000}>20 km</MenuItem>
          </Select>
        </FormControl>

        {geoError ? (
          <Box textAlign="center" mt={4}>
            <Typography color="error">{geoError}</Typography>
            <Button variant="contained" onClick={getLocation} style={{ marginTop: '15px' }}>
              Retry Location Access
            </Button>
          </Box>
        ) : shopsLoading ? (
          <Typography>Loading nearby shops...</Typography>
        ) : shopsError ? (
          <Typography color="error">Error loading nearby shops: {shopsError}</Typography>
        ) : null}
        {shops ? <NearbyShopsWithProductsSlider shops={shops} productName={product.name} /> : null}
      </Box>
      <Footer />
    </>
  );
}

export default Index;
