'use client'

import { Project } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface RevenueTrackerProps {
  projects: Project[]
}

export function RevenueTracker({ projects }: RevenueTrackerProps) {
  const data = projects.map((p) => ({
    name: p.name.substring(0, 12),
    revenue: p.revenue,
    budget: p.budget,
  }))

  const totalRevenue = projects.reduce((sum, p) => sum + p.revenue, 0)
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0)

  if (projects.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-slate-600 dark:text-slate-400">
          No revenue data yet
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6 space-y-2">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Total Revenue</p>
            <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Total Budget</p>
            <p className="text-2xl font-bold">${totalBudget.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Profit Margin</p>
            <p className="text-2xl font-bold">
              {totalBudget > 0 ? (((totalRevenue - totalBudget) / totalBudget) * 100).toFixed(1) : 0}%
            </p>
          </div>
        </CardContent>
      </Card>

      {data.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#3b82f6" />
                <Bar dataKey="budget" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
