import React, { useEffect, useState } from 'react';
import axiosInstance from '@/config/axios';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import PartnersList from '../components/PartnersList';
import { PartnerSummary } from '../components/PartnerCard';
import { useNavigate } from 'react-router-dom';

// Styled Title for light theme
const StyledTitle = styled(Typography.Title)`
  color: #333333; /* Darker text for light theme */
`;

const PartnersListPage: React.FC = () => {
  const [partners, setPartners] = useState<PartnerSummary[]>([]);
  const navigate = useNavigate();

  // Fetch list of partners on component mount
  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await axiosInstance.get('/admin/vendor/list/pending');
      setPartners(response.data);
    } catch (error) {
      console.error('Error fetching partners data', error);
    }
  };

  const handlePartnerClick = (id: string) => {
    navigate(`/admin/vendor/verify?id=${id}`);
  };

  return (
    <>
      <StyledTitle level={4}>Vendor Pending Verification</StyledTitle>
      <PartnersList partners={partners} onPartnerClick={handlePartnerClick} />
    </>
  );
};

export default PartnersListPage;
