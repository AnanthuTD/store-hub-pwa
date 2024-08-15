export interface RegisterUser {
  firstName: string;
  lastName: string;
  password: string;
  token: string;
}

export interface SignInParams {
  emailOrMobile: string;
  password: string;
}

export interface User {
  id: string;
  profile: {
    lastName: string;
    firstName: string;
  };
}

export interface SignInResponse {
  data?: User;
  error?: string;
}
