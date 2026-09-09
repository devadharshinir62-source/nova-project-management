import React from 'react';
import Link from 'next/link';
import ProgressBar from './ProgressBar';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{project.description}</p>
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>Status: {project.status}</span>
        <span>{project.taskCount} tasks</span>
        <span>{project.memberCount} members</span>
      </div>
      <ProgressBar progress={project.progress} />
      <Link
        href={`/projects/${project.id}`}
        className="mt-3 text-sm text-blue-600 hover:underline self-end"
      >
        View Details
      </Link>
    </div>
  );
}
