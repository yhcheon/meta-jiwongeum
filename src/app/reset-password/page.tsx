'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSession, setIsSession] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        setIsSession(true)
      } else {
        setMessage('링크가 만료되었거나 유효하지 않습니다. 다시 시도해주세요.')
      }
    }
    checkSession()
  }, [])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      setMessage('비밀번호가 일치하지 않습니다')
      return
    }
    setLoading(true)
    setMessage('')

    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      setMessage('비밀번호가 변경되었습니다! 로그인 페이지로 이동합니다...')
      setTimeout(() => router.push('/login'), 2000)
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
      <div className="w-full max-w-[400px] bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#0F172A]">새 비밀번호 설정</h1>
          <p className="text-sm text-[#64748B] mt-2">새로운 비밀번호를 입력해주세요</p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="password"
            placeholder="새 비밀번호 (6자 이상)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 px-4 rounded-lg border border-[#E2E8F0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
            required
            disabled={!isSession}
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full h-12 px-4 rounded-lg border border-[#E2E8F0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
            required
            disabled={!isSession}
          />

          {message && (
            <div className="text-sm p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A]">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !isSession}
            className="w-full h-12 bg-[#2563EB] text-white rounded-lg font-medium text-sm hover:bg-[#1D4ED8] transition-colors disabled:opacity-50"
          >
            {loading ? '변경 중...' : '비밀번호 변경'}
          </button>
        </form>

        <div className="text-center mt-6">
          <a href="/login" className="block text-sm text-[#64748B] hover:text-[#0F172A]">
            ← 로그인으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  )
}
