'use client'

import { Project, Task } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle2, Circle } from 'lucide-react'

interface TaskListProps {
  projects: Project[]
}

export function TaskList({ projects }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const supabase = createClient()

  useEffect(() => {
    const loadTasks = async () => {
      if (projects.length === 0) return

      const projectIds = projects.map((p) => p.id)
      const { data } = await supabase
        .from('tasks')
        .select('*')
        .in('project_id', projectIds)
        .eq('completed', false)
        .order('due_date', { ascending: true })
        .limit(5)

      setTasks(data || [])
    }

    loadTasks()
  }, [projects])

  const handleToggleTask = async (taskId: string, completed: boolean) => {
    await supabase.from('tasks').update({ completed: !completed }).eq('id', taskId)
    setTasks(tasks.filter((t) => t.id !== taskId))
  }

  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-slate-600 dark:text-slate-400">
          No pending tasks
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center gap-3 p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-900">
              <button
                onClick={() => handleToggleTask(task.id, task.completed)}
                className="flex-shrink-0"
              >
                {task.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <Circle className="h-5 w-5 text-slate-400" />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                  {task.title}
                </p>
                {task.due_date && (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Due: {new Date(task.due_date).toLocaleDateString()}
                  </p>
                )}
              </div>
              <span className={`text-xs px-2 py-1 rounded ${
                task.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' :
                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' :
                'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100'
              }`}>
                {task.priority}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
