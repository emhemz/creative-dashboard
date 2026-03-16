'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Project, Task } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ProjectDetailPage() {
  const [project, setProject] = useState<Project | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const loadProject = async () => {
      try {
        const { data: projectData } = await supabase
          .from('projects')
          .select('*')
          .eq('id', params.id)
          .single()

        setProject(projectData)

        if (projectData) {
          const { data: taskData } = await supabase
            .from('tasks')
            .select('*')
            .eq('project_id', projectData.id)
            .order('due_date', { ascending: true })

          setTasks(taskData || [])
        }
      } catch (error) {
        console.error('Error loading project:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProject()
  }, [params.id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!project) {
    return <div>Project not found</div>
  }

  const completedTasks = tasks.filter((t) => t.completed).length
  const taskProgress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0

  return (
    <div className="space-y-6">
      <Link href="/dashboard" className="flex items-center gap-2 text-blue-600 hover:underline dark:text-blue-400">
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{project.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.description && (
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Description</p>
                  <p className="mt-1">{project.description}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Status</p>
                  <p className="mt-1 font-semibold capitalize">{project.status}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Deadline</p>
                  <p className="mt-1 font-semibold">
                    {new Date(project.deadline).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              {tasks.length === 0 ? (
                <p className="text-slate-600 dark:text-slate-400">No tasks yet</p>
              ) : (
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          className="h-4 w-4"
                          readOnly
                        />
                        <div className="flex-1">
                          <p className={task.completed ? 'line-through text-slate-500' : ''}>
                            {task.title}
                          </p>
                          {task.due_date && (
                            <p className="text-xs text-slate-500">
                              Due: {new Date(task.due_date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Financial Info */}
          <Card>
            <CardHeader>
              <CardTitle>Financial</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Budget</p>
                <p className="text-2xl font-bold">${project.budget.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Revenue</p>
                <p className="text-2xl font-bold">${project.revenue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Profit</p>
                <p className={`text-2xl font-bold ${project.revenue - project.budget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${(project.revenue - project.budget).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Task Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Tasks Completed</span>
                  <span>{completedTasks}/{tasks.length}</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${taskProgress}%` }}
                  />
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Time Allocation</p>
                <p className="text-2xl font-bold">{project.time_allocation}%</p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.push('/dashboard')}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
