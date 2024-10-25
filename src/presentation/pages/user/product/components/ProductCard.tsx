import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Rating,
  Divider,
  Chip,
} from '@mui/material';
import { FavoriteBorder, HeartBrokenOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { SideBySideMagnifier } from 'react-image-magnifiers';
import ProductVariantSelector, { Variant } from './ProductVariantSelector';
import { IProduct } from '@/domain/entities/IProduct';
import axiosInstance from '@/config/axios';
import { message } from 'antd';
import { AxiosError } from 'axios';
import { useCartCount } from '@/presentation/layouts/UserLayout';
import { HeartFilled } from '@ant-design/icons';
import { AddToWishlist } from '@/application/usecase/AddToWishlist';
import { WishlistRepository } from '@/infrastructure/repositories/WishlistRepository';
import { CheckProductInWishlist } from '@/application/usecase/CheckProductInWishlist';

interface ProductCardProps {
  product: IProduct;
}

const wishlistRepo = new WishlistRepository();
const addToWishlist = new AddToWishlist(wishlistRepo);
const checkProductInWishlist = new CheckProductInWishlist(wishlistRepo);

const checkItemInCart = async (productId: string, variantId: string): Promise<boolean> => {
  if (!productId || !variantId) return false;

  try {
    const response = await axiosInstance.get(`/user/cart/check`, {
      params: {
        productId,
        variantId,
      },
    });

    // Assuming the response contains a boolean `inCart`
    return response.data.inCart;
  } catch (error) {
    console.error('Error checking item in cart:', error);
    return false;
  }
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [variant, setVariant] = useState<Variant | null>(null);
  const { refreshCartCount } = useCartCount();

  // set the first variant as the selected variant
  useEffect(() => {
    if (product && product.variants) {
      setVariant(product.variants[0]);
    }
  }, [product]);

  // Check if the selected variant is in the user's cart when the variant changes
  useEffect(() => {
    if (variant) {
      checkItemInCart(product._id, variant?._id).then((inCart) => setInCart(inCart));
    }

    checkProductInWishlist.execute(product._id).then((response) => setInWishlist(response));
  }, [variant, product]);

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? product?.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === product?.images.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = async (productId: string, variantId: string) => {
    if (inCart) {
      // If item is already in cart, remove it
      try {
        await axiosInstance.delete('/user/cart/remove', {
          data: { productId, variantId },
        });
        setInCart(false);
      } catch (error) {
        console.error('Failed to remove product from cart:', error);
      }
    } else {
      // If item is not in cart, add it
      try {
        await axiosInstance.post('/user/cart/add', {
          productId,
          variantId,
          quantity: 1,
        });
        setInCart(true);
      } catch (error) {
        if (error instanceof AxiosError) {
          message.error(error.response?.data.message);
        } else {
          message.error('An unexpected error occurred! Unable to add product to cart');
        }
        console.error('Failed to add product to cart:', error);
      }
    }

    refreshCartCount();
  };

  const handleAddToWishlist = (productId: string) => {
    try {
      addToWishlist.execute(productId);
      setInWishlist(true);
    } catch (error) {
      message.error(error.response?.data.message);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ padding: 2 }}>
        <Card sx={{ display: 'flex', width: '100%', maxWidth: 900, boxShadow: 3, borderRadius: 2 }}>
          {/* Left Side: Image & Image Navigation */}
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', padding: 2 }}>
            <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
              <SideBySideMagnifier
                imageSrc={product.images[selectedImage]}
                largeImageSrc={product.images[selectedImage]}
                imageAlt="Product Image"
                alwaysInPlace={false}
                zoomContainerBorder="1px solid #ccc"
                zoomContainerBoxShadow="0 4px 8px rgba(0,0,0,.3)"
              />
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ padding: 1 }}>
              <IconButton onClick={handlePrevImage}>
                <Typography>{'<'}</Typography>
              </IconButton>
              {product.images.map((img, index) => (
                <Box
                  key={index}
                  component="img"
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  sx={{
                    width: 60,
                    height: 60,
                    margin: 1,
                    border: selectedImage === index ? '2px solid #1976d2' : '1px solid #ccc',
                    borderRadius: 1,
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
              <IconButton onClick={handleNextImage}>
                <Typography>{'>'}</Typography>
              </IconButton>
            </Box>
          </Box>

          {/* Right Side: Product Details */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '50%',
              padding: 2,
            }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {product.name}
              </Typography>

              <Box display="flex" alignItems="center" sx={{ marginTop: 1 }}>
                <Rating
                  value={product?.ratingSummary.averageRating || 4.5}
                  precision={0.5}
                  readOnly
                />
                <Typography variant="body2" sx={{ marginLeft: 1, color: 'text.secondary' }}>
                  ({product?.ratingSummary.totalReview} Reviews)
                </Typography>
              </Box>

              <Typography variant="body2" sx={{ marginTop: 2, color: 'text.secondary' }}>
                {product.description}
              </Typography>

              <Divider sx={{ marginY: 2 }}>
                <Chip label="Variants" color="primary" />
              </Divider>

              {variant ? <VariantDetails variant={variant} /> : null}
            </CardContent>

            {/* Buttons */}
            <Box sx={{ padding: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" color="primary" size="large">
                Shop Now
              </Button>
              <Box display="flex" gap={1}>
                <IconButton onClick={() => alert('Added to Wishlist!')}>
                  <FavoriteBorder />
                </IconButton>
                <IconButton
                  disabled={!variant?.stock}
                  onClick={() => handleAddToCart(product._id, variant._id)}
                >
                  {inCart ? <ShoppingCartOutlined color="success" /> : <ShoppingCartOutlined />}
                </IconButton>
                <IconButton onClick={() => handleAddToWishlist(product._id)}>
                  {inWishlist ? <HeartFilled /> : <HeartBrokenOutlined />}
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>

      {variant && (
        <ProductVariantSelector
          product={product}
          selectedVariant={variant}
          setSelectedVariant={setVariant}
        />
      )}
    </Box>
  );
};

interface VariantDetailsProps {
  variant: Variant;
}

const VariantDetails: React.FC<VariantDetailsProps> = ({ variant }) => {
  if (!variant.discountedPrice && !variant.price) {
    return <Typography color="error">This product is not available</Typography>;
  }

  return (
    <Card variant="outlined" sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="body1">
        Price:{' '}
        {variant.discountedPrice ? (
          <>
            <Typography component="span" color="primary">
              ${variant.discountedPrice}
            </Typography>{' '}
            <Typography
              component="span"
              sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
            >
              ${variant.price}
            </Typography>
          </>
        ) : (
          <Typography component="span">${variant.price}</Typography>
        )}
      </Typography>
      {variant.stock ? (
        <Typography variant="body1">Stock: {variant.stock}</Typography>
      ) : (
        <Typography color={'red'} variant="body1">
          out of stock
        </Typography>
      )}
      <Typography variant="h6" sx={{ marginTop: 1 }}>
        Specifications:
      </Typography>
      <ul>
        {variant.centralizedData.specifications.map((spec) => (
          <li key={spec.specKey}>
            <Typography component="span" color="text.primary">
              {spec.key}
            </Typography>
            : {spec.value}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ProductCard;
