import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const RegistrationComplete = () => {
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: '#FF5963',
        }}
      >
        <Box
          display={'flex'}
          bgcolor={'white'}
          width={'100%'}
          padding={2}
          sx={{ borderBottomRightRadius: '15px', borderBottomLeftRadius: '15px' }}
        >
          <ArrowBackIosIcon />
          <Typography variant="h6">Registration Complete</Typography>
        </Box>
        <Box display={'flex'} alignItems={'center'} padding={2}>
          <Box>
            <Typography variant="h6" component="div" color={'white'}>
              Your application is under Verification
            </Typography>
            <Typography color={'white'} variant="body2">
              Account will get activated in 48hrs
            </Typography>
          </Box>
          <Box
            component="img"
            src="/verification.svg"
            alt="Verification"
            sx={{ width: 94, height: 91.76, marginLeft: 'auto' }}
          />
        </Box>
      </Box>
      <Box padding={2}>
        <Box sx={{ mt: 3 }}>
          {[
            { label: 'Personal Information', status: 'Approved', color: 'green' },
            { label: 'Personal Documents', status: 'Verification Pending', color: 'red' },
            { label: 'Vehicle Details', status: 'Approved', color: 'green' },
            { label: 'Bank Account Details', status: 'Approved', color: 'green' },
            { label: 'Emergency Details', status: 'Approved', color: 'green' },
          ].map((item, index) => (
            <Card
              key={index}
              sx={{ mb: 2, boxShadow: 1, borderRadius: 2, display: 'flex', alignItems: 'center' }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body1">{item.label}</Typography>
                <Typography variant="body2" sx={{ color: item.color }}>
                  {item.status}
                </Typography>
              </CardContent>
              <ArrowForwardIosIcon />
            </Card>
          ))}
        </Box>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2">Need Help?</Typography>
          <Button variant="text" color="error">
            Contact Us
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RegistrationComplete;
