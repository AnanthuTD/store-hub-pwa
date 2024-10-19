import React from 'react';
import Map from './components/Map';
import { LoadScript } from '@react-google-maps/api';
import useRegisterFCMToken from '@/hooks/useRegisterFCMToken';
import useFCM, { FCMRoles } from '@/hooks/useFCM';
import CallComponent from '../../../components/call/CallComponent';
import { useSelector } from 'react-redux';
import { RootState } from '@/infrastructure/redux/store';

function Page() {
  useFCM(FCMRoles.DELIVERY_PARTNER);
  const deliveryPartner = useSelector<RootState>((state) => state.partner.data);

  // update fcm token
  useRegisterFCMToken('/partner/update-fcm-token');

  return (
    <div>
      {deliveryPartner?.id ? (
        <CallComponent userId={deliveryPartner?.id}>
          <LoadScript
            googleMapsApiKey={import.meta.env.VITE_MAP_API_KEY} // Use your API key here
            libraries={['geometry']}
          >
            <Map />
          </LoadScript>
        </CallComponent>
      ) : null}
    </div>
  );
}

export default Page;
