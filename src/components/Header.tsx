'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname() ?? '/';

  const getHeaderDetails = () => {
    if (pathname.includes('/dashboard')) {
      return {
        title: 'Dashboard',
        subtitle: "Track your team's work, velocity, and delivery progress.",
      };
    }
    if (pathname.includes('/projects')) {
      return {
        title: 'Projects',
        subtitle: 'Manage workspaces and monitor project milestones.',
      };
    }
    if (pathname.includes('/tasks')) {
      return {
        title: 'Tasks',
        subtitle: 'Assign, prioritize, and track task execution.',
      };
    }
    if (pathname.includes('/team')) {
      return {
        title: 'Team',
        subtitle: 'Manage collaborators and project memberships.',
      };
    }
    if (pathname.includes('/settings')) {
      return {
        title: 'Settings',
        subtitle: 'Configure platform preferences and workspace environment.',
      };
    }
    const clean = pathname.replace('/', '') || 'Workspace';
    return {
      title: clean.charAt(0).toUpperCase() + clean.slice(1),
      subtitle: 'NOVA Team Productivity Platform',
    };
  };

  const { title, subtitle } = getHeaderDetails();

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/75 backdrop-blur-md px-4 sm:px-8 py-4 flex items-center justify-between z-10">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{title}</h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-normal">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-800 bg-slate-900 text-xs font-medium text-slate-300 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Operational</span>
        </div>
      </div>
    </header>
  );
}
