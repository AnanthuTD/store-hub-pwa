import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BackgroundWrapper from '@/presentation/components/BackgroundWrapper';
import { RootState } from '@/infrastructure/redux/store'; // Adjust the path to your store file

function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = useSelector((state: RootState) => state.admin); // Adjust according to your Redux state
  const navigate = useNavigate();

  useEffect(() => {
    if (!admin.data) {
      navigate('/admin/signin');
    }
  }, [admin, navigate]);

  // Prevent rendering if admin data is missing
  if (!admin.data) {
    return null; // You can return a loading spinner or any placeholder here
  }

  return (
    <BackgroundWrapper>
      <div>{children}</div>
    </BackgroundWrapper>
  );
}

export default AdminLayout;
