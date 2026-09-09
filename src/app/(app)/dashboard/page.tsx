'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import StatCard from '@/components/StatCard';
import ProjectCard from '@/components/ProjectCard';
import ProgressBar from '@/components/ProgressBar';
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
      setProjects(data.projects || []);
      setTasks(data.recentTasks || []);
    } catch (e: any) {
      setError(e.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // Status color mapper for tasks
  const getTaskStatusStyle = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'IN_PROGRESS':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'TODO':
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  // Priority color mapper for tasks
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'MEDIUM':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'LOW':
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  // 1. Loading Skeleton State
  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        {/* Welcome skeleton */}
        <div className="space-y-2">
          <div className="h-8 w-64 bg-slate-800/80 rounded-xl" />
          <div className="h-4 w-96 bg-slate-800/50 rounded-lg" />
        </div>

        {/* Stats grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 space-y-3">
              <div className="h-3 w-20 bg-slate-800 rounded" />
              <div className="h-7 w-12 bg-slate-800 rounded" />
            </div>
          ))}
        </div>

        {/* Project & task skeletons */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-72 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6" />
          <div className="h-72 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6" />
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 rounded-2xl border border-rose-500/30 bg-slate-900 text-center space-y-4 shadow-xl">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-white">Dashboard Error</h3>
        <p className="text-sm text-slate-400">{error}</p>
        <button
          onClick={fetchDashboard}
          className="px-5 py-2.5 rounded-xl font-semibold bg-blue-600 hover:bg-blue-500 text-white text-sm shadow-md transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-16 text-slate-400">
        <p>No dashboard statistics available.</p>
      </div>
    );
  }

  // Calculate overall task progress percentage
  const taskCompletionRate = stats.totalTasks > 0
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
    : 0;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Welcome Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Good to see you <span className="inline-block animate-bounce">👋</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Here&apos;s what&apos;s happening across your projects today.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 transition hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>New Project</span>
          </Link>
          <Link
            href="/tasks"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 transition"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>View Tasks</span>
          </Link>
          <Link
            href="/team"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 transition"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>View Team</span>
          </Link>
        </div>
      </div>

      {/* 2. Core Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Total Projects"
          value={stats.totalProjects}
          subtitle={`${stats.activeProjects} active initiatives`}
          icon={
            <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
        />
        <StatCard
          title="Active Projects"
          value={stats.activeProjects}
          subtitle={`${stats.completedProjects} completed`}
          icon={
            <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        />
        <StatCard
          title="Completed Tasks"
          value={stats.completedTasks}
          subtitle={`${stats.inProgressTasks} in progress`}
          icon={
            <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title="Team Members"
          value={stats.totalTeamMembers}
          subtitle="Collaborating contributors"
          icon={
            <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />
      </div>

      {/* 3. Team Progress & Throughput Overview */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-blue-950/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">Team Throughput & Progress</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Task delivery velocity across active projects.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-blue-400">{taskCompletionRate}%</span>
            <span className="text-xs text-slate-400">completion rate</span>
          </div>
        </div>

        <ProgressBar progress={taskCompletionRate} />

        <div className="grid grid-cols-3 gap-3 pt-5 mt-4 border-t border-slate-800/80 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800">
            <span className="text-slate-400 block font-medium">To Do</span>
            <span className="text-base font-bold text-slate-200 mt-0.5 block">{stats.todoTasks}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800">
            <span className="text-blue-400 block font-medium">In Progress</span>
            <span className="text-base font-bold text-blue-400 mt-0.5 block">{stats.inProgressTasks}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800">
            <span className="text-emerald-400 block font-medium">Completed</span>
            <span className="text-base font-bold text-emerald-400 mt-0.5 block">{stats.completedTasks}</span>
          </div>
        </div>
      </div>

      {/* 4. Project Overview Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">Project Overview</h2>
            <p className="text-xs text-slate-400">Recently created and active workspaces.</p>
          </div>
          <Link
            href="/projects"
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition inline-flex items-center gap-1"
          >
            All Projects →
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-white">No projects yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Create your first project to start organizing your team&apos;s work.
            </p>
            <div className="pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md transition"
              >
                Create Project
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project as any} />
            ))}
          </div>
        )}
      </section>

      {/* 5. Recent Tasks Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">Recent Tasks</h2>
            <p className="text-xs text-slate-400">Latest updates across task rosters.</p>
          </div>
          <Link
            href="/tasks"
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition inline-flex items-center gap-1"
          >
            All Tasks →
          </Link>
        </div>

        {tasks.length === 0 ? (
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-white">No recent tasks</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Tasks will appear here as your team creates, assigns, and updates them.
            </p>
            <div className="pt-2">
              <Link
                href="/tasks"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md transition"
              >
                Add Task
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-lg shadow-blue-950/20 divide-y divide-slate-800/80">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/30 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-sm sm:text-base font-bold text-white">{task.title}</span>
                    {task.project && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 border border-slate-700 text-slate-300">
                        {task.project.name}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    {task.assignee && (
                      <span className="flex items-center gap-1">
                        <span className="text-slate-500">Assignee:</span>
                        <span className="text-slate-300 font-medium">{task.assignee.name}</span>
                      </span>
                    )}
                    {task.dueDate && (
                      <span className="flex items-center gap-1">
                        <span className="text-slate-500">Due:</span>
                        <span className="text-slate-300 font-medium">
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getPriorityStyle(
                      task.priority
                    )} uppercase tracking-wider`}
                  >
                    {task.priority}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getTaskStatusStyle(
                      task.status
                    )} uppercase tracking-wider`}
                  >
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
