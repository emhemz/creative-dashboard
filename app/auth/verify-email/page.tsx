'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function VerifyEmailPage() {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">Check Your Email</CardTitle>
        <CardDescription>We've sent you a confirmation link</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Click the link in your email to verify your account and complete your onboarding.
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-500">
          After confirming, you'll be guided through a quick setup to create your first project.
        </p>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" asChild>
            <Link href="/auth/login">Back to Login</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
