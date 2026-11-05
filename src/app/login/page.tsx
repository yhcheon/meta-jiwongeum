
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        // FIX: 에러 시 대시보드로 이동 금지
        setError(error.message === 'Invalid login credentials' ? '이메일 또는 비밀번호가 틀렸습니다.' : error.message)
        setLoading(false)
        return // 중요: 여기서 return해서 아래 router.push 실행 안 되게 함
      }

      if (data.user) {
        // 성공 시에만 이동
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err: any) {
      setError('로그인 중 오류가 발생했습니다: ' + err.message)
      setLoading(false)
      return
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6">
      <div className="w-full max-w-[400px]">
        <div className="bg-white border border-slate-200 rounded-[20px] p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center text-white font-bold text-sm">챙</div>
            <span className="font-bold text-[17px]">지원금 챙김이</span>
          </div>

          <h1 className="text-[24px] font-[800] mb-2">로그인</h1>
          <p className="text-[14px] text-slate-500 mb-6">계정에 로그인하여 51개 공고를 확인하세요</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[13px] font-medium text-slate-700">이메일</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full px-4 py-3 border border-slate-200 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                placeholder="email@example.com"
                required
              />
            </div>
            <div>
              <label className="text-[13px] font-medium text-slate-700">비밀번호</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full px-4 py-3 border border-slate-200 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-[13px]">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-slate-300 text-white rounded-xl py-3.5 font-bold text-[15px] transition-colors"
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/forgot-password" className="text-[13px] text-slate-500 hover:text-slate-700">비밀번호를 잊으셨나요?</a>
          </div>
        </div>
      </div>
    </div>
  )
}
