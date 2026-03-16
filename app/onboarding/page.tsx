'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    budget: '',
    revenue: '',
    deadline: '',
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Create the first project
      setLoading(true)
      try {
        const { data: user } = await supabase.auth.getUser()

        if (!user.user) throw new Error('Not authenticated')

        await supabase.from('projects').insert([
          {
            user_id: user.user.id,
            name: projectData.name,
            description: projectData.description || null,
            budget: parseFloat(projectData.budget) || 0,
            revenue: parseFloat(projectData.revenue) || 0,
            deadline: projectData.deadline,
            status: 'active',
            time_allocation: 30,
          },
        ])

        router.push('/dashboard')
      } catch (error) {
        console.error('Error creating project:', error)
        setLoading(false)
      }
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl">Welcome! 👋</CardTitle>
              <CardDescription>Let's get your Creative Dashboard set up</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center font-semibold text-blue-600 dark:text-blue-400">
                    ✓
                  </div>
                  <div>
                    <p className="font-semibold">Manage Your Projects</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Create, organize, and track all your creative work in one beautiful place
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center font-semibold text-blue-600 dark:text-blue-400">
                    📊
                  </div>
                  <div>
                    <p className="font-semibold">Visualize Your Work</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      See revenue, time allocation, and deadlines at a glance with beautiful charts
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center font-semibold text-blue-600 dark:text-blue-400">
                    🚀
                  </div>
                  <div>
                    <p className="font-semibold">Ship Faster</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Integrate with Notion, manage tasks, and stay focused on what matters
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Create Your First Project</CardTitle>
              <CardDescription>Tell us about what you're working on</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Website Redesign"
                  value={projectData.name}
                  onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  placeholder="What's this project about?"
                  className="flex min-h-[100px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                  value={projectData.description}
                  onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>Add budget, revenue, and deadline info</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget ($)</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="0"
                    value={projectData.budget}
                    onChange={(e) => setProjectData({ ...projectData, budget: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="revenue">Revenue ($)</Label>
                  <Input
                    id="revenue"
                    type="number"
                    placeholder="0"
                    value={projectData.revenue}
                    onChange={(e) => setProjectData({ ...projectData, revenue: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline *</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={projectData.deadline}
                  onChange={(e) => setProjectData({ ...projectData, deadline: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        )
    }
  }

  return (
    <div className="space-y-8">
      {/* Progress bar */}
      <div className="max-w-2xl mx-auto">
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded-full transition-all ${
                s <= step ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Step {step} of 3
        </p>
      </div>

      {/* Content */}
      {renderStep()}

      {/* Buttons */}
      <div className="max-w-2xl mx-auto flex gap-2">
        {step > 1 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            Back
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={loading || (step === 2 && !projectData.name) || (step === 3 && !projectData.deadline)}
          className="flex-1"
        >
          {step === 3 ? (loading ? 'Creating...' : 'Get Started') : 'Next'}
        </Button>
      </div>
    </div>
  )
}
