import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

  const url = new URL(request.url);
  const status = url.searchParams.get('status');
  const priority = url.searchParams.get('priority');
  const projectId = url.searchParams.get('projectId');
  const assigneeId = url.searchParams.get('assigneeId');

  const where: any = {};
  if (status) where.status = status;
  if (priority) where.priority = priority;
  if (projectId) where.projectId = projectId;
  if (assigneeId) where.assigneeId = assigneeId;

  const tasks = await prisma.task.findMany({
    where,
    include: {
      project: { select: { id: true, name: true } },
      assignee: { select: { id: true, name: true, email: true, role: true } },
    },
  });
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

  const data = await request.json();
  const { title, projectId, description, status, priority, dueDate, assigneeId } = data;
  if (!title || !projectId) {
    return NextResponse.json({ error: 'title and projectId are required' }, { status: 400 });
  }

  // Verify project exists
  const existingProject = await prisma.project.findUnique({ where: { id: projectId } });
  if (!existingProject) {
    return NextResponse.json({ error: 'Selected project does not exist.' }, { status: 400 });
  }

  const task = await prisma.task.create({
    data: {
      title,
      description,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      project: { connect: { id: projectId } },
      assignee: assigneeId ? { connect: { id: assigneeId } } : undefined,
    },
    include: {
      project: { select: { id: true, name: true } },
      assignee: { select: { id: true, name: true, email: true, role: true } },
    },
  });
  return NextResponse.json(task, { status: 201 });
}
