import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const [
    totalProjects,
    activeProjects,
    completedProjects,
    pausedProjects,
    totalTasks,
    todoTasks,
    inProgressTasks,
    completedTasks,
    totalTeamMembers,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { status: 'ACTIVE' } }),
    prisma.project.count({ where: { status: 'COMPLETED' } }),
    prisma.project.count({ where: { status: 'PAUSED' } }),
    prisma.task.count(),
    prisma.task.count({ where: { status: 'TODO' } }),
    prisma.task.count({ where: { status: 'IN_PROGRESS' } }),
    prisma.task.count({ where: { status: 'COMPLETED' } }),
    prisma.user.count(),
  ]);

  const recentProjects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: {
      id: true,
      name: true,
      description: true,
      status: true,
      progress: true,
    },
  });

  const recentTasks = await prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: {
      id: true,
      title: true,
      status: true,
      priority: true,
      dueDate: true,
      project: { select: { id: true, name: true } },
      assignee: { select: { id: true, name: true, email: true, role: true } },
    },
  });

  const responseBody = {
    stats: {
      totalProjects,
      activeProjects,
      completedProjects,
      pausedProjects,
      totalTasks,
      todoTasks,
      inProgressTasks,
      completedTasks,
      totalTeamMembers,
    },
    projects: recentProjects,
    recentTasks,
  };

  return NextResponse.json(responseBody);
}
