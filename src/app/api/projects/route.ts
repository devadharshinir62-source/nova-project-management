import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const projects = await prisma.project.findMany({
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
  const result = projects.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description ?? '',
    status: p.status,
    progress: p.progress,
    taskCount: p.tasks.length,
    memberCount: p.members.length,
  }));
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const body = await request.json();
  const { name, description, status } = body;
  if (!name) {
    return NextResponse.json({ error: 'Missing required field: name' }, { status: 400 });
  }
  const projectStatus = status ?? 'ACTIVE';
  const allowedStatuses = ['ACTIVE', 'COMPLETED', 'PAUSED'];
  if (!allowedStatuses.includes(projectStatus)) {
    return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
  }
  const project = await prisma.project.create({
    data: {
      name,
      description: description ?? '',
      status: projectStatus,
    },
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
  const result = {
    id: project.id,
    name: project.name,
    description: project.description ?? '',
    status: project.status,
    progress: project.progress,
    taskCount: project.tasks.length,
    memberCount: project.members.length,
  };
  return NextResponse.json(result, { status: 201 });
}
