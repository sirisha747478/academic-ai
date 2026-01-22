
import React from 'react';
import { Student } from '../types';
import { ArrowUpRight, GraduationCap } from 'lucide-react';

interface Props {
  students: Student[];
  onViewStudent?: (id: string) => void;
}

const StudentRiskTable: React.FC<Props> = ({ students, onViewStudent }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50/80 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-100">
          <tr>
            <th className="px-8 py-5">Profile</th>
            <th className="px-8 py-5">Engagement</th>
            <th className="px-8 py-5">Performance</th>
            <th className="px-8 py-5">Academic Status</th>
            <th className="px-8 py-5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-slate-50/80 transition-all group">
              <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{student.name}</div>
                    <div className="text-xs text-slate-400 font-medium">{student.id}</div>
                  </div>
                </div>
              </td>
              <td className="px-8 py-6">
                <div className="flex items-center gap-3">
                  <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${student.attendance < 75 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                      style={{ width: `${student.attendance}%` }} 
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-600">{student.attendance}%</span>
                </div>
              </td>
              <td className="px-8 py-6">
                <div className="flex flex-col">
                  <span className="text-sm font-black text-slate-800">{student.averageGrade}%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{student.subjects.length} Active Courses</span>
                </div>
              </td>
              <td className="px-8 py-6">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  student.riskLevel === 'High' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                  student.riskLevel === 'Medium' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                  'bg-emerald-50 text-emerald-600 border border-emerald-100'
                }`}>
                  {student.riskLevel} Risk
                </span>
              </td>
              <td className="px-8 py-6 text-right">
                <button 
                  onClick={() => onViewStudent?.(student.id)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm"
                >
                  Full Report <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentRiskTable;
