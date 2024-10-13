import React from 'react';
import Map from './components/Map';
import { LoadScript } from '@react-google-maps/api';
import useRegisterFCMToken from '@/hooks/useRegisterFCMToken';
import useFCM, { FCMRoles } from '@/hooks/useFCM';

function Page() {
  useFCM(FCMRoles.DELIVERY_PARTNER);

  // update fcm token
  useRegisterFCMToken('/partner/update-fcm-token');

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
