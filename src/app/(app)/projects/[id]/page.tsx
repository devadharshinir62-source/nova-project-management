// src/app/(app)/projects/[id]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ProjectDetail {
  id: string;
  name: string;
  description: string;
  status: string;
  progress: number;
  taskCount: number;
  memberCount: number;
}

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/projects/${params.id}`, {
    credentials: 'include',
    next: { revalidate: 0 },
  });

  if (res.status === 404) {
    notFound();
    return null;
  }

  if (!res.ok) {
    const error = await res.text();
    return <div className="p-6">Error: {error}</div>;
  }

  const project: ProjectDetail = await res.json();

  const statusBadge = (() => {
    switch (project.status) {
      case 'ACTIVE':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'COMPLETED':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'PAUSED':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-slate-700/30 text-slate-300 border-slate-700';
    }
  })();

  return (
    <div className="p-6 min-h-screen bg-slate-950 text-slate-100">
      <Link href="/projects" className="text-blue-400 hover:underline">← Back to Projects</Link>
      <div className="mt-4 space-y-4">
        <h1 className="text-3xl font-bold text-white">{project.name}</h1>
        <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${statusBadge} uppercase tracking-wider whitespace-nowrap`}>{project.status}</span>
        <p className="text-slate-300">{project.description || 'No description provided.'}</p>
        <div className="flex gap-4">
          <div className="flex flex-col">
            <span className="font-medium text-slate-400">Progress</span>
            <span className="font-bold text-white">{project.progress ?? 0}%</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-slate-400">Tasks</span>
            <span className="font-bold text-white">{project.taskCount}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-slate-400">Members</span>
            <span className="font-bold text-white">{project.memberCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
