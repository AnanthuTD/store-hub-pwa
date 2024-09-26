import { Box, Card, CardContent, Rating, styled, Typography } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';

// Custom card component with styles
const CustomCard = styled(Card)({
  maxWidth: 280,
  margin: '0 auto',
  textAlign: 'center',
  backgroundColor: '#ffffff',
  borderRadius: 15,
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
  },
});

// Custom Typography for the shop name
const ShopName = styled(Typography)({
  fontWeight: 'bold',
  marginTop: '10px',
  fontSize: '18px',
  color: '#29384E',
});

// Custom Typography for the location
const LocationText = styled(Typography)({
  color: '#8B8B8B',
  fontSize: '14px',
  marginBottom: '5px',
});

const ShopCard = ({ name, location, rating, distance }) => {
  return (
    <CustomCard>
      <StorefrontIcon style={{ fontSize: 80, color: '#0071e3', margin: '10px 0' }} />
      <CardContent>
        <ShopName>{name}</ShopName>
        <LocationText>{location}</LocationText>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Rating name="read-only" value={rating} readOnly precision={0.5} />
          <Typography style={{ marginLeft: '8px' }}>{rating}</Typography>
        </Box>
        <Typography color="primary" style={{ marginTop: '5px', fontWeight: 'bold' }}>
          {distance}
        </Typography>
      </CardContent>
    </CustomCard>
  );
};

export default ShopCard;
