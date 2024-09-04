import React from 'react';
import BannerSlider, { Item } from './BannerSlider';

// Function to create a list of products for a given category
function createList(): Item[] {
  return Array.from({ length: 10 }, () => ({
    image: '/offer-banner.png',
    href: '#',
    alt: '',
  }));
}

function CouponSlider() {
  return <BannerSlider key={'coupon-slider'} items={createList()} />;
}

export default CouponSlider;
