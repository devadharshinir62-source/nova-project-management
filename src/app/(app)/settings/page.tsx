"use client"
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Button from '@/components/Button'

// Ensure the page is rendered dynamically (no static prerender)
export const dynamic = 'force-dynamic'

type UserInfo = {
  name?: string | null
  email?: string | null
  image?: string | null
  role?: string | null
}

export default function SettingsPage() {
  const router = useRouter()
  // Guard against possible undefined return (rare during SSR)
  const sessionResult = useSession()
  if (!sessionResult) {
    return <p className="p-6">Loading...</p>
  }
  const { data: session, status } = sessionResult

  if (status === 'loading') {
    return <p className="p-6">Loading...</p>
  }

  if (status === 'unauthenticated') {
    router.push('/login')
    return null
  }

  // status === 'authenticated'
  const userInfo: UserInfo = {
    name: session?.user?.name ?? null,
    email: session?.user?.email ?? null,
    // @ts-ignore – custom fields may exist on the session user
    image: (session?.user as any)?.image ?? null,
    // @ts-ignore – custom role field
    role: (session?.user as any)?.role ?? null,
  }

  return (
    <div className="p-6 min-h-screen bg-slate-950 text-slate-100">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="space-y-2">
        <p><strong>Name:</strong> {userInfo.name}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Role:</strong> {userInfo.role}</p>
      </div>
      <div className="mt-6">
        <Button onClick={() => router.push('/')}>Back to Dashboard</Button>
      </div>
    </div>
  )
}
