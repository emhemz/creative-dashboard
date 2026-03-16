'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'

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
    if (step < 4) {
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

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const renderStep = () => {
    const steps = [
      {
        title: 'Welcome to Creative',
        subtitle: 'Let\'s get you set up',
        content: (
          <div className="space-y-6">
            <div className="space-y-4">
              {[
                {
                  icon: '📊',
                  title: 'Visualize Your Work',
                  description: 'Beautiful charts show your time allocation, revenue, and project progress at a glance'
                },
                {
                  icon: '✅',
                  title: 'Stay Organized',
                  description: 'Manage projects, tasks, and deadlines with an intuitive interface'
                },
                {
                  icon: '🚀',
                  title: 'Ship Faster',
                  description: 'Integrate with your tools and keep everything synced in one place'
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-900/30 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="text-3xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      },
      {
        title: 'Create Your First Project',
        subtitle: 'Tell us what you\'re working on',
        content: (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-slate-900 dark:text-white">
                Project Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="e.g., Website Redesign"
                value={projectData.name}
                onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
                className="h-11 rounded-lg border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-slate-900 dark:text-white">
                Description
              </Label>
              <textarea
                id="description"
                placeholder="What's this project about? (optional)"
                className="flex min-h-[120px] w-full rounded-lg border border-slate-300 bg-white dark:bg-slate-900 dark:border-slate-600 px-4 py-3 text-sm placeholder:text-slate-500 dark:placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 dark:focus-visible:ring-blue-400/20 focus-visible:border-blue-500 dark:focus-visible:border-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                value={projectData.description}
                onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
              />
              <p className="text-xs text-slate-500 dark:text-slate-400">Helps you remember the project scope</p>
            </div>
          </div>
        )
      },
      {
        title: 'Project Timeline & Budget',
        subtitle: 'Add deadline and financial details',
        content: (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="deadline" className="text-sm font-medium text-slate-900 dark:text-white">
                Deadline <span className="text-red-500">*</span>
              </Label>
              <Input
                id="deadline"
                type="date"
                value={projectData.deadline}
                onChange={(e) => setProjectData({ ...projectData, deadline: e.target.value })}
                className="h-11 rounded-lg border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-sm font-medium text-slate-900 dark:text-white">
                  Budget <span className="text-slate-500">($)</span>
                </Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="0"
                  value={projectData.budget}
                  onChange={(e) => setProjectData({ ...projectData, budget: e.target.value })}
                  className="h-11 rounded-lg border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="revenue" className="text-sm font-medium text-slate-900 dark:text-white">
                  Revenue <span className="text-slate-500">($)</span>
                </Label>
                <Input
                  id="revenue"
                  type="number"
                  placeholder="0"
                  value={projectData.revenue}
                  onChange={(e) => setProjectData({ ...projectData, revenue: e.target.value })}
                  className="h-11 rounded-lg border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20"
                />
              </div>
            </div>
          </div>
        )
      },
      {
        title: 'You\'re All Set!',
        subtitle: 'Ready to transform your workflow',
        content: (
          <div className="space-y-6 text-center">
            <div className="inline-block p-4 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30">
              <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Welcome aboard!
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Your first project <span className="font-semibold">"{projectData.name}"</span> is ready. Let's get to work!
              </p>
            </div>
            <div className="space-y-3 pt-4">
              {[
                'Dashboard with project overview',
                'Task management for all your work',
                'Beautiful charts and insights'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 justify-center text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )
      }
    ]

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            {steps[step - 1].title}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {steps[step - 1].subtitle}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {steps[step - 1].content}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">Creative</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Progress Indicator */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="space-y-3">
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex-1">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      s <= step
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600'
                        : 'bg-slate-200 dark:bg-slate-800'
                    }`}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                Step {step} of 4
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500">
                {Math.round((step / 4) * 100)}% complete
              </p>
            </div>
          </div>
        </div>

        {/* Step Content */}
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="max-w-2xl mx-auto mt-16 flex gap-3">
          {step > 1 && (
            <Button
              onClick={handleBack}
              variant="outline"
              className="h-11 px-6 border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-900"
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={
              loading ||
              (step === 2 && !projectData.name) ||
              (step === 3 && !projectData.deadline)
            }
            className="flex-1 h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            {step === 4 ? (
              loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Creating your dashboard...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Launch Dashboard <ArrowRight className="w-4 h-4" />
                </span>
              )
            ) : (
              <span className="flex items-center justify-center gap-2">
                Continue <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
