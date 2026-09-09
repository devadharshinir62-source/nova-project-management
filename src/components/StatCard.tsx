import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  subtitle?: string;
}

export default function StatCard({ title, value, icon, subtitle }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-blue-950/20 hover:border-slate-700/80 transition hover:scale-[1.01] flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</p>
        <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight">{value}</p>
        {subtitle && <p className="text-xs text-slate-500 mt-1 font-medium">{subtitle}</p>}
      </div>
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-300">
          {icon}
        </div>
      )}
    </div>
  );
}
