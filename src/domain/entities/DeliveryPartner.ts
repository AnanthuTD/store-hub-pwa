export interface IDeliveryPartner {
  _id: string;
  isVerified: boolean;
  firstName: string;
  lastName: string;
  dob: Date;
  city: string;
  address: string;
  avatar: string;
  bloodGroup: string;
  contactInfo: {
    email?: string | null;
    phone?: string | null;
  };
  availability: {
    idAvailable: boolean;
    lastUpdate: string | null;
  };
  createdAt: string | null;
  updatedAt: string | null;
  ratings: {
    averageRating: number | null;
    reviewCount: number | null;
  };

  documents: {
    aadhar: {
      frontImage: string | null;
      backImage: string | null;
    };
    drivingLicense: {
      frontImage: string | null;
      backImage: string | null;
    };
    pan: {
      frontImage: string | null;
      backImage: string | null;
    };
    emergencyContact: {
      relationship: string | null;
      phone: string | null;
      name: string | null;
    };
    vehicle: {
      vehicleType: string;
      vehicleModel: string;
      registrationNumber: string;
      registrationYear: string;
    };
    bankAccountDetails: {
      accountHolderName: string | null;
      ifscCode: string | null;
      accountNumber: string | null;
      bankName: string | null;
    };
  };
}
