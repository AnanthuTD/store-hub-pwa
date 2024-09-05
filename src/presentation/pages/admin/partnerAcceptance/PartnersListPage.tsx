// src/components/PartnersListPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Typography, Avatar, Divider } from '@mui/material';
import axiosInstance from '@/config/axios';

// Define type for a minimal version of Delivery Partner
interface PartnerSummary {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  city: string;
  isVerified: boolean;
}

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
      // setPartners(dummyData); // Placeholder for dummy data, replace with actual API call or fetch data from API endpoint when available.
    } catch (error) {
      console.error('Error fetching partners data', error);
    }
  };

  const handlePartnerClick = (id: string) => {
    navigate(`/admin/partner/validate?id=${id}`);
  };

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        Delivery Partners
      </Typography>
      <List>
        {partners.map((partner) => (
          <React.Fragment key={partner._id}>
            <ListItem onClick={() => handlePartnerClick(partner._id)}>
              <Avatar src={partner.avatar} alt={`${partner.firstName} Avatar`} />
              <ListItemText
                primary={`${partner.firstName} ${partner.lastName}`}
                secondary={`${partner.city} - ${partner.isVerified ? 'Verified' : 'Not Verified'}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default PartnersListPage;
