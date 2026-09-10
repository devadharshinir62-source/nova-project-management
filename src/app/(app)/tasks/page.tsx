"use client"
import { useEffect, useState } from 'react'
import TaskCard from '@/components/TaskCard'
import Button from '@/components/Button'
import ModalWrapper from '@/components/ModalWrapper'
import { Input, Textarea, Select } from '@/components/Input'

type Task = any

interface FilterState {
  status?: string
  priority?: string
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [editTask, setEditTask] = useState<any>(null)
  const [projects, setProjects] = useState<any[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState<string | null>(null);

  // Fetch projects for dropdown
  const fetchProjects = async () => {
    setProjectsLoading(true);
    setProjectsError(null);
    try {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Failed to fetch projects');
      const data = await res.json();
      setProjects(data);
    } catch (e: any) {
      setProjectsError(e.message);
    } finally {
      setProjectsLoading(false);
    }
  };

  const [filters, setFilters] = useState<FilterState>({});


  const fetchTasks = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (filters.status) params.append('status', filters.status)
      if (filters.priority) params.append('priority', filters.priority)
      const res = await fetch(`/api/tasks?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to fetch tasks')
      const data = await res.json()
      setTasks(data)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [filters])

  // Load projects once on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreate = () => {
    setEditTask(null)
    setShowModal(true)
  }

  const openEdit = (task: Task) => {
    setEditTask(task)
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this task?')) return
    try {
      const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      fetchTasks()
    } catch (e: any) {
      alert(e.message)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const payload: any = {
      title: (formData.get('title') as string | null) ?? undefined,
      description: (formData.get('description') as string | null) || undefined,
      projectId: (formData.get('projectId') as string | null) ?? undefined,
      status: (formData.get('status') as string | null) || undefined,
      priority: (formData.get('priority') as string | null) || undefined,
      dueDate: (formData.get('dueDate') as string | null) || undefined,
      assigneeId: (formData.get('assigneeId') as string | null) || undefined,
    };
    // Convert empty strings to undefined for optional fields
    Object.keys(payload).forEach((key) => {
      if (payload[key] === '' || payload[key] === null) {
        payload[key] = undefined;
      }
    });
    try {
      const res = await fetch(editTask ? `/api/tasks/${editTask.id}` : '/api/tasks', {
        method: editTask ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || err.message || 'Save failed');
      }
      setShowModal(false);
      fetchTasks();
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-slate-950 text-slate-100">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Button onClick={openCreate}>New Task</Button>
      </div>
      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <div className="flex flex-col">
          <label className="text-sm mb-1">Status</label>
          <Select
            name="status"
            value={filters.status || ''}
            onChange={e => setFilters({ ...filters, status: e.target.value || undefined })}
          >
            <option value="">All</option>
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </Select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-1">Priority</label>
          <Select
            name="priority"
            value={filters.priority || ''}
            onChange={e => setFilters({ ...filters, priority: e.target.value || undefined })}
          >
            <option value="">All</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </Select>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && tasks.length === 0 && <p>No tasks found.</p>}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map(task => (
          <div key={task.id} className="relative">
            <TaskCard task={task} />
            <div className="absolute top-2 right-2 flex space-x-2">
              <Button variant="secondary" size="sm" onClick={() => openEdit(task)}>
                Edit
              </Button>
              <Button variant="danger" size="sm" onClick={() => handleDelete(task.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <ModalWrapper title={editTask ? 'Edit Task' : 'New Task'} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Title</label>
              <Input name="title" required defaultValue={editTask?.title} />
            </div>
            <div>
              <label className="block mb-1">Description</label>
              <Textarea name="description" defaultValue={editTask?.description} />
            </div>
            {/* Project selection */}
            <div className="flex flex-col">
              <label className="block mb-1">Project</label>
              {projectsLoading ? (
                <p>Loading projects...</p>
              ) : projectsError ? (
                <p className="text-red-500">{projectsError}</p>
              ) : projects.length === 0 ? (
                <p>No projects available. Create a project first.</p>
              ) : (
                <Select name="projectId" required defaultValue={editTask?.projectId}>
                  <option value="">Select a project</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </Select>
              )}
            </div>
            <div>
              <label className="block mb-1">Status</label>
              <Select name="status" defaultValue={editTask?.status}>
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </Select>
            </div>
            <div>
              <label className="block mb-1">Priority</label>
              <Select name="priority" defaultValue={editTask?.priority}>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </Select>
            </div>
            <div>
              <label className="block mb-1">Due Date</label>
              <Input name="dueDate" type="date" defaultValue={editTask?.dueDate?.split('T')[0]} />
            </div>
            <div>
              <label className="block mb-1">Assignee ID</label>
              <Input name="assigneeId" defaultValue={editTask?.assigneeId} />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" onClick={() => setShowModal(false)} variant="secondary">Cancel</Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </ModalWrapper>
      )}
    </div>
  )
}
