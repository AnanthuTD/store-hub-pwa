import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SideBarShop from './components/SideBar';
import BackgroundWrapper from '@/presentation/components/BackgroundWrapper';
import { RootState } from '@/infrastructure/redux/store'; // Adjust the path to your store file

function ShopOwnerLayout({ children }: { children: React.ReactNode }) {
  const shopOwner = useSelector((state: RootState) => state.shopOwner); // Adjust according to your Redux state
  const navigate = useNavigate();

  useEffect(() => {
    if (!shopOwner.data) {
      navigate('/shop/signin');
    }
  }, [shopOwner, navigate]);

  if (!shopOwner.data) {
    return null;
  }

  return (
    <BackgroundWrapper>
      <div style={{ display: 'flex' }}>
        <SideBarShop />
        {children}
      </div>
    </BackgroundWrapper>
  );
}

export default ShopOwnerLayout;
