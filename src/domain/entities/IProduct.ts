export interface IVariantSpecification {
  key: string; // e.g., "Weight", "Battery Life"
  value: string; // e.g., "200g", "12 hours"
}

// Define the interface for dynamic variant options
export interface IVariantOption {
  key: string; // e.g., "Size", "Color", "Storage"
  value: string; // e.g., "M", "Red", "128GB"
}

// Define the interface for a product variant
export interface IVariant {
  _id: string;
  options: IVariantOption[]; // Dynamic variant options like size, color, etc.
  specifications?: IVariantSpecification[];
}

// Define the interface for a product document with variants
export interface IProduct {
  _id: string;
  description: string;
  category: string;
  name: string;
  brand: string;
  brandId: string;
  images: string[];
  rating: number;
  popularity: number;
  variants: IVariant[];
}
