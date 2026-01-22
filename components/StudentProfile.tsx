
import React, { useState } from 'react';
import { Student, AcademicInsight, UserRole } from '../types';
import { UNIVERSITY_NAME, UNIVERSITY_ADDRESS } from '../constants';
import { 
  GraduationCap, 
  ArrowLeft,
  Mail,
  Printer,
  FileText,
  BrainCircuit,
  Building,
  StickyNote,
  Send,
  History,
  TrendingUp,
  Award,
  AlertTriangle
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area
} from 'recharts';

interface Props {
  student: Student;
  insights: AcademicInsight[];
  onBack?: () => void;
  showBack?: boolean;
  currentUserRole?: UserRole;
  onAddRemark?: (studentId: string, content: string) => void;
}

const StudentProfile: React.FC<Props> = ({ student, insights, onBack, showBack, currentUserRole, onAddRemark }) => {
  const [newRemark, setNewRemark] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'transcript' | 'analytics' | 'remarks'>('transcript');

  const handlePrint = () => window.print();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div className="flex items-center justify-between no-print">
        {showBack && (
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold text-sm transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Institutional Directory
          </button>
        )}
        <div className="flex gap-3">
           <button className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 text-xs font-bold shadow-sm">
              <Mail size={16}/> Dispatch Dossier
           </button>
           <button onClick={handlePrint} className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2 text-xs font-bold shadow-lg">
              <Printer size={16}/> Print Certificate
           </button>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-200 overflow-hidden relative min-h-[800px] flex flex-col">
        {/* Header - Fixed to student ID card style */}
        <div className="bg-slate-900 text-white p-12 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden shrink-0">
           <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full translate-x-1/2 -translate-y-1/2" />
           <div className="flex items-center gap-8 relative z-10">
              <img src={student.photoUrl} className="w-32 h-32 rounded-[2.5rem] object-cover border-4 border-white/20 shadow-2xl" alt=""/>
              <div>
                 <h2 className="text-4xl font-black tracking-tight leading-none mb-4 uppercase">{student.name}</h2>
                 <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] font-black bg-indigo-600 text-white px-4 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-2"><Building size={12}/> {student.department}</span>
                    <span className="text-[10px] font-black bg-white/10 text-slate-300 px-4 py-1.5 rounded-full uppercase tracking-widest">{student.id}</span>
                 </div>
              </div>
           </div>
           <div className="text-center md:text-right relative z-10">
              <BrainCircuit size={48} className="text-indigo-500 mb-4 ml-auto" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Semester 2024</p>
           </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-12 py-6 border-b border-slate-100 flex gap-10 no-print bg-slate-50/50">
           {['transcript', 'analytics', 'remarks'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveSubTab(tab as any)}
                className={`text-xs font-black uppercase tracking-widest pb-2 border-b-2 transition-all ${activeSubTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                {tab}
              </button>
           ))}
        </div>

        <div className="p-12 flex-1">
           {activeSubTab === 'transcript' && (
              <div className="animate-in fade-in duration-300 space-y-10">
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Aggregate Grade</span>
                       <p className="text-2xl font-black text-slate-900">{student.averageGrade}%</p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Class Attendance</span>
                       <p className="text-2xl font-black text-indigo-600">{student.attendance}%</p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Risk Factor</span>
                       <p className={`text-2xl font-black ${student.riskLevel === 'Low' ? 'text-emerald-500' : 'text-rose-500'}`}>{student.riskLevel}</p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Courses</span>
                       <p className="text-2xl font-black text-slate-900">{student.subjects.length}</p>
                    </div>
                 </div>

                 <div className="overflow-hidden border border-slate-100 rounded-[2.5rem] shadow-sm">
                    <table className="w-full text-left">
                       <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <tr>
                             <th className="px-8 py-6">Course Module</th>
                             <th className="px-8 py-6">Earned Score</th>
                             <th className="px-8 py-6">Attendance</th>
                             <th className="px-8 py-6 text-right">Academic Standing</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50">
                          {student.subjects.map((sub, i) => (
                             <tr key={i} className="text-sm">
                                <td className="px-8 py-6 font-bold text-slate-800 uppercase tracking-tight">{sub.name}</td>
                                <td className="px-8 py-6 font-black text-base">{sub.grade}</td>
                                <td className="px-8 py-6 font-black text-slate-500">{sub.attendance}%</td>
                                <td className="px-8 py-6 text-right">
                                   <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${sub.grade >= 40 ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                                      {sub.grade >= 40 ? 'Qualified' : 'Deficient'}
                                   </span>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           )}

           {activeSubTab === 'analytics' && (
              <div className="animate-in fade-in duration-300 space-y-10">
                 <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
                    <div className="flex items-center justify-between mb-10">
                       <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
                          <TrendingUp size={16} className="text-indigo-600"/> Growth Trajectory
                       </h4>
                       <div className="flex gap-4">
                          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase"><div className="w-2 h-2 rounded-full bg-indigo-600"></div> Grade</div>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Attendance</div>
                       </div>
                    </div>
                    <div className="h-64 w-full">
                       <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={student.performanceHistory}>
                             <defs>
                                <linearGradient id="colorGrade" x1="0" y1="0" x2="0" y2="1">
                                   <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                                   <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                                </linearGradient>
                             </defs>
                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                             <XAxis dataKey="period" hide />
                             <YAxis hide domain={[0, 100]} />
                             <Tooltip 
                               contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                               itemStyle={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase' }}
                             />
                             <Area type="monotone" dataKey="grade" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorGrade)" />
                             <Area type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={4} fillOpacity={0} />
                          </AreaChart>
                       </ResponsiveContainer>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
                       <Award size={24} className="text-amber-500 mb-4" />
                       <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Strengths Identified</h5>
                       <p className="text-sm font-bold text-slate-700">Consistent upward trend in academic scores. Strong participation in department activities.</p>
                    </div>
                    <div className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
                       <AlertTriangle size={24} className="text-rose-500 mb-4" />
                       <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Intervention Required</h5>
                       <p className="text-sm font-bold text-slate-700">Attendance instability in morning sessions. Requires mentoring for Physics module.</p>
                    </div>
                 </div>
              </div>
           )}

           {activeSubTab === 'remarks' && (
              <div className="animate-in fade-in duration-300 space-y-8">
                 {currentUserRole === 'Faculty' && (
                    <div className="bg-slate-900 rounded-[2.5rem] p-10">
                       <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6">Append Professional Remark</h4>
                       <div className="flex gap-4">
                          <textarea 
                             value={newRemark}
                             onChange={(e) => setNewRemark(e.target.value)}
                             placeholder="Document your observations for this student..."
                             className="flex-1 bg-white/10 border border-white/20 rounded-[1.5rem] p-5 text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none h-24"
                          />
                          <button 
                             onClick={() => { onAddRemark?.(student.id, newRemark); setNewRemark(''); }}
                             className="p-5 bg-indigo-600 text-white rounded-2xl self-end hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20"
                          >
                             <Send size={24}/>
                          </button>
                       </div>
                    </div>
                 )}

                 <div className="space-y-6">
                    {student.remarks.length > 0 ? student.remarks.map((rem) => (
                       <div key={rem.id} className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm flex items-start gap-6 group">
                          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0">
                             <StickyNote size={20} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
                          </div>
                          <div>
                             <div className="flex items-center gap-3 mb-2">
                                <span className="text-sm font-black text-slate-900">{rem.authorName}</span>
                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{rem.date}</span>
                             </div>
                             <p className="text-sm text-slate-600 font-medium leading-relaxed">"{rem.content}"</p>
                          </div>
                       </div>
                    )) : (
                       <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 text-slate-400 italic font-bold">
                          No institutional remarks recorded to date.
                       </div>
                    )}
                 </div>
              </div>
           )}
        </div>

        {/* Footer */}
        <div className="p-12 bg-slate-50 border-t border-slate-100 flex justify-between items-center shrink-0">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Authorized By</p>
                 <p className="text-sm font-black text-slate-900 uppercase">Institutional Academic Board</p>
              </div>
           </div>
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Digital Certificate ID: {student.id}-SIMMS-2024</p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
