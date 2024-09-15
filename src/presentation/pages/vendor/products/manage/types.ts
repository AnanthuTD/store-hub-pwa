// src/types/Product.ts

export interface Attribute {
  key: string;
  value: string;
  _id?: string; // Optional, as it may be present in the data
}

export interface Specification {
  key: string;
  value: string;
  _id?: string; // Optional, as it may be present in the data
}

export interface Variant {
  key: string;
  value: string[]; // Array of values for the variant
  _id?: string; // Optional, as it may be present in the data
}

export interface RatingSummary {
  averageRating: number | null;
  totalReview: number;
}

export interface Metadata {
  purchases: number;
  views: number;
}

export interface Product {
  _id: string;
  name: string;
  category: {
    name: string;
    _id: string;
  };
  brand: string;
  storeId: string;
  sku: string;
  stock: number;
  price: number;
  discountedPrice?: number | null; // Optional field
  description: string;
  attributes: Attribute[];
  specifications: Specification[];
  variants: Variant[];
  images: string[]; // Array of image URLs
  status: 'active' | 'inactive';
  metadata: Metadata;
  ratingSummary: RatingSummary;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}
