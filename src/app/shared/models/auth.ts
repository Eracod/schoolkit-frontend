export interface VerifyEmailResponse {
  email: string;
  exists: boolean;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  state: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  // phoneNumber: 'string';
}

export interface ConfirmEmailRequest {
  userId: string;
  token: string;
  email: string;
}

export interface AuthUser {
  email: string;
  firstName: string;
  institutionId: number;
  lastName: string;
  phoneNumber: string;
  refrehToken: string;
  schoolId: number;
  token: string;
}
