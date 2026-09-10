"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ProjectDetail {
  id: string;
  name: string;
  description: string;
  status: string;
  progress: number;
  tasks: { id: string }[];
  members: { id: string }[];
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${params.id}`, { credentials: 'include', next: { revalidate: 0 } });
        if (res.status === 404) {
          router.replace('/404');
          return;
        }
        if (!res.ok) {
          const errText = await res.text();
          throw new Error(errText || 'Failed to load project');
        }
        const data: ProjectDetail = await res.json();
        setProject(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [params.id, router]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }
  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }
  if (!project) {
    return null;
  }

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
            <span className="font-bold text-white">{project.tasks.length}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-slate-400">Members</span>
            <span className="font-bold text-white">{project.members.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
