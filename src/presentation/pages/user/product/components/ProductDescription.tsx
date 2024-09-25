import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Collapse,
  Button,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
} from '@mui/material';
import { AddShoppingCart, FavoriteBorder, ExpandMore, ExpandLess } from '@mui/icons-material';
import { IProduct } from '@/domain/entities/IProduct';

interface ProductDescriptionProps {
  product: IProduct;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };

  const handleHover = () => {
    setHovered(true);
  };

  const handleHoverLeave = () => {
    setHovered(false);
  };

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={2}>
        {/* Left Section - Image */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={3}
            sx={{
              overflow: 'hidden',
              borderRadius: 2,
              cursor: 'zoom-in',
              transition: 'transform 0.3s ease',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
              height: '350px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverLeave}
          >
            <img
              src={product.images[0]}
              alt="Product"
              style={{ height: '100%', display: 'block' }}
            />
          </Paper>
        </Grid>

        {/* Right Section - Tabs */}
        <Grid item xs={12} md={7}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabIndex} onChange={handleTabChange} aria-label="product details tabs">
              <Tab label="Description" />
              <Tab label="Reviews" />
              <Tab label="Others" />
            </Tabs>
          </Box>

          {tabIndex === 0 && (
            <Box sx={{ padding: 2 }}>
              <Typography variant="h5" gutterBottom>
                the quick fox jumps over
              </Typography>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Tooltip title="Add to Wishlist">
                    <IconButton>
                      <FavoriteBorder />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Add to Cart">
                    <IconButton>
                      <AddShoppingCart />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              <Typography variant="body1" gutterBottom>
                {product.description || 'No description available'}
              </Typography>

              {/* Expandable Section */}
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography variant="body1" gutterBottom>
                  More product details and information. This text is hidden by default and will
                  expand when the user clicks the &quot;Read More&quot; button.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Additional details go here, providing the user with more insights about the
                  product.
                </Typography>
              </Collapse>
              <Button
                endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
                onClick={handleExpandClick}
                sx={{ marginTop: 2 }}
              >
                {expanded ? 'Read Less' : 'Read More'}
              </Button>
            </Box>
          )}

          {tabIndex === 1 && (
            <Box sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Reviews
              </Typography>
              <Typography variant="body1">
                This is where you can display reviews for the product. You might want to use a list
                or a grid to show multiple reviews.
              </Typography>
            </Box>
          )}

          {tabIndex === 2 && (
            <Box sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Others
              </Typography>
              <Typography variant="body1">
                This section can contain additional information such as related products, FAQs, or
                special offers.
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDescription;
