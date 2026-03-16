import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (data.user) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold text-slate-900 dark:text-white">✨ Dashboard</div>
          <div className="flex gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white">
          Manage Your Creative Projects with Style
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          A beautiful dashboard to organize, visualize, and track all your creative work.
          From revenue tracking to time allocation—everything in one place.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/signup">
            <Button size="lg">Start Free</Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="outline" size="lg">Sign In</Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-3">
          <div className="text-4xl">📊</div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Visualize Your Work</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Beautiful charts show your time allocation, revenue, and project status at a glance.
          </p>
        </div>
        <div className="space-y-3">
          <div className="text-4xl">✅</div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Stay Organized</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Manage projects, tasks, and deadlines with an intuitive and delightful interface.
          </p>
        </div>
        <div className="space-y-3">
          <div className="text-4xl">🔗</div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Integrate Tools</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Connect with Notion and sync your projects directly to your dashboard.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="bg-blue-600 dark:bg-blue-800 rounded-lg p-12 space-y-4">
          <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
          <p className="text-blue-100">
            Create your free account and start managing your creative projects today.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary">
              Create Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
