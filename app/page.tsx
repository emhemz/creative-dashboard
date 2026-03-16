import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Sparkles, BarChart3, CheckCircle2, Zap, ArrowRight } from 'lucide-react'

export default async function Home() {
  try {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()

    if (data.user) {
      redirect('/dashboard')
    }
  } catch (error) {
    // If Supabase connection fails, continue to show the home page
    console.error('Supabase connection error:', error)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-blue-100 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">Creative</span>
          </div>
          <div className="flex gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-block">
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200 dark:border-indigo-800">
              <p className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ✨ Build, Track, Thrive
              </p>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-slate-900 dark:text-white leading-tight">
            Your Creative
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Command Center
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Organize projects, track revenue, visualize your time—all in one beautiful dashboard designed for creative professionals who demand excellence.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link href="/auth/signup">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl text-base h-12 px-8">
              Start Free <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="outline" size="lg" className="border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900 text-base h-12 px-8">
              Sign In
            </Button>
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="pt-8 flex justify-center gap-8 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>Free to start</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>No credit card</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>Set up in 2 minutes</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Powerful features designed for creative minds
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group p-8 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-xl">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Visualize Your Work
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Beautiful charts and insights showing time allocation, revenue, and project progress at a glance.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group p-8 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all duration-300 hover:shadow-xl">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Stay Organized
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Manage projects, tasks, and deadlines with an intuitive interface that feels like a joy to use.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group p-8 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-xl">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Integrate Everything
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Connect with your favorite tools and keep all your creative work synced in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          </div>
          
          <div className="relative p-12 md:p-16 text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join creative professionals who've already streamlined their projects and increased their productivity.
            </p>
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl text-base h-12 px-8">
                Create Your Account <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 mt-20">
        <div className="container mx-auto px-4 py-12 text-center text-slate-600 dark:text-slate-400">
          <p>© 2026 Creative Dashboard. Designed for creators, by creators.</p>
        </div>
      </footer>
    </div>
  )
}
