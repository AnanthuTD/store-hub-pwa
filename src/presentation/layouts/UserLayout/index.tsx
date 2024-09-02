import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/infrastructure/redux/store'; // Adjust the path to your store file

function UserLayout({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: RootState) => state.user); // Adjust according to your Redux state
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.data) {
      navigate('/signin');
    }
  }, [user, navigate]);

  // Prevent rendering if user data is missing
  if (!user.data) {
    return null; // You can return a loading spinner or any placeholder here
  }

  return <div>{children}</div>;
}

export default UserLayout;
