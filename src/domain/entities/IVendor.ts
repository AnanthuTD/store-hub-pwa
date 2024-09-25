export interface IVendor {
  _id: string;
  bankDetails: {
    accountHolderName: string | null;
    accountNumber: string | null;
    bankName: string | null;
    ifscCode: string | null;
  };
  documents?: {
    imageUrl: string[] | null;
    type: string | null;
    status: 'pending' | 'approved' | 'rejected';
  }[];
  createdAt: string | null;
  email: string | null;
  phone: string | null;
  updatedAt: string | null;
  profile: {
    address: {
      city: string | null;
      country: string | null;
      postalCode: string | null;
      state: string | null;
      street: string | null;
    };
    firstName: string;
    lastName: string;
    avatar: string;
  } | null;
  message?: string;
  emailVerified?: boolean;
  isVerified: boolean;
}
