"use client"
import { useEffect, useState } from 'react'
import MemberCard from '@/components/MemberCard'
import { Member } from '@/lib/types'

export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMembers = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/users')
      if (!res.ok) throw new Error('Failed to fetch team members')
      const data = await res.json()
      setMembers(data)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  return (
    <div className="p-6 min-h-screen bg-slate-950 text-slate-100">
      <h1 className="text-2xl font-bold mb-4">Team</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && members.length === 0 && <p>No team members found.</p>}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {members.map(member => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  )
}
