export const dummyOrder: Order = {
  _id: 'order12345',
  totalAmount: 2500, // Example amount in currency
  items: [
    {
      productId: 'prod1',
      productName: 'Product 1',
      quantity: 2,
    },
    {
      productId: 'prod2',
      productName: 'Product 2',
      quantity: 1,
    },
    {
      productId: 'prod3',
      productName: 'Product 3',
      quantity: 3,
    },
  ],
};

// Example of distance and duration
export const dummyDistance = 1200; // in meters
export const dummyDuration = 15; // in minutes
