import axiosInstance from '@/config/axios';
import ShopOwnerForm from './ShopOwnerForm';
import { IShopOwner } from '@/domain/entities/IShopOwner';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootState } from '@/infrastructure/redux/store';

const GradientDiv = styled.div`
  background: linear-gradient(
    to bottom,
    ${(props) => props.startColor || '#060B28'} 74%,
    ${(props) => props.endColor || '#0A0E23'} 71%
  );
`;

type ShopOwner = Omit<IShopOwner, '_id'>;

/* const dummyShopOwner = {
  bankDetails: {
    accountHolderName: 'John Doe',
    accountNumber: '1234567890',
    bankName: 'Sample Bank',
    ifscCode: 'SBIN0001234',
  },
  createdAt: new Date('2023-01-01T00:00:00Z'), // Assume a past date for creation
  phone: '+911234567890',
  updatedAt: new Date('2024-09-01T00:00:00Z'), // Assume the last update was recent
  profile: {
    address: {
      city: 'Mumbai',
      country: 'India',
      postalCode: '400001',
      state: 'Maharashtra',
      street: '123, Sample Street',
    },
    firstName: 'John',
    lastName: 'Doe',
  },
}; */

function Index() {
  const shopOwner = useSelector((state: RootState) => state.shopOwner.data);

  function handleSubmit(shopOwner: ShopOwner) {
    const response = axiosInstance.post('/shopOwner/auth/register', shopOwner);
    console.log(response);
  }
  return (
    <GradientDiv style={{ padding: '10px' }}>
      <ShopOwnerForm onSubmit={handleSubmit} initialData={shopOwner} />
      {/* <button onClick={handleSubmit}>Submit</button> */}
    </GradientDiv>
  );
}

export default Index;
