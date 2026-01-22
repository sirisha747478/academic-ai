
import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendColor?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, trend, trendColor }) => {
  return (
    <div className="bg-white p-7 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group">
      <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
        {React.cloneElement(icon as React.ReactElement, { size: 24 })}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1 truncate">{title}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">{value}</h3>
          {trend && (
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${trendColor || 'text-emerald-500'} bg-slate-50`}>
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
