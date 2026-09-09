import React from 'react';
import Link from 'next/link';
import ProgressBar from './ProgressBar';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'COMPLETED':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'PAUSED':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-slate-700/30 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 hover:border-blue-500/40 p-5 shadow-lg shadow-blue-950/20 transition-all flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
            {project.name}
          </h3>
          <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadge(project.status)} uppercase tracking-wider whitespace-nowrap`}>
            {project.status}
          </span>
        </div>
        <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {project.description || 'No description provided.'}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-medium">Progress</span>
          <span className="font-bold text-white">{project.progress ?? 0}%</span>
        </div>
        <ProgressBar progress={project.progress ?? 0} />
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            {project.taskCount !== undefined && <span>{project.taskCount} tasks</span>}
            {project.memberCount !== undefined && <span>{project.memberCount} members</span>}
          </div>
          <Link
            href={`/projects/${project.id}`}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition inline-flex items-center gap-1 group-hover:translate-x-0.5"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
