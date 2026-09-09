export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'ACTIVE' | 'COMPLETED' | 'PAUSED';
  progress: number; // 0-100
  taskCount: number;
  memberCount: number;
}

export interface Task {
  id: string;
  title: string;
  status: 'To Do' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  assigneeId: string;
  dueDate: string; // ISO date
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}
export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  pausedProjects: number;
  totalTasks: number;
  todoTasks: number;
  inProgressTasks: number;
  completedTasks: number;
  totalTeamMembers: number;
}

export interface DashboardProject {
  id: string;
  name: string;
  description: string | null;
  status: 'ACTIVE' | 'COMPLETED' | 'PAUSED';
  progress: number | null;
}

export interface DashboardTask {
  id: string;
  title: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate: string | null;
  project?: { id: string; name: string } | null;
  assignee?: { id: string; name: string; email: string; role: string } | null;
}
