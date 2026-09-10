// Server Component – Project Detail Page (Next.js 16 App Router)
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/lib/prisma';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Authenticate
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  // Fetch project directly via Prisma
  const project = await prisma.project.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      status: true,
      progress: true,
      tasks: { select: { id: true } },
      members: { select: { id: true } },
    },
  });

  if (!project) {
    notFound();
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
      <Link href="/projects" className="text-blue-400 hover:underline">
        ← Back to Projects
      </Link>
      <div className="mt-4 space-y-4">
        <h1 className="text-3xl font-bold text-white">{project.name}</h1>
        <span
          className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${statusBadge} uppercase tracking-wider whitespace-nowrap`}
        >
          {project.status}
        </span>
        <p className="text-slate-300">
          {project.description || 'No description provided.'}
        </p>
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
