'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // 이미 로그인 되어 있으면 대시보드로
        const hasOnboarded = localStorage.getItem('onboarded')
        if (hasOnboarded) {
          router.push('/dashboard')
        } else {
          router.push('/onboarding')
        }
      }
    }
    checkUser()
  }, [])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback?next=/onboarding`,
          },
        })
        if (error) throw error
        setMessage('회원가입 확인 이메일을 보냈습니다. 이메일을 확인해주세요! 확인 후 온보딩으로 이동합니다.')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        
        // 로그인 성공 - 온보딩 했는지 확인
        const hasOnboarded = localStorage.getItem('onboarded')
        if (hasOnboarded) {
          router.push('/dashboard')
        } else {
          router.push('/onboarding')
        }
      }
    } catch (error: any) {
      setMessage(error.message || '오류가 발생했습니다')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback?next=/onboarding`,
      },
    })
    if (error) setMessage(error.message)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
      <div className="w-full max-w-[400px] bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm">
        <div className="text-center mb-8">
          <div className="text-xs font-medium text-[#2563EB] bg-[#EFF6FF] border border-[#DBEAFE] rounded-full px-3 py-1 inline-block mb-3">
            STEP 1 / 3 · 로그인
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A]">지원금 챙김이</h1>
          <p className="text-sm text-[#64748B] mt-2">
            {isSignUp ? '30초만에 시작하기 → 온보딩으로 이동' : '로그인하고 지원금 챙기세요'}
          </p>
          <div className="mt-3 flex items-center justify-center gap-1 text-xs text-[#94A3B8]">
            <span className="w-6 h-1 bg-[#2563EB] rounded-full"></span>
            <span className="w-6 h-1 bg-[#E2E8F0] rounded-full"></span>
            <span className="w-6 h-1 bg-[#E2E8F0] rounded-full"></span>
            <span className="ml-2">로그인 → 온보딩 → 대시보드</span>
          </div>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-[#E2E8F0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호 (6자 이상)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-[#E2E8F0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
              required
            />
          </div>

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
            {loading ? '처리 중...' : isSignUp ? '회원가입하고 온보딩 시작 →' : '로그인하고 대시보드로 →'}
          </button>
        </form>

        <div className="text-center mt-3">
          <a href="/forgot-password" className="text-xs text-[#2563EB] hover:text-[#1D4ED8]">
            비밀번호를 잊으셨나요?
          </a>
        </div>

        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-[#E2E8F0]" />
          <span className="text-xs text-[#94A3B8]">또는</span>
          <div className="flex-1 h-px bg-[#E2E8F0]" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full h-12 bg-white border border-[#E2E8F0] rounded-lg font-medium text-sm text-[#0F172A] hover:bg-[#F8FAFC] transition-colors flex items-center justify-center gap-2"
        >
          <span>🔵</span> Google로 계속하기
        </button>

        <div className="text-center mt-6">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-[#64748B] hover:text-[#0F172A]"
          >
            {isSignUp ? '이미 계정이 있나요? 로그인' : '계정이 없나요? 회원가입'}
          </button>
        </div>

        <div className="text-center mt-4">
          <a href="/" className="text-xs text-[#94A3B8] hover:text-[#64748B]">
            ← 홈으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  )
}
