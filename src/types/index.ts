
export interface Course {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  progress: number;
  studentsCount: number;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'archived';
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  progress: number;
  lastActive: string;
  enrolledCourses: number;
  status: 'active' | 'inactive';
}

export interface Homework {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  dueDate: string;
  submissionsCount: number;
  totalStudents: number;
  status: 'draft' | 'published' | 'completed';
}

export interface Activity {
  id: string;
  type: 'homework_submitted' | 'course_enrolled' | 'question_asked' | 'comment_added';
  title: string;
  description: string;
  timestamp: string;
  user: {
    name: string;
    avatar?: string;
  };
}

export interface DashboardStat {
  title: string;
  value: number | string;
  change?: number;
  icon: React.ReactNode;
}

export interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  active?: boolean;
}
