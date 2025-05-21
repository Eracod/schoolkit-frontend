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
}
