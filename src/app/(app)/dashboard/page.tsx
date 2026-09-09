import React, { useEffect, useState } from 'react';
import StatCard from '@/components/StatCard';
import ProjectCard from '@/components/ProjectCard';
import Button from '@/components/Button';
import type { DashboardStats, DashboardProject, DashboardTask } from '@/lib/types';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [projects, setProjects] = useState<DashboardProject[]>([]);
  const [tasks, setTasks] = useState<DashboardTask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/dashboard');
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Unauthorized');
        }
        const err = await res.text();
        throw new Error(err || 'Failed to load dashboard');
      }
      const data = await res.json();
      setStats(data.stats);
      setProjects(data.projects);
      setTasks(data.recentTasks);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return <p className="text-center">Loading dashboard...</p>;
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500 mb-2">Error: {error}</p>
        <Button onClick={fetchDashboard}>Retry</Button>
      </div>
    );
  }

  if (!stats) {
    return <p>No data available.</p>;
  }

  return (
    <div className="grid gap-4">
      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Projects" value={stats.totalProjects} />
        <StatCard title="Active Projects" value={stats.activeProjects} />
        <StatCard title="Completed Tasks" value={stats.completedTasks} />
        <StatCard title="Team Members" value={stats.totalTeamMembers} />
      </div>

      {/* Recent Projects */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Recent Projects</h2>
        {projects.length === 0 ? (
          <p>No recent projects.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project as any} />
            ))}
          </div>
        )}
      </section>

      {/* Recent Tasks */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Recent Tasks</h2>
        {tasks.length === 0 ? (
          <p>No recent tasks.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-1">
            {tasks.map((task) => (
              <li key={task.id}>
                {task.title} – {task.status}
                {task.project && (
                  <span> (Project: {task.project.name})</span>
                )}
              </li>
            ))}
          </ul>
        )}
        <Button className="mt-2">Add Task</Button>
      </section>
    </div>
  );
}




