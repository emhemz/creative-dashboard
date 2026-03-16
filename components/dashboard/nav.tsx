'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, LogOut, Settings } from 'lucide-react'

export function DashboardNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <nav className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="text-2xl font-bold text-slate-900 dark:text-white">
          ✨ Dashboard
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400">
            Projects
          </Link>
          <Link href="/dashboard/settings" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400">
            Settings
          </Link>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 p-4 space-y-2">
          <Link
            href="/dashboard"
            className="block text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 py-2"
          >
            Projects
          </Link>
          <Link
            href="/dashboard/settings"
            className="block text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 py-2"
          >
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 py-2"
          >
            Sign out
          </button>
        </div>
      )}
    </nav>
  )
}
