import { RootState } from '@/infrastructure/redux/store';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const useUserProfile = <R extends keyof RootState>(role: R): RootState[R]['data'] => {
  const profile = useTypedSelector((state) => state[role].data);

  return profile;
};

export default useUserProfile;
