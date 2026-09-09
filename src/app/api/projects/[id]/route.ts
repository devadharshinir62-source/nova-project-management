import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

// GET /api/projects/:id - retrieve a single project
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { id } = await params;

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
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  const result = {
    id: project.id,
    name: project.name,
    description: project.description ?? '',
    status: project.status,
    progress: project.progress,
    taskCount: project.tasks.length,
    memberCount: project.members.length,
  };
  return NextResponse.json(result);
}

// PUT /api/projects/:id - update a project
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { id } = await params;

  const body = await request.json();
  const { name, description, status } = body;

  if (!name && !description && !status) {
    return NextResponse.json({ error: 'At least one field must be provided' }, { status: 400 });
  }

  const allowedStatuses = ['ACTIVE', 'COMPLETED', 'PAUSED'];
  if (status && !allowedStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
  }

  const updated = await prisma.project.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(description !== undefined && { description }),
      ...(status && { status }),
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
    id: updated.id,
    name: updated.name,
    description: updated.description ?? '',
    status: updated.status,
    progress: updated.progress,
    taskCount: updated.tasks.length,
    memberCount: updated.members.length,
  };
  return NextResponse.json(result);
}

// DELETE /api/projects/:id - delete a project (only if safe)
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.project.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
      return NextResponse.json({ error: 'Cannot delete project with existing tasks or members' }, { status: 409 });
    }
    console.error('Delete project error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
