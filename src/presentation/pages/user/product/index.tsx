import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, IconButton, Rating } from '@mui/material';
import { FavoriteBorder, ShoppingCartOutlined, VisibilityOutlined } from '@mui/icons-material';
import { SideBySideMagnifier } from 'react-image-magnifiers';

const ProductCard = () => {
  const [selectedImage, setSelectedImage] = useState(0); // Track the selected image index
  const [selectedColor, setSelectedColor] = useState('blue'); // Track the selected color
  const [inCart, setInCart] = useState(false); // Track cart state

  const images = ['/product/image.jpg', '/product/image.jpg', '/product/image.jpg'];
  const largeImages = [
    '/product/large-image.jpg',
    '/product/large-image.jpg',
    '/product/large-image.jpg',
  ];

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleAddToCart = () => {
    setInCart((prev) => !prev);
  };

  useEffect(() => {
    // Select the image using its alt attribute and apply the styles
    const imageElement = document.querySelector('img[alt="Product Image"]');
    if (imageElement) {
      imageElement.style.display = 'block';
      imageElement.style.cursor = 'crosshair';
      imageElement.style.height = '450px';
      imageElement.style.width = 'auto';

      const parentElement = imageElement.parentElement;
      if (parentElement) {
        parentElement.style.display = 'flex';
        parentElement.style.justifyContent = 'center';
      }
    }
  }, [selectedImage]); // Re-run this effect whenever the selected image changes

  return (
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ padding: 2 }}>
      <Card sx={{ display: 'flex', width: '100%', maxWidth: 900 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
          <SideBySideMagnifier
            imageSrc={images[selectedImage]} // Display selected image
            largeImageSrc={largeImages[selectedImage]} // Display corresponding large image
            imageAlt="Product Image" // Important for query selection
            alwaysInPlace={false}
            fillAvailableSpace={false}
            fillAlignTop={false}
            fillGapTop={10}
            fillGapRight={10}
            fillGapBottom={10}
            fillGapLeft={0}
            zoomContainerBorder="1px solid #ccc"
            zoomContainerBoxShadow="0 4px 8px rgba(0,0,0,.5)"
          />
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ padding: 1 }}>
            <IconButton aria-label="Previous Image" onClick={handlePrevImage}>
              <Typography>{'<'}</Typography>
            </IconButton>
            {images.map((img, index) => (
              <Box
                key={index}
                component="img"
                src={img}
                alt={`Thumbnail ${index + 1}`}
                sx={{
                  width: 80,
                  height: 80,
                  margin: 1,
                  border: selectedImage === index ? '2px solid black' : 'none',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedImage(index)} // Set image on thumbnail click
              />
            ))}
            <IconButton aria-label="Next Image" onClick={handleNextImage}>
              <Typography>{'>'}</Typography>
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '50%',
          }}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Floating Phone
            </Typography>
            <Box display="flex" alignItems="center">
              <Rating value={4} readOnly />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                (10 Reviews)
              </Typography>
            </Box>
            <Typography variant="h4" color="primary" sx={{ marginTop: 2 }}>
              $1,139.33
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Availability:{' '}
              <Typography component="span" color="success.main">
                In Stock
              </Typography>
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official
              consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
            </Typography>
            <Box display="flex" sx={{ marginTop: 2 }}>
              {['blue', 'green', 'orange', 'black'].map((color) => (
                <Box
                  key={color}
                  sx={{
                    backgroundColor: color,
                    borderRadius: '50%',
                    width: 25,
                    height: 25,
                    marginRight: 1,
                    cursor: 'pointer',
                    border: selectedColor === color ? '2px solid black' : 'none',
                  }}
                  onClick={() => handleColorSelect(color)} // Handle color selection
                />
              ))}
            </Box>
          </CardContent>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ padding: 2 }}
          >
            <Button variant="contained" color="primary" onClick={() => alert('Shop Now Clicked!')}>
              Shop Now
            </Button>
            <Box display="flex" alignItems="center">
              <IconButton aria-label="Add to Wishlist" onClick={() => alert('Added to Wishlist!')}>
                <FavoriteBorder />
              </IconButton>
              <IconButton aria-label="Add to Cart" onClick={handleAddToCart}>
                {inCart ? <ShoppingCartOutlined color="success" /> : <ShoppingCartOutlined />}
              </IconButton>
              <IconButton aria-label="View" onClick={() => alert('View Product!')}>
                <VisibilityOutlined />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default ProductCard;
