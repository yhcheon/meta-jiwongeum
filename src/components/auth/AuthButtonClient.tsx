'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AuthButtonClient({ isLoggedIn, showLogoutOnly = false }: { isLoggedIn: boolean, showLogoutOnly?: boolean }) {
  const supabase = createClient()
  const router = useRouter()

  const handleLogout = async () => {
    localStorage.removeItem('onboarded')
    localStorage.removeItem('companyData')
    localStorage.removeItem('readinessScore')
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  if (!isLoggedIn) return null

  if (showLogoutOnly) {
    return (
      <button onClick={handleLogout} className="text-xs text-[#94A3B8] hover:text-[#64748B] underline">
        로그아웃
      </button>
    )
  }

  return (
    <button
      onClick={handleLogout}
      className="h-9 px-3 md:px-4 bg-white border border-[#E2E8F0] rounded-lg text-sm font-medium text-[#0F172A] hover:bg-[#F8FAFC]"
    >
      로그아웃
    </button>
  )
}
