
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Calendar, 
  LayoutDashboard, 
  BrainCircuit,
  Search,
  Plus,
  LogOut,
  ShieldCheck,
  Sparkles,
  MessageSquare,
  Building,
  Quote,
  Mail,
  Key,
  CheckCircle2,
  Trash2,
  FileText,
  Clock,
  UserPlus,
  Save,
  X,
  UserCheck,
  ChevronRight,
  Target,
  Award,
  Briefcase,
  BookOpen,
  Camera,
  GraduationCap,
  UserMinus,
  Check,
  Filter,
  StickyNote
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line
} from 'recharts';

import { 
  MOCK_STUDENTS as INITIAL_STUDENTS, 
  MOCK_FACULTY as INITIAL_FACULTY,
  MOCK_PERFORMANCE_HISTORY, 
  MOCK_USERS as INITIAL_USERS,
  MOCK_FEEDBACKS as INITIAL_FEEDBACKS,
  UNIVERSITY_NAME 
} from './constants';
import { AcademicInsight, FeedbackData, User, ResourceSuggestion, Student, FacultyMember, FeedbackRecord, StudentRemark } from './types';
import { getAcademicInsights, analyzeFeedback, getResourceOptimization } from './services/gemini';
import DashboardCard from './components/DashboardCard';
import StudentRiskTable from './components/StudentRiskTable';
import AIAssistant from './components/AIAssistant';
import Login from './components/Login';
import StudentProfile from './components/StudentProfile';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'analytics' | 'feedback' | 'resources' | 'staff' | 'manage_marks' | 'manage_attendance'>('dashboard');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [attendanceFocusId, setAttendanceFocusId] = useState<string | null>(null);
  
  // Stateful Data (Simulating Database)
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('simms_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });
  const [faculty, setFaculty] = useState<FacultyMember[]>(() => {
    const saved = localStorage.getItem('simms_faculty');
    return saved ? JSON.parse(saved) : INITIAL_FACULTY;
  });
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('simms_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });
  const [feedbackRecords, setFeedbackRecords] = useState<FeedbackRecord[]>(() => {
    const saved = localStorage.getItem('simms_feedback_records');
    return saved ? JSON.parse(saved) : INITIAL_FEEDBACKS;
  });

  const [insights, setInsights] = useState<AcademicInsight[]>([]);
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
  const [resources, setResources] = useState<ResourceSuggestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mailLog, setMailLog] = useState<{to: string, subject: string, time: string}[]>([]);
  
  // Management Modals/Forms State
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ 
    name: '', 
    email: '', 
    role: 'Student' as User['role'], 
    password: 'password',
    photoUrl: '',
    experience: '',
    qualifications: '',
    department: '',
    major: '', 
    semester: '',
    knownSubjects: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('academia_user');
    if (saved) setCurrentUser(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('simms_students', JSON.stringify(students));
    localStorage.setItem('simms_faculty', JSON.stringify(faculty));
    localStorage.setItem('simms_users', JSON.stringify(users));
    localStorage.setItem('simms_feedback_records', JSON.stringify(feedbackRecords));
  }, [students, faculty, users, feedbackRecords]);

  // Set initial focus for attendance
  useEffect(() => {
    if (activeTab === 'manage_attendance' && !attendanceFocusId && students.length > 0) {
      setAttendanceFocusId(students[0].id);
    }
  }, [activeTab, students]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('academia_user', JSON.stringify(user));
    setSelectedStudentId(null);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('academia_user');
  };

  const studentSelf = useMemo(() => currentUser?.role === 'Student' ? students.find(s => s.id === currentUser.studentId) : null, [currentUser, students]);
  const viewingStudent = useMemo(() => selectedStudentId ? students.find(s => s.id === selectedStudentId) : null, [selectedStudentId, students]);
  const focusStudent = useMemo(() => students.find(s => s.id === attendanceFocusId), [attendanceFocusId, students]);

  // FIX: Added filteredUsers to satisfy the usage in the Institutional Registry (staff tab)
  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return users.filter(user => 
      user.name.toLowerCase().includes(query) || 
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  const stats = useMemo(() => {
    const avgAtt = Math.round(students.reduce((a, b) => a + b.attendance, 0) / (students.length || 1));
    const avgGrd = Math.round(students.reduce((a, b) => a + b.averageGrade, 0) / (students.length || 1));
    return { avgAtt, avgGrd, riskCount: students.filter(s => s.riskLevel === 'High').length };
  }, [students]);

  const simulateEmail = (to: string, subject: string) => {
    const newLog = { to, subject, time: new Date().toLocaleTimeString() };
    setMailLog(prev => [newLog, ...prev].slice(0, 5));
    const toast = document.createElement('div');
    toast.className = "fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl z-[100] animate-bounce text-sm font-bold flex items-center gap-2 border border-slate-700";
    toast.innerHTML = `SIMMS-MAIL: Sent to ${to}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const handleAddRemark = (studentId: string, content: string) => {
    if (!content.trim()) return;
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const newRemark: StudentRemark = {
          id: `REM-${Date.now()}`,
          authorName: currentUser?.name || 'Faculty',
          content,
          date: new Date().toISOString().split('T')[0]
        };
        return { ...s, remarks: [newRemark, ...s.remarks] };
      }
      return s;
    }));
  };

  const handleUpdateGrade = (studentId: string, subjectIndex: number, newGrade: number, notify: boolean = false) => {
    setStudents(prev => prev.map(student => {
      if (student.id === studentId) {
        const updatedSubjects = [...student.subjects];
        updatedSubjects[subjectIndex] = { ...updatedSubjects[subjectIndex], grade: Math.min(100, Math.max(0, newGrade)) };
        const newAvg = Math.round(updatedSubjects.reduce((sum, sub) => sum + sub.grade, 0) / updatedSubjects.length);
        const newRisk: Student['riskLevel'] = (newAvg < 65 || student.attendance < 70) ? 'High' : (newAvg < 80 || student.attendance < 80) ? 'Medium' : 'Low';
        
        if (notify) {
          simulateEmail(student.email, `Academic Score Updated: ${updatedSubjects[subjectIndex].name} Grade Published`);
        }

        return { ...student, subjects: updatedSubjects, averageGrade: newAvg, riskLevel: newRisk };
      }
      return student;
    }));
  };

  const handleUpdateAttendance = (studentId: string, newAttendance: number, notify: boolean = false) => {
    setStudents(prev => prev.map(student => {
      if (student.id === studentId) {
        const clampedVal = Math.min(100, Math.max(0, newAttendance));
        const newRisk: Student['riskLevel'] = (student.averageGrade < 65 || clampedVal < 70) ? 'High' : (student.averageGrade < 80 || clampedVal < 80) ? 'Medium' : 'Low';
        
        if (notify) {
          simulateEmail(student.email, `Attendance Discrepancy Update: ${clampedVal}% Aggregate`);
        }

        return { ...student, attendance: clampedVal, riskLevel: newRisk };
      }
      return student;
    }));
  };

  const markDailyPresence = (studentId: string, present: boolean) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;
    const currentWeight = 30;
    const newVal = Math.round((student.attendance * currentWeight + (present ? 100 : 0)) / (currentWeight + 1));
    handleUpdateAttendance(studentId, newVal, true);
  };

  const fetchData = async () => {
    if (!currentUser) return;
    setIsGenerating(true);
    try {
      const data = await getAcademicInsights(students);
      setInsights(data);
      if (currentUser.role !== 'Student') {
        const fb = await analyzeFeedback(students.map(s => s.lastFeedback));
        setFeedbacks(fb);
        const res = await getResourceOptimization(students);
        setResources(res);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => { fetchData(); }, [currentUser]);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `U${users.length + 1}`;
    let linkedId: string | undefined;

    if (newUser.role === 'Student') {
      linkedId = `S${students.length + 1}`;
      const studentObj: Student = {
        id: linkedId,
        name: newUser.name,
        email: newUser.email,
        photoUrl: newUser.photoUrl || 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&h=400&fit=crop',
        attendance: 0,
        averageGrade: 0,
        riskLevel: 'Medium',
        lastFeedback: 'New Student Enrollment',
        enrollmentDate: new Date().toISOString().split('T')[0],
        enrollmentStatus: 'Active',
        department: newUser.department || 'General Science',
        semester: newUser.semester,
        remarks: [],
        performanceHistory: [],
        subjects: [{ name: 'Core Foundations', grade: 0, attendance: 0 }]
      };
      setStudents([...students, studentObj]);
    } else if (newUser.role === 'Faculty') {
      linkedId = `F${faculty.length + 1}`;
      const facultyObj: FacultyMember = {
        id: linkedId,
        name: newUser.name,
        email: newUser.email,
        photoUrl: newUser.photoUrl || 'https://images.unsplash.com/photo-1544717297-fa154daaf524?w=400&h=400&fit=crop',
        department: newUser.department,
        experience: newUser.experience,
        qualifications: newUser.qualifications,
        knownSubjects: newUser.knownSubjects.split(',').map(s => s.trim()),
        assignedSubjects: []
      };
      setFaculty([...faculty, facultyObj]);
    }

    const userObj: User = { 
      id: newId, 
      name: newUser.name, 
      email: newUser.email, 
      role: newUser.role, 
      password: newUser.password,
      studentId: newUser.role === 'Student' ? linkedId : undefined,
      facultyId: newUser.role === 'Faculty' ? linkedId : undefined
    };
    
    setUsers([...users, userObj]);
    setShowAddUser(false);
    setNewUser({ name: '', email: '', role: 'Student', password: 'password', photoUrl: '', experience: '', qualifications: '', department: '', major: '', semester: '', knownSubjects: '' });
    simulateEmail(newUser.email, "Welcome to Siricha University - Institutional Account Live");
  };

  const handleDeleteUser = (id: string) => {
    const userToDelete = users.find(u => u.id === id);
    if (!userToDelete) return;
    if (window.confirm(`Revoke institutional access for ${userToDelete.name}?`)) {
      setUsers(prev => prev.filter(u => u.id !== id));
      if (userToDelete.studentId) setStudents(prev => prev.filter(s => s.id !== userToDelete.studentId));
      if (userToDelete.facultyId) setFaculty(prev => prev.filter(f => f.id !== userToDelete.facultyId));
      simulateEmail(userToDelete.email, "Institutional Identity Revocation Notice");
    }
  };

  if (!currentUser) return <Login onLogin={handleLogin} />;
  const isFaculty = currentUser.role === 'Faculty';
  const isAdmin = currentUser.role === 'Admin';
  const isFacultyOrAdmin = isAdmin || isFaculty;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col hidden md:flex sticky top-0 h-screen border-r border-slate-800">
        <div className="p-8 flex items-center gap-4 border-b border-slate-800/50">
          <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg">
            <BrainCircuit className="text-white w-7 h-7" />
          </div>
          <div>
            <span className="text-white font-black text-xl tracking-tight block leading-none">SIRICHA</span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">UNIVERSITY</span>
          </div>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="px-5 py-2 text-[10px] font-black text-slate-600 uppercase tracking-widest">Navigation</div>
          <button onClick={() => { setActiveTab('dashboard'); setSelectedStudentId(null); }} className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl transition-all ${activeTab === 'dashboard' && !selectedStudentId ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-slate-800'}`}>
            <LayoutDashboard size={18} /> <span className="text-sm font-semibold">Home Dashboard</span>
          </button>
          {isFacultyOrAdmin && (
            <>
              <div className="px-5 py-2 mt-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">Faculty Controls</div>
              <button onClick={() => { setActiveTab('students'); setSelectedStudentId(null); }} className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl transition-all ${activeTab === 'students' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800'}`}>
                <Users size={18} /> <span className="text-sm font-semibold">Student Tracking</span>
              </button>
              <button onClick={() => { setActiveTab('manage_marks'); setSelectedStudentId(null); }} className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl transition-all ${activeTab === 'manage_marks' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800'}`}>
                <CheckCircle2 size={18} /> <span className="text-sm font-semibold">Grade Dispatch</span>
              </button>
              <button onClick={() => { setActiveTab('manage_attendance'); setSelectedStudentId(null); }} className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl transition-all ${activeTab === 'manage_attendance' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800'}`}>
                <Clock size={18} /> <span className="text-sm font-semibold">Attendance Log</span>
              </button>
              <button onClick={() => { setActiveTab('feedback'); setSelectedStudentId(null); }} className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl transition-all ${activeTab === 'feedback' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800'}`}>
                <MessageSquare size={18} /> <span className="text-sm font-semibold">Feedback Review</span>
              </button>
            </>
          )}
          {isAdmin && (
            <button onClick={() => { setActiveTab('staff'); setSelectedStudentId(null); }} className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl transition-all ${activeTab === 'staff' ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-slate-800'}`}>
              <ShieldCheck size={18} /> <span className="text-sm font-semibold">Staff Identity</span>
            </button>
          )}
        </nav>
        <div className="mx-4 mb-4 p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50">
           <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-1 mb-2">
             <Mail size={12}/> SIMMS-MAILER
           </p>
           {mailLog.length > 0 ? (
             <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
               {mailLog.map((log, i) => (
                 <div key={i} className="text-[9px] text-slate-400 border-l-2 border-indigo-600 pl-2 py-0.5">
                   <span className="text-indigo-300 font-bold block">{log.subject}</span>
                   To: {log.to.split('@')[0]}...
                 </div>
               ))}
             </div>
           ) : <p className="text-[9px] text-slate-500 italic">Idle...</p>}
        </div>
        <div className="p-4 border-t border-slate-800/50">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl hover:bg-rose-500 text-slate-400 hover:text-white transition-all font-black text-[10px] uppercase tracking-widest">
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
            <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">
              {selectedStudentId ? `STUDENT ANALYSIS: ${viewingStudent?.name}` : activeTab.replace('_', ' ')}
            </h1>
          </div>
        </header>

        <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
          {currentUser.role === 'Student' || viewingStudent ? (
            <StudentProfile 
              student={(currentUser.role === 'Student' ? studentSelf : viewingStudent)!} 
              insights={insights}
              onBack={() => setSelectedStudentId(null)}
              showBack={!!viewingStudent}
              currentUserRole={currentUser.role}
              onAddRemark={handleAddRemark}
            />
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <DashboardCard title="Assigned Students" value={students.length} icon={<Users />} />
                  <DashboardCard title="Class Attendance" value={`${stats.avgAtt}%`} icon={<Calendar />} />
                  <DashboardCard title="Avg Course Grade" value={`${stats.avgGrd}%`} icon={<TrendingUp />} trend="+1.2%" />
                  <DashboardCard title="Academic Risk" value={stats.riskCount} icon={<AlertTriangle />} trendColor="text-rose-500" />
                </div>
              )}

              {activeTab === 'manage_attendance' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
                   <div className="lg:col-span-1 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col h-[750px]">
                      <div className="p-10 border-b border-slate-50 flex items-center justify-between">
                         <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Student Roster</h2>
                      </div>
                      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-3">
                         {students.map((student) => (
                            <button 
                               key={student.id}
                               onClick={() => setAttendanceFocusId(student.id)}
                               className={`w-full p-6 rounded-[2rem] flex items-center justify-between transition-all border ${attendanceFocusId === student.id ? 'bg-indigo-600 border-indigo-500 text-white shadow-2xl scale-[1.02]' : 'bg-white border-transparent hover:bg-slate-50 text-slate-600'}`}
                            >
                               <div className="flex items-center gap-4 text-left">
                                  <img src={student.photoUrl} className="w-12 h-12 rounded-2xl object-cover" alt=""/>
                                  <div>
                                     <p className="text-sm font-black truncate max-w-[110px]">{student.name}</p>
                                     <p className={`text-[9px] font-bold uppercase ${attendanceFocusId === student.id ? 'text-indigo-200' : 'text-slate-400'}`}>{student.department}</p>
                                  </div>
                               </div>
                               <div className="text-right">
                                  <p className="text-xs font-black">{student.attendance}%</p>
                                  <ChevronRight size={18} className={attendanceFocusId === student.id ? 'opacity-100' : 'opacity-10'} />
                               </div>
                            </button>
                         ))}
                      </div>
                   </div>
                   <div className="lg:col-span-2">
                      {focusStudent ? (
                        <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                          <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-sm relative overflow-hidden">
                             <div className="flex items-center gap-8 mb-12">
                                <img src={focusStudent.photoUrl} className="w-32 h-32 rounded-[2.5rem] object-cover shadow-2xl" alt=""/>
                                <div>
                                   <h3 className="text-4xl font-black text-slate-900 leading-none mb-4">{focusStudent.name}</h3>
                                   <div className="flex flex-wrap gap-2">
                                      <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full uppercase tracking-widest">{focusStudent.department}</span>
                                      <span className="text-[10px] font-black bg-slate-900 text-white px-4 py-1.5 rounded-full uppercase tracking-widest">{focusStudent.id}</span>
                                   </div>
                                </div>
                             </div>

                             <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                                <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6">Attendance Dispatch Console</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                   <button 
                                      onClick={() => markDailyPresence(focusStudent.id, true)}
                                      className="py-5 bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-200 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                                   >
                                      <Check size={18}/> Save & Email Presence
                                   </button>
                                   <button 
                                      onClick={() => markDailyPresence(focusStudent.id, false)}
                                      className="py-5 bg-rose-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-rose-200 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                                   >
                                      <X size={18}/> Save & Email Absence
                                   </button>
                                </div>
                                <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
                                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Adjustment:</label>
                                   <input type="number" value={focusStudent.attendance} onChange={(e) => handleUpdateAttendance(focusStudent.id, parseInt(e.target.value) || 0, true)} className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 font-black text-slate-900" />
                                </div>
                             </div>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full bg-slate-100/50 rounded-[3rem] border-2 border-dashed border-slate-200 flex items-center justify-center flex-col text-slate-400 font-bold">
                           Select student to manage attendance records
                        </div>
                      )}
                   </div>
                </div>
              )}

              {activeTab === 'manage_marks' && (
                <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm animate-in fade-in duration-500">
                   <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-10 text-center">Semester Grade Dispatch</h2>
                   <div className="overflow-hidden border border-slate-50 rounded-3xl">
                      <table className="w-full text-left">
                        <thead className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50">
                          <tr>
                            <th className="px-8 py-6">Student Profile</th>
                            <th className="px-8 py-6">Course Module</th>
                            <th className="px-8 py-6">Raw Score</th>
                            <th className="px-8 py-6 text-right">Commit Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {students.map(student => (
                            <React.Fragment key={student.id}>
                              {student.subjects.map((sub, sIdx) => (
                                <tr key={`${student.id}-${sIdx}`} className="hover:bg-slate-50 transition-all group">
                                  <td className="px-8 py-6">
                                    <div className="flex items-center gap-4 text-left">
                                       <img src={student.photoUrl} className="w-10 h-10 rounded-xl object-cover" alt=""/>
                                       <div><p className="text-sm font-black text-slate-800">{student.name}</p><p className="text-[10px] font-bold text-slate-400">{student.id}</p></div>
                                    </div>
                                  </td>
                                  <td className="px-8 py-6 text-xs font-black text-slate-600 uppercase">{sub.name}</td>
                                  <td className="px-8 py-6">
                                    <input type="number" value={sub.grade} onChange={(e) => handleUpdateGrade(student.id, sIdx, parseInt(e.target.value) || 0)} className="w-20 px-4 py-2 bg-white border border-slate-200 rounded-xl font-black text-sm" />
                                  </td>
                                  <td className="px-8 py-6 text-right">
                                    <button onClick={() => handleUpdateGrade(student.id, sIdx, sub.grade, true)} className="px-5 py-3 bg-indigo-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center gap-2 ml-auto shadow-md">
                                       <Save size={14}/> Save & Notify
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                   </div>
                </div>
              )}

              {activeTab === 'students' && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-1.5 h-10 bg-indigo-600 rounded-full"></div>
                        <div>
                           <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-none mb-1">Student Progress Dashboard</h2>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{students.length} Active Records</p>
                        </div>
                     </div>
                  </div>
                  <StudentRiskTable students={students} onViewStudent={(id) => setSelectedStudentId(id)} />
                </div>
              )}

              {activeTab === 'feedback' && (
                <div className="space-y-10 animate-in fade-in duration-500">
                   <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col h-[600px]">
                      <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-900 text-white">
                         <h3 className="text-2xl font-black uppercase tracking-tight">Department Feedback Vault</h3>
                         <div className="p-3 bg-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                            <Sparkles size={14} className="text-indigo-400"/> Contextual Reports
                         </div>
                      </div>
                      <div className="flex-1 overflow-y-auto custom-scrollbar p-10 space-y-6 bg-slate-50">
                         {feedbackRecords.filter(f => f.fromRole === 'Student' || f.targetFacultyId === currentUser?.facultyId).map((fb) => (
                            <div key={fb.id} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm relative">
                               <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-3">
                                     <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-xs">
                                        {fb.fromName.charAt(0)}
                                     </div>
                                     <div>
                                        <p className="text-sm font-black text-slate-900">{fb.fromName}</p>
                                        <span className="text-[8px] font-black uppercase tracking-widest text-indigo-600">{fb.category} Feedback</span>
                                     </div>
                                  </div>
                                  <span className={`text-[8px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest ${fb.sentiment === 'Positive' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                                     {fb.sentiment}
                                  </span>
                               </div>
                               <p className="text-xs text-slate-600 leading-relaxed italic font-medium">"{fb.content}"</p>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'staff' && isAdmin && (
                <div className="space-y-8 animate-in fade-in duration-500">
                   {/* User management tab... */}
                   <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex items-center justify-between">
                     <h2 className="text-2xl font-black uppercase tracking-tight">Institutional Registry</h2>
                     <button onClick={() => setShowAddUser(true)} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 shadow-xl hover:scale-105 transition-all">
                       <UserPlus size={18} /> Authorize New Staff
                     </button>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {filteredUsers.map(user => (
                       <div key={user.id} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                          <div className="flex items-center gap-5 mb-8">
                             <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xl">
                                {user.name.charAt(0)}
                             </div>
                             <div>
                                <h3 className="font-black text-slate-900 text-lg leading-none mb-2">{user.name}</h3>
                                <span className="text-[8px] font-black px-3 py-1 bg-indigo-600 text-white rounded-full uppercase tracking-widest">{user.role}</span>
                             </div>
                          </div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase mb-6 italic">{user.email}</p>
                          <button onClick={() => handleDeleteUser(user.id)} className="w-full py-4 bg-rose-50 text-rose-600 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all">Revoke Access</button>
                       </div>
                     ))}
                   </div>
                </div>
              )}
            </>
          )}
        </div>
        <AIAssistant context={{ user: currentUser, students, feedbacks, faculty, feedbackRecords }} />
      </main>
    </div>
  );
};

export default App;
