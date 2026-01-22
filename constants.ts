
import { Student, User, FacultyMember, FeedbackRecord } from './types';

export const UNIVERSITY_NAME = "Siricha University";
export const UNIVERSITY_ADDRESS = "19-3-2J/F1/A20, K.K. Cheruvu, Renigunta Road, Tirupati, Andhra Pradesh 517501";
export const UNIVERSITY_CONTACT = "+91-8498893907";

export const MOCK_STUDENTS: Student[] = [
  {
    id: 'S001',
    name: 'Alex Johnson',
    email: 'alex@edu.com',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop',
    attendance: 88,
    averageGrade: 92,
    riskLevel: 'Low',
    lastFeedback: "Excellent participation in lab sessions.",
    enrollmentDate: '2022-08-15',
    enrollmentStatus: 'Active',
    department: 'Computer Science',
    semester: '4th Semester',
    remarks: [
      { id: 'R1', authorName: 'Dr. Jane Smith', content: 'Alex shows strong aptitude for algorithmic thinking.', date: '2024-03-10' }
    ],
    performanceHistory: [
      { period: 'Jan', grade: 85, attendance: 90 },
      { period: 'Feb', grade: 88, attendance: 85 },
      { period: 'Mar', grade: 92, attendance: 88 },
    ],
    subjects: [
      { name: 'C Programming', grade: 95, attendance: 90 },
      { name: 'Mathematics', grade: 88, attendance: 85 }
    ]
  },
  {
    id: 'S002',
    name: 'Sarah Miller',
    email: 'sarah@edu.com',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    attendance: 62,
    averageGrade: 68,
    riskLevel: 'High',
    lastFeedback: "Missing consecutive morning lectures.",
    enrollmentDate: '2023-01-10',
    enrollmentStatus: 'Active',
    department: 'Software Engineering',
    semester: '2nd Semester',
    remarks: [
      { id: 'R2', authorName: 'Prof. Robert Brown', content: 'Sarah needs to attend morning labs regularly to keep up with coursework.', date: '2024-04-15' }
    ],
    performanceHistory: [
      { period: 'Jan', grade: 75, attendance: 80 },
      { period: 'Feb', grade: 70, attendance: 70 },
      { period: 'Mar', grade: 68, attendance: 62 },
    ],
    subjects: [
      { name: 'Data Structures', grade: 70, attendance: 60 },
      { name: 'Physics', grade: 65, attendance: 65 }
    ]
  }
];

export const MOCK_FACULTY: FacultyMember[] = [
  {
    id: 'F001',
    name: 'Dr. Jane Smith',
    email: 'jane@faculty.com',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    department: 'Computer Science',
    experience: '15 Years',
    qualifications: 'PhD in Machine Learning (Stanford)',
    knownSubjects: ['Artificial Intelligence', 'C Programming', 'Cloud Computing'],
    assignedSubjects: ['C Programming', 'Mathematics']
  },
  {
    id: 'F002',
    name: 'Prof. Robert Brown',
    email: 'robert@faculty.com',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    department: 'Software Engineering',
    experience: '10 Years',
    qualifications: 'M.Tech in Data Science',
    knownSubjects: ['DBMS', 'SQL', 'Big Data'],
    assignedSubjects: ['DBMS', 'Operating System']
  }
];

export const MOCK_FEEDBACKS: FeedbackRecord[] = [
  {
    id: 'FB001',
    fromName: 'Alex Johnson',
    fromRole: 'Student',
    category: 'Infrastructure',
    content: 'The new computer lab chairs are much more ergonomic. Great upgrade!',
    date: '2024-05-10',
    sentiment: 'Positive'
  },
  {
    id: 'FB002',
    fromName: 'Dr. Jane Smith',
    fromRole: 'Faculty',
    category: 'Curriculum',
    content: 'We need more focus on real-world cloud deployment projects in Semester 4.',
    date: '2024-05-12',
    sentiment: 'Neutral'
  },
  {
    id: 'FB003',
    fromName: 'Sarah Miller',
    fromRole: 'Student',
    category: 'Faculty',
    targetFacultyId: 'F001',
    content: 'Dr. Smith\'s AI lectures are incredibly engaging!',
    date: '2024-05-13',
    sentiment: 'Positive'
  }
];

export const MOCK_USERS: User[] = [
  { id: 'U1', email: 'admin@edu.com', name: 'Siricha Admin', role: 'Admin', password: 'password' },
  { id: 'U2', email: 'jane@faculty.com', name: 'Dr. Jane Smith', role: 'Faculty', password: 'password', facultyId: 'F001' },
  { id: 'U3', email: 'robert@faculty.com', name: 'Prof. Robert Brown', role: 'Faculty', password: 'password', facultyId: 'F002' },
  { id: 'U4', email: 'alex@edu.com', name: 'Alex Johnson', role: 'Student', password: 'password', studentId: 'S001' },
  { id: 'U5', email: 'sarah@edu.com', name: 'Sarah Miller', role: 'Student', password: 'password', studentId: 'S002' },
];

export const MOCK_PERFORMANCE_HISTORY = [
  { month: 'Jan', avgGrade: 72, avgAttendance: 85 },
  { month: 'Feb', avgGrade: 75, avgAttendance: 82 },
  { month: 'Mar', avgGrade: 78, avgAttendance: 80 },
  { month: 'Apr', avgGrade: 74, avgAttendance: 78 },
  { month: 'May', avgGrade: 80, avgAttendance: 84 },
  { month: 'Jun', avgGrade: 82, avgAttendance: 88 },
];
