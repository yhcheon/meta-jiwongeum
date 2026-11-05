'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AuthButton() {
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (!user) {
    return (
      <a
        href="/login"
        className="h-9 px-4 bg-[#2563EB] text-white rounded-lg text-sm font-medium hover:bg-[#1D4ED8]"
      >
        로그인
      </a>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-[#64748B] hidden md:block">{user.email}</span>
      <button
        onClick={handleLogout}
        className="h-9 px-4 bg-white border border-[#E2E8F0] rounded-lg text-sm font-medium text-[#0F172A] hover:bg-[#F8FAFC]"
      >
        로그아웃
      </button>
    </div>
  )
}
