'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Mail, Sparkles, ArrowRight } from 'lucide-react'

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">Creative</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-xl backdrop-blur-sm space-y-6">
          
          {/* Email Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center">
              <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Check Your Email
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              We've sent you a confirmation link to verify your account
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-4 py-4">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-900/30">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 text-sm font-semibold text-blue-600 dark:text-blue-400">
                1
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white text-sm">Check your inbox</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Look for an email from us</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-900/30">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 text-sm font-semibold text-blue-600 dark:text-blue-400">
                2
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white text-sm">Click the link</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Verify your email address</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-900/30">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 text-sm font-semibold text-blue-600 dark:text-blue-400">
                3
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white text-sm">Get onboarded</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Create your first project in 2 minutes</p>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <span className="font-semibold">Didn't get an email?</span> Check your spam folder, or try signing up again with a different email.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button asChild className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all">
              <Link href="/">
                Back to Home <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full h-11 border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-900">
              <Link href="/auth/login">Sign In Instead</Link>
            </Button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-8">
          Need help?{' '}
          <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
            Contact support
          </a>
        </p>
      </div>
    </div>
  )
}
