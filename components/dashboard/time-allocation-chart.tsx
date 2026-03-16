'use client'

import { Project } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'

interface TimeAllocationChartProps {
  projects: Project[]
}

export function TimeAllocationChart({ projects }: TimeAllocationChartProps) {
  const data = projects
    .filter((p) => p.status === 'active')
    .map((p) => ({
      name: p.name,
      value: p.time_allocation || 0,
    }))
    .filter((d) => d.value > 0)

  const COLORS = [
    '#3b82f6',
    '#10b981',
    '#f59e0b',
    '#ef4444',
    '#8b5cf6',
    '#ec4899',
    '#06b6d4',
    '#f97316',
  ]

  if (data.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-slate-600 dark:text-slate-400">
          No time allocation data yet
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name} ${value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
