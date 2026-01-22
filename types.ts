
export type UserRole = 'Admin' | 'Faculty' | 'Student';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  password?: string;
  studentId?: string;
  facultyId?: string;
}

export interface StudentRemark {
  id: string;
  authorName: string;
  content: string;
  date: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  attendance: number;
  averageGrade: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  lastFeedback: string;
  enrollmentDate?: string;
  enrollmentStatus?: 'Active' | 'On Leave' | 'Graduated' | 'Suspended';
  major?: string;
  department: string;
  semester?: string;
  remarks: StudentRemark[]; // New field for faculty notes
  performanceHistory: {
    period: string;
    grade: number;
    attendance: number;
  }[];
  subjects: {
    name: string;
    grade: number;
    attendance: number;
  }[];
}

export interface FacultyMember {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  department: string;
  assignedSubjects: string[];
  experience: string;
  qualifications: string;
  knownSubjects: string[];
}

export interface FeedbackRecord {
  id: string;
  fromName: string;
  fromRole: UserRole;
  category: 'Infrastructure' | 'Curriculum' | 'Faculty' | 'General';
  targetFacultyId?: string; // Feedback can now be targeted
  content: string;
  date: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
}

export interface AcademicInsight {
  title: string;
  description: string;
  impact: 'Positive' | 'Neutral' | 'Negative';
  action: string;
}

export interface FeedbackData {
  category: string;
  sentiment: number;
  comments: string[];
  keyPhrases: string[];
  aiSummary: string;
  trend: 'Improving' | 'Declining' | 'Stable';
}

export interface ResourceSuggestion {
  title: string;
  currentStatus: string;
  suggestion: string;
  expectedBenefit: string;
}
