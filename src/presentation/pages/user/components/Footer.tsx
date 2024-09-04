import React from 'react';
import { Grid, Box, Typography, Link, Button, Container } from '@mui/material';
import { styled } from '@mui/system';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const FooterContainer = styled(Box)({
  backgroundColor: '#1a1e36',
  color: '#fff',
  padding: '40px 0',
});

const FooterLink = styled(Link)({
  color: '#fff',
  display: 'block',
  textDecoration: 'none',
  marginBottom: '10px',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const FooterTitle = styled(Typography)({
  fontWeight: 'bold',
  marginBottom: '15px',
});

const ContactButton = styled(Button)({
  backgroundColor: '#3399ff',
  color: '#fff',
  borderRadius: '25px',
  padding: '10px 30px',
  '&:hover': {
    backgroundColor: '#1a82e2',
  },
});

const FooterBottom = styled(Box)({
  textAlign: 'center',
  marginTop: '30px',
  fontSize: '14px',
  borderTop: '1px solid #333',
  paddingTop: '20px',
});

function Footer() {
  return (
    <FooterContainer>
      <Container sx={{ marginBottom: '100px', display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h5">Consulting Agency For Your Business</Typography>
          <Typography variant="subtitle1">the quick fox jumps over the lazy dog</Typography>
        </Box>
        <Box>
          <ContactButton size="small">Contact Us</ContactButton>
        </Box>
      </Container>
      <Container>
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={2}>
            <FooterTitle variant="h6">Company Info</FooterTitle>
            <FooterLink href="#">About Us</FooterLink>
            <FooterLink href="#">Carrier</FooterLink>
            <FooterLink href="#">We are hiring</FooterLink>
            <FooterLink href="#">Blog</FooterLink>
          </Grid>

          {/* Legal */}
          <Grid item xs={12} md={2}>
            <FooterTitle variant="h6">Legal</FooterTitle>
            <FooterLink href="#">About Us</FooterLink>
            <FooterLink href="#">Carrier</FooterLink>
            <FooterLink href="#">We are hiring</FooterLink>
            <FooterLink href="#">Blog</FooterLink>
          </Grid>

          {/* Features */}
          <Grid item xs={12} md={2}>
            <FooterTitle variant="h6">Features</FooterTitle>
            <FooterLink href="#">Business Marketing</FooterLink>
            <FooterLink href="#">User Analytic</FooterLink>
            <FooterLink href="#">Live Chat</FooterLink>
            <FooterLink href="#">Unlimited Support</FooterLink>
          </Grid>

          {/* Resources */}
          <Grid item xs={12} md={2}>
            <FooterTitle variant="h6">Resources</FooterTitle>
            <FooterLink href="#">IOS & Android</FooterLink>
            <FooterLink href="#">Watch a Demo</FooterLink>
            <FooterLink href="#">Customers</FooterLink>
            <FooterLink href="#">API</FooterLink>
          </Grid>

          {/* Get In Touch */}
          <Grid item xs={12} md={3}>
            <FooterTitle variant="h6">Get In Touch</FooterTitle>
            <Typography>
              <PhoneIcon fontSize="small" /> (480) 555-0103
            </Typography>
            <Typography>
              <LocationOnIcon fontSize="small" /> 4517 Washington Ave.
            </Typography>
            <Typography>
              <EmailIcon fontSize="small" /> shophub@example.com
            </Typography>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <FooterBottom>
          <Typography variant="body2">Made With Love By Finland All Right Reserved</Typography>

          {/* Social Icons */}
          <Box display="flex" justifyContent="center" mt={2} gap={2}>
            <Link href="#" color="inherit">
              <FacebookIcon />
            </Link>
            <Link href="#" color="inherit">
              <TwitterIcon />
            </Link>
            <Link href="#" color="inherit">
              <InstagramIcon />
            </Link>
          </Box>
        </FooterBottom>
      </Container>
    </FooterContainer>
  );
}

export default Footer;
