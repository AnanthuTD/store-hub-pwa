import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import OptionsMenu from './OptionsMenu';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axiosInstance from '@/config/axios';
import { logout } from '@/infrastructure/redux/slices/partner/partnerSlice';

function AccountPage() {
  const [selectedOption, setSelectedOption] = useState<null | 'editProfile' | 'logout' | 'wallet'>(
    null,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const renderSelectedOptionPage = () => {
    switch (selectedOption) {
      case 'editProfile':
        return navigate('/partner/account/edit-profile');
      case 'wallet':
        return navigate('/partner/account/wallet');
      case 'logout':
        dispatch(logout());
        axiosInstance.get('/partner/auth/logout');
        return navigate('/partner/signup');
      default:
        return null;
    }
  };

  return selectedOption ? (
    renderSelectedOptionPage() ?? <></>
  ) : (
    <div>
      <ProfileCard />
      <OptionsMenu setSelectedOption={setSelectedOption} />
    </div>
  );
}

export default AccountPage;
