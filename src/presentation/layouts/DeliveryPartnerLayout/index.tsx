import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/infrastructure/redux/store'; // Adjust the path to your store file

function DeliveryPartnerLayout({ children }: { children: React.ReactNode }) {
  const deliveryPartner = useSelector((state: RootState) => state.partner); // Adjust according to your Redux state
  const navigate = useNavigate();

  useEffect(() => {
    if (!deliveryPartner.data) {
      navigate('/partner/signin');
    }
  }, [deliveryPartner, navigate]);

  // Prevent rendering if delivery partner data is missing
  if (!deliveryPartner.data) {
    return null; // You can return a loading spinner or any placeholder here
  }

  return <div>{children}</div>;
}

export default DeliveryPartnerLayout;
