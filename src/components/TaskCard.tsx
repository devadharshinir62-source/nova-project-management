import React from 'react';
import { Task } from '@/lib/types';
import { members } from '@/lib/mockData';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const assignee = members.find((m) => m.id === task.assigneeId);
  return (
    <div className="bg-white rounded p-3 shadow mb-2">
      <h4 className="font-semibold">{task.title}</h4>
      <p className="text-sm text-gray-500">Priority: {task.priority}</p>
      <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
      {assignee && (
        <p className="text-sm text-gray-500">Assignee: {assignee.name}</p>
      )}
    </div>
  );
}
