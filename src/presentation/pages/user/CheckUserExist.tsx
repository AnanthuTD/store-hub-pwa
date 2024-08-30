import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthRepositoryImpl } from '@/infrastructure/repositories/AuthRepositoryImpl';
import Loading from '@/presentation/components/Loading';
import { login } from '@/infrastructure/redux/slices/user/userSlice';

interface PrivateRouteProps {
  component: React.ComponentType<any>;
}

const CheckUserExist: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      new AuthRepositoryImpl()
        .fetchProfile()
        .then((fetchedUser) => {
          dispatch(login(fetchedUser));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch, user]);

  if (loading) return <Loading />;

  return user ? <Route {...rest} element={<Component />} /> : <Navigate to="/login" />;
};

export default CheckUserExist;
