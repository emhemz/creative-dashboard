'use client'

import { Project } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { MoreHorizontal, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

interface ProjectsGridProps {
  projects: Project[]
  onUpdate: () => void
}

export function ProjectsGrid({ projects, onUpdate }: ProjectsGridProps) {
  const [deleting, setDeleting] = useState<string | null>(null)
  const supabase = createClient()

  const handleDelete = async (id: string) => {
    setDeleting(id)
    try {
      await supabase.from('projects').delete().eq('id', id)
      onUpdate()
    } catch (error) {
      console.error('Error deleting project:', error)
    } finally {
      setDeleting(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
      case 'on-hold':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100'
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <Card key={project.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Link href={`/dashboard/projects/${project.id}`}>
                  <CardTitle className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                    {project.name}
                  </CardTitle>
                </Link>
                <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-semibold ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              <button
                onClick={() => handleDelete(project.id)}
                disabled={deleting === project.id}
                className="text-slate-400 hover:text-red-600 dark:hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {project.description && (
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                {project.description}
              </p>
            )}
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-slate-500 dark:text-slate-400">Budget</span>
                <p className="font-semibold">${project.budget.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Revenue</span>
                <p className="font-semibold">${project.revenue.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Deadline: {new Date(project.deadline).toLocaleDateString()}
            </div>
            <Link href={`/dashboard/projects/${project.id}`} className="w-full block">
              <Button variant="outline" className="w-full" size="sm">
                View Details
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
