import { Project, Task, Member } from "./types";

export const members: Member[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Developer" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "Designer" },
  { id: "3", name: "Carol Lee", email: "carol@example.com", role: "Product Manager" },
  { id: "4", name: "David Kim", email: "david@example.com", role: "QA Engineer" },
  { id: "5", name: "Eve Martinez", email: "eve@example.com", role: "DevOps" },
];

export const projects: Project[] = [
  {
    id: "p1",
    name: "Website Redesign",
    description: "Complete redesign of the corporate website.",
    status: "ACTIVE",
    progress: 45,
    taskCount: 6,
    memberCount: 3,
  },
  {
    id: "p2",
    name: "Mobile App",
    description: "Develop a cross‑platform mobile app.",
    status: "ACTIVE",
    progress: 70,
    taskCount: 8,
    memberCount: 4,
  },
  {
    id: "p3",
    name: "Internal Tooling",
    description: "Build internal admin dashboards.",
    status: "PAUSED",
    progress: 30,
    taskCount: 4,
    memberCount: 2,
  },
  {
    id: "p4",
    name: "Marketing Campaign",
    description: "Launch Q4 marketing campaign.",
    status: "COMPLETED",
    progress: 100,
    taskCount: 5,
    memberCount: 3,
  },
];

export const tasks: Task[] = [
  { id: "t3", title: "Implement auth flow", status: "To Do", priority: "High", assigneeId: "1", dueDate: "2026-09-25" },
  { id: "t4", title: "Write unit tests", status: "In Progress", priority: "Low", assigneeId: "4", dueDate: "2026-09-22" },
  { id: "t5", title: "Create API spec", status: "Completed", priority: "Medium", assigneeId: "3", dueDate: "2026-09-10" },
  { id: "t6", title: "User feedback session", status: "To Do", priority: "Low", assigneeId: "3", dueDate: "2026-09-30" },
  { id: "t7", title: "Fix navigation bug", status: "In Progress", priority: "High", assigneeId: "1", dueDate: "2026-09-18" },
  { id: "t8", title: "Optimize images", status: "To Do", priority: "Medium", assigneeId: "2", dueDate: "2026-09-27" },
  { id: "t9", title: "Update documentation", status: "Completed", priority: "Low", assigneeId: "4", dueDate: "2026-09-12" },
  { id: "t10", title: "Release v1.0", status: "To Do", priority: "High", assigneeId: "5", dueDate: "2026-10-05" },
];
