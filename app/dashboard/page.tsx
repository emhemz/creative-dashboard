'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProjectsGrid } from '@/components/dashboard/projects-grid'
import { TimeAllocationChart } from '@/components/dashboard/time-allocation-chart'
import { RevenueTracker } from '@/components/dashboard/revenue-tracker'
import { TaskList } from '@/components/dashboard/task-list'
import { CalendarWidget } from '@/components/dashboard/calendar-widget'
import { Project } from '@/lib/types'
import Link from 'next/link'

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    const loadData = async () => {
      try {
        // Get user
        const { data: userData } = await supabase.auth.getUser()
        setUser(userData.user)

        // Get projects
        if (userData.user) {
          const { data: projectData } = await supabase
            .from('projects')
            .select('*')
            .eq('user_id', userData.user.id)
            .order('created_at', { ascending: false })

          setProjects(projectData || [])
        }
      } catch (error) {
        console.error('Error loading dashboard:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">Welcome back, {user?.email?.split('@')[0]}!</p>
        </div>
        <Link href="/dashboard/projects/new">
          <Button>+ New Project</Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Total Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${projects.reduce((sum, p) => sum + p.revenue, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Active Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {projects.filter((p) => p.status === 'active').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Projects Grid */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Your Projects</h2>
          {projects.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-slate-600 dark:text-slate-400 mb-4">No projects yet.</p>
                <Link href="/dashboard/projects/new">
                  <Button>Create Your First Project</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <ProjectsGrid projects={projects} onUpdate={() => {}} />
          )}
        </div>

        {/* Time Allocation */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Time Allocation</h2>
          <TimeAllocationChart projects={projects} />
        </div>

        {/* Revenue Tracker */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Revenue Breakdown</h2>
          <RevenueTracker projects={projects} />
        </div>

        {/* Task List */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Tasks</h2>
          <TaskList projects={projects} />
        </div>

        {/* Calendar */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Upcoming Deadlines</h2>
          <CalendarWidget projects={projects} />
        </div>
      </div>
    </div>
  )
}
