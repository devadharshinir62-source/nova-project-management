import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/lib/prisma';

// GET /api/tasks/[id]
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

  const { id } = await context.params;
  const task = await prisma.task.findUnique({
    where: { id },
    include: {
      project: { select: { id: true, name: true } },
      assignee: { select: { id: true, name: true, email: true, role: true } },
    },
  });
  if (!task) return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  return NextResponse.json(task);
}

// PUT /api/tasks/[id] – partial update
export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

  const { id } = await context.params;
  // Verify task exists first
  const existing = await prisma.task.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Task not found' }, { status: 404 });

  const data = await request.json();
  const { title, description, status, priority, dueDate, assigneeId, projectId } = data;

  const updateData: any = {};

  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (status !== undefined) updateData.status = status;
  if (priority !== undefined) updateData.priority = priority;

  // dueDate handling – can be set, cleared (null), or omitted
  if (Object.prototype.hasOwnProperty.call(data, 'dueDate')) {
    if (dueDate === null) {
      updateData.dueDate = null;
    } else if (dueDate) {
      updateData.dueDate = new Date(dueDate);
    }
  }

  // assigneeId handling – connect, disconnect (null), or omit
  if (Object.prototype.hasOwnProperty.call(data, 'assigneeId')) {
    if (assigneeId === null) {
      updateData.assignee = { disconnect: true };
    } else if (assigneeId) {
      updateData.assignee = { connect: { id: assigneeId } };
    }
  }

  // projectId – reconnect when supplied (null not supported)
  if (projectId !== undefined) {
    updateData.project = { connect: { id: projectId } };
  }

  const updated = await prisma.task.update({
    where: { id },
    data: updateData,
    include: {
      project: { select: { id: true, name: true } },
      assignee: { select: { id: true, name: true, email: true, role: true } },
    },
  });
  return NextResponse.json(updated);
}

// DELETE /api/tasks/[id]
export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

  const { id } = await context.params;
  // Verify task exists before deletion
  const existing = await prisma.task.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Task not found' }, { status: 404 });

  await prisma.task.delete({ where: { id } });
  return new Response(null, { status: 204 });
}
