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
import { Plus, Zap, TrendingUp, CheckCircle2 } from 'lucide-react'

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome back
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {user?.email?.split('@')[0]}, here's your creative dashboard
          </p>
        </div>
        <Link href="/dashboard/projects/new">
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl h-12 px-6 text-base">
            <Plus className="w-5 h-5 mr-2" /> New Project
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Projects */}
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Projects</h3>
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-slate-900 dark:text-white">{projects.length}</div>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              {projects.filter(p => p.status === 'active').length} active
            </p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Revenue</h3>
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-slate-900 dark:text-white">
              ${projects.reduce((sum, p) => sum + p.revenue, 0).toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              Across all projects
            </p>
          </div>
        </div>

        {/* Completed Projects */}
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Completed</h3>
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-slate-900 dark:text-white">
              {projects.filter(p => p.status === 'completed').length}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              {projects.length > 0 ? Math.round((projects.filter(p => p.status === 'completed').length / projects.length) * 100) : 0}% of all projects
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Projects Grid */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your Projects</h2>
            {projects.length > 0 && (
              <span className="text-sm px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium">
                {projects.length} project{projects.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          {projects.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-slate-400 dark:text-slate-500" />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900 dark:text-white mb-1">No projects yet</p>
                <p className="text-slate-600 dark:text-slate-400 mb-6">Create your first project to get started</p>
              </div>
              <Link href="/dashboard/projects/new">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Plus className="w-4 h-4 mr-2" /> Create Your First Project
                </Button>
              </Link>
            </div>
          ) : (
            <ProjectsGrid projects={projects} onUpdate={() => {}} />
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Time Allocation */}
          {projects.length > 0 && (
            <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Time Allocation</h3>
              <TimeAllocationChart projects={projects} />
            </div>
          )}

          {/* Revenue Tracker */}
          {projects.length > 0 && (
            <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Revenue Breakdown</h3>
              <RevenueTracker projects={projects} />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Grid */}
      {projects.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Task List */}
          <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent Tasks</h3>
            <TaskList projects={projects} />
          </div>

          {/* Calendar */}
          <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Upcoming Deadlines</h3>
            <CalendarWidget projects={projects} />
          </div>
        </div>
      )}
    </div>
  )
}
