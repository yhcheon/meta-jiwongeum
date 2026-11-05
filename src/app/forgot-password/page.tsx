'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const supabase = createClient()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${location.origin}/reset-password`,
      })
      if (error) throw error
      setMessage('비밀번호 재설정 이메일을 보냈습니다. 이메일을 확인해주세요!')
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
          <h1 className="text-2xl font-bold text-[#0F172A]">비밀번호 찾기</h1>
          <p className="text-sm text-[#64748B] mt-2">가입한 이메일을 입력하면 재설정 링크를 보내드립니다</p>
        </div>

        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            placeholder="가입한 이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 rounded-lg border border-[#E2E8F0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
            required
          />

          {message && (
            <div className="text-sm p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A]">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#2563EB] text-white rounded-lg font-medium text-sm hover:bg-[#1D4ED8] transition-colors disabled:opacity-50"
          >
            {loading ? '전송 중...' : '재설정 이메일 보내기'}
          </button>
        </form>

        <div className="text-center mt-6 space-y-2">
          <a href="/login" className="block text-sm text-[#64748B] hover:text-[#0F172A]">
            ← 로그인으로 돌아가기
          </a>
          <a href="/" className="block text-xs text-[#94A3B8] hover:text-[#64748B]">
            홈으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  )
}
