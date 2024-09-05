// src/utils/generateDummyPartners.ts
import { faker } from '@faker-js/faker';

// Generates a single dummy delivery partner
const generateDummyPartner = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    _id: faker.string.uuid(),
    isVerified: faker.datatype.boolean(),
    firstName,
    lastName,
    dob: faker.date.birthdate({ min: 18, max: 50, mode: 'age' }),
    city: faker.location.city(),
    address: faker.location.streetAddress(),
    avatar: faker.image.avatar(),
    bloodGroup: faker.helpers.arrayElement(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
    email: faker.internet.email({ firstName, lastName }),
    phone: faker.phone.number(),
    availability: {
      idAvailable: faker.datatype.boolean(),
      lastUpdate: faker.date.recent().toISOString(),
    },
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    ratings: {
      averageRating: parseFloat(faker.string.numeric({ min: 1, max: 5, precision: 0.1 })),
      reviewCount: faker.number.int({ min: 0, max: 100 }),
    },
    documents: {
      aadhar: {
        frontImage: faker.image.url(),
        backImage: faker.image.url(),
      },
      drivingLicense: {
        frontImage: faker.image.url(),
        backImage: faker.image.url(),
      },
      pan: {
        frontImage: faker.image.url(),
        backImage: faker.image.url(),
      },
      emergencyContact: {
        relationship: faker.helpers.arrayElement(['Father', 'Mother', 'Spouse', 'Friend']),
        phone: faker.phone.number({ style: 'national' }),
        name: faker.person.fullName(),
      },
      vehicle: {
        vehicleType: faker.helpers.arrayElement(['Bike', 'Car', 'Scooter']),
        vehicleModel: faker.vehicle.model(),
        registrationNumber: faker.vehicle.vrm(),
        registrationYear: faker.date.past({ years: 10 }).getFullYear().toString(),
      },
      bankAccountDetails: {
        accountHolderName: `${firstName} ${lastName}`,
        ifscCode: `SBIN${faker.number.int({ min: 100000, max: 999999 })}`,
        accountNumber: faker.finance.accountNumber(),
        bankName: faker.helpers.arrayElement([
          'State Bank of India',
          'HDFC Bank',
          'ICICI Bank',
          'Axis Bank',
        ]),
      },
    },
  };
};

// Generates a list of dummy delivery partners
const generateDummyPartners = (count: number = 10) => {
  return Array.from({ length: count }, () => generateDummyPartner());
};

export default generateDummyPartners;
