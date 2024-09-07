import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Typography, Avatar, Divider } from '@mui/material';
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

const StyledBox = styled(Box)`
  background-color: #1e1e1e; /* Dark background */
  padding: 24px;
  border-radius: 8px;
  width: 100%; /* Set width to 100% */
  max-width: 100%; /* Ensure it doesn't exceed 100% */
`;

const StyledTypography = styled(Typography)`
  color: #ffffff; /* White text for contrast */
`;

const StyledListItem = styled(ListItem)`
  width: 100%; /* Set width to 100% */
  &:hover {
    background-color: #333333; /* Slightly lighter hover effect */
    transition: background-color 0.3s ease;
  }
`;

const StyledAvatar = styled(Avatar)`
  border: 2px solid #4caf50; /* Green border for verified, dynamic color for non-verified */
`;

const StyledDivider = styled(Divider)`
  background-color: #444444; /* Subtle divider color */
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
      const response = await axiosInstance.get('/admin/partner/list/not-verified'); // Replace with your API endpoint
      setPartners(response.data);
    } catch (error) {
      console.error('Error fetching partners data', error);
    }
  };

  const handlePartnerClick = (id: string) => {
    navigate(`/admin/partner/validate?id=${id}`);
  };

  return (
    <StyledBox>
      <StyledTypography variant="h4" gutterBottom>
        Delivery Partners
      </StyledTypography>
      <List>
        {partners.map((partner) => (
          <React.Fragment key={partner._id}>
            <StyledListItem onClick={() => handlePartnerClick(partner._id)}>
              <StyledAvatar
                src={partner.avatar}
                alt={`${partner.firstName} Avatar`}
                style={{
                  borderColor: partner.isVerified ? '#4caf50' : '#f44336',
                }} /* Red border if not verified */
              />
              <ListItemText
                primary={`${partner.firstName} ${partner.lastName}`}
                secondary={`${partner.city} - ${partner.isVerified ? 'Verified' : 'Not Verified'}`}
                primaryTypographyProps={{ color: '#ffffff' }} /* White text */
                secondaryTypographyProps={{ color: '#cccccc' }} /* Light gray secondary text */
              />
            </StyledListItem>
            <StyledDivider />
          </React.Fragment>
        ))}
      </List>
    </StyledBox>
  );
};

export default PartnersListPage;
