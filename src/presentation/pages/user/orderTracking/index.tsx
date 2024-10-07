import React from 'react';
import { LoadScript } from '@react-google-maps/api';
import TrackPage from './TrackPage';

function Page() {
  return (
    <div>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_MAP_API_KEY} // Use your API key here
        libraries={['geometry']}
      >
        <TrackPage orderId="orderId" />
      </LoadScript>
    </div>
  );
}

export default Page;
