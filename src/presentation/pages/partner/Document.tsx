import DocumentItem from '@/presentation/components/Partner/Registration/DocumentItem';
import { Box, Typography, Grid, Button } from '@mui/material';

const DocumentsPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#F8F8F8',
        padding: 3,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ marginBottom: 3 }}>
        {/* Header */}
        <Box
          sx={{
            background: 'linear-gradient(90deg, #FF6B6B 0%, #FFA13C 100%)',
            borderRadius: 3,
            color: '#fff',
            padding: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Welcome to ShopHub
          </Typography>
          <Typography variant="body2">
            Just a few steps to complete and then you can start earning with us
          </Typography>
        </Box>

        {/* Pending Documents Section */}
        <Box marginTop={3}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Pending Documents
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DocumentItem title="Personal Documents" completed={false} />
            </Grid>
            <Grid item xs={12}>
              <DocumentItem title="Vehicle Details" completed={false} />
            </Grid>
            <Grid item xs={12}>
              <DocumentItem title="Bank Account Details" completed={false} />
            </Grid>
            <Grid item xs={12}>
              <DocumentItem title="Emergency Details" completed={false} />
            </Grid>
          </Grid>
        </Box>

        {/* Completed Documents Section */}
        <Box marginTop={3}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Completed Documents
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DocumentItem title="Personal Information" completed />
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Submit Button */}
      <Box>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: '#FF6B6B',
            color: '#fff',
            borderRadius: 3,
            paddingY: 1.5,
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#FF6B6B',
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default DocumentsPage;
