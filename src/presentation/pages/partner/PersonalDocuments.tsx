import { Container, Typography, Grid } from '@mui/material';
import DocumentItem from '@/presentation/components/Partner/Registration/DocumentItem';

const PersonalDocuments = () => {
  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom marginBottom={3} fontWeight={'bold'}>
        Personal Documents
      </Typography>
      <Typography gutterBottom marginBottom={3}>
        Upload focused photos of below documents for faster verification
      </Typography>
      <Grid container spacing={2}>
        {['Aadhar Card', 'PAN Card', 'Driving License'].map((text) => (
          <Grid item xs={12} key={text + '-grid'}>
            <DocumentItem title={text} completed={false} key={text} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PersonalDocuments;
