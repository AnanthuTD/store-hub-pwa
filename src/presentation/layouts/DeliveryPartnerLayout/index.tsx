import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '@/infrastructure/redux/store'; // Adjust the path to your store file
import { login } from '@/infrastructure/redux/slices/partner/partnerSlice';
import { fetchProfile } from '@/infrastructure/repositories/PartnerAuthRepository';

function DeliveryPartnerLayout({ children }: { children: React.ReactNode }) {
  const deliveryPartner = useSelector((state: RootState) => state.partner); // Adjust according to your Redux state
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        // If no shopOwner data, attempt to fetch the profile
        if (!deliveryPartner) {
          const profile = await fetchProfile();
          console.log(profile);

          if (!profile) {
            navigate('/partner/signin');
          } else {
            // Update Redux store with fetched profile data
            dispatch(login(profile));
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/partner/signin'); // Navigate to sign-in if fetching profile fails
      }
    };

    loadProfile();
  }, [deliveryPartner, dispatch, navigate]);

  // Prevent rendering if delivery partner data is missing
  if (!deliveryPartner.data) {
    return null; // You can return a loading spinner or any placeholder here
  }

  return <div>{children}</div>;
}

export default DeliveryPartnerLayout;
