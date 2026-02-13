
// Local types for admin interface that extend the main types
import { Course, Student } from './student';

export interface CourseWithExtras extends Course {
  enrolledStudents?: number;
  lastUpdated?: string;
}

export interface StudentWithExtras extends Student {
  phone?: string;
  registrationDate?: string;
  subscription?: {
    plan: string;
    startDate: string;
    endDate: string;
    status: string;
  };
  completedCourses?: number;
  totalHours?: number;
  lastLogin?: string;
}
