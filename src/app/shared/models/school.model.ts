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
