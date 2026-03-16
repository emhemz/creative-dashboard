'use client'

import { Project } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'

interface CalendarWidgetProps {
  projects: Project[]
}

export function CalendarWidget({ projects }: CalendarWidgetProps) {
  const upcomingDeadlines = projects
    .filter((p) => new Date(p.deadline) > new Date())
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 5)

  if (upcomingDeadlines.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-slate-600 dark:text-slate-400">
          No upcoming deadlines
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-3">
          {upcomingDeadlines.map((project) => (
            <div key={project.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <p className="font-medium text-sm text-slate-900 dark:text-white">
                {project.name}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {new Date(project.deadline).toLocaleDateString()}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                {formatDistanceToNow(new Date(project.deadline), { addSuffix: true })}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
