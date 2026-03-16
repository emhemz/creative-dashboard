export interface User {
  id: string
  email: string
  created_at: string
}

export interface Project {
  id: string
  user_id: string
  name: string
  description: string | null
  budget: number
  revenue: number
  deadline: string
  status: 'active' | 'completed' | 'on-hold'
  time_allocation: number // percentage
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  project_id: string
  title: string
  description: string | null
  completed: boolean
  due_date: string | null
  priority: 'low' | 'medium' | 'high'
  created_at: string
  updated_at: string
}

export interface Integration {
  id: string
  user_id: string
  type: 'notion' | 'calendar' | 'slack'
  access_token: string | null
  config: Record<string, any>
  created_at: string
  updated_at: string
}

export interface DashboardStats {
  totalProjects: number
  activeProjects: number
  totalBudget: number
  totalRevenue: number
  totalTasks: number
  completedTasks: number
}
