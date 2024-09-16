export const validationRules = {
  name: [{ required: true, message: 'Please input the shop name!' }],
  email: [
    { type: 'email', message: 'The input is not valid E-mail!' },
    { required: true, message: 'Please input the E-mail!' },
  ],
  phone: [
    { required: true, message: 'Please input the phone number!' },
    { pattern: /^\d{10}$/, message: 'Phone number must be 10 digits!' },
  ],
  category: [{ required: true, message: 'Please select a category!' }],
  coordinates: [{ required: true, message: 'Please select a location on the map!' }],
};
