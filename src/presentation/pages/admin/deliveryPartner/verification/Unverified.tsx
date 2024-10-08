import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Avatar, Typography, Divider } from 'antd';
import axiosInstance from '@/config/axios';
import styled from '@emotion/styled';

// Define type for a minimal version of Delivery Partner
interface PartnerSummary {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  city: string;
  isVerified: boolean;
}

// Styled Title for light theme
const StyledTitle = styled(Typography.Title)`
  color: #333333; /* Darker text for light theme */
`;

const StyledListItem = styled(List.Item)`
  &:hover {
    background-color: #f5f5f5; /* Light grey hover effect for light theme */
    transition: background-color 0.3s ease;
  }
`;

// Styled Divider for light theme
const StyledDivider = styled(Divider)`
  background-color: #e0e0e0; /* Light grey divider */
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
      const response = await axiosInstance.get('/admin/partner/list/unverified');
      setPartners(response.data);
    } catch (error) {
      console.error('Error fetching partners data', error);
    }
  };

  const handlePartnerClick = (id: string) => {
    navigate(`/admin/partner/validate?id=${id}`);
  };

  return (
    <>
      <StyledTitle level={4}>Un-verified Delivery Partners</StyledTitle>
      <List
        itemLayout="horizontal"
        dataSource={partners}
        renderItem={(partner) => (
          <React.Fragment key={partner._id}>
            <StyledListItem onClick={() => handlePartnerClick(partner._id)}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={partner.avatar}
                    alt={`${partner.firstName} Avatar`}
                    style={{
                      border: `2px solid ${partner.isVerified ? '#4caf50' : '#f44336'}`,
                    }} /* Green border if verified, red if not */
                  />
                }
                title={`${partner.firstName} ${partner.lastName}`}
                description={`${partner.city} - ${
                  partner.isVerified ? 'Verified' : 'Not Verified'
                }`}
              />
            </StyledListItem>
            <StyledDivider />
          </React.Fragment>
        )}
      />
    </>
  );
};

export default PartnersListPage;
