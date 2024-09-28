import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/infrastructure/redux/store';
import { fetchProfile } from '@/infrastructure/repositories/VendorRepository';
import { login } from '@/infrastructure/redux/slices/vendor/vendorSlice';

export function useProfile(refetchStores?: () => void) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const vendor = useSelector((state: RootState) => state.vendor.data);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const tokenFromUrl = searchParams.get('token');
        if (tokenFromUrl) {
          Cookies.set('authToken', tokenFromUrl);
        }

        if (!vendor) {
          const profile = await fetchProfile();
          if (!profile) {
            navigate('/vendor/signin');
          } else {
            dispatch(login(profile));
            if (refetchStores) {
              refetchStores(); // Refetch the stores once profile is loaded
            }
          }
        }
      } catch {
        navigate('/vendor/signin');
      }
    };

    loadProfile();
  }, [dispatch, navigate, searchParams, refetchStores, vendor]);
}
