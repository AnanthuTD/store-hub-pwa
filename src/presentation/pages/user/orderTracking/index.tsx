import React from 'react';
import { LoadScript } from '@react-google-maps/api';
import TrackPage from './TrackPage';
import { useSearchParams } from 'react-router-dom';

function Page() {
  const [useParams] = useSearchParams();
  const orderId = useParams.get('orderId');

  if (!orderId) {
    // Redirect to a 404 page or display a message indicating the order ID is missing
    return <div>Order ID is missing</div>;
  }

  return (
    <div>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_MAP_API_KEY} libraries={['geometry']}>
        <TrackPage orderId={orderId} />
      </LoadScript>
    </div>
  );
}

export default Page;
