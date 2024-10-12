import React from 'react';
import Map from './components/Map';
import { LoadScript } from '@react-google-maps/api';

function Page() {
  return (
    <div>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_MAP_API_KEY} // Use your API key here
        libraries={['geometry']}
      >
        <Map />
      </LoadScript>
    </div>
  );
}

export default Page;
