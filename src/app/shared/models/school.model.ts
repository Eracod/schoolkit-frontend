import { User } from './user.model';

export interface SchoolSession {
  session: string;
  term: string;
  status: string;
  startAt: string;
  endAt: string;
}

export interface SchoolClass {
  name: string;
  studentCount: number;
  teacher: User;
}

export interface SchoolSubject {
  name: string;
  teacherCount: number;
  classCount: number;
  studentCount: number;
}

export interface CreateInstitutionRequest {
  name: string;
  address: string;
  email: string;
  contactPhoneNumber: string;
  logoBase64?: string;
  logoFileName?: string;
  website: string;
  description: string;
  motto: string;
  mission: string;
  vision: string;
  coreValues: string;
  tagline: string;
  about: string;
}

export interface CreateInstitutionResponse {
  institutionId: number;
  logoUrl: string;
  name: string;
  token: string;
}
