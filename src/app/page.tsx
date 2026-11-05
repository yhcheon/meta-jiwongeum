import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import AuthButtonClient from '@/components/auth/AuthButtonClient'

export default async function LandingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Header - fixed */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-[#0F172A] text-lg md:text-xl">
            지원금 챙김이
          </Link>
          <div className="flex items-center gap-2 md:gap-3">
            {user ? (
              <>
                <span className="text-sm text-[#64748B] hidden md:block max-w-[150px] truncate">{user.email}</span>
                <Link href="/dashboard" className="h-9 px-3 md:px-4 bg-[#2563EB] text-white rounded-lg text-sm font-medium flex items-center hover:bg-[#1D4ED8]">
                  대시보드
                </Link>
                <AuthButtonClient isLoggedIn={true} />
              </>
            ) : (
              <>
                <Link href="/login" className="h-9 px-3 md:px-4 bg-white border border-[#E2E8F0] rounded-lg text-sm font-medium text-[#0F172A] flex items-center hover:bg-[#F8FAFC]">
                  로그인
                </Link>
                <Link href="/login" className="h-9 px-3 md:px-4 bg-[#2563EB] text-white rounded-lg text-sm font-medium flex items-center hover:bg-[#1D4ED8]">
                  <span className="hidden md:inline">무료로 시작하기</span>
                  <span className="md:hidden">시작하기</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero - responsive */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full px-4 py-1.5 text-xs text-[#64748B] mb-6">
          <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></span>
          평균 3,000만원 놓치고 계세요
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-[#0F172A] leading-tight tracking-tight">
          놓친 지원금,<br />
          <span className="text-[#2563EB]">챙김이가 다 챙겨드립니다</span>
        </h1>
        <p className="mt-6 text-base md:text-lg text-[#64748B] max-w-2xl mx-auto px-2">
          정부지원금 30개 중 27개를 놓치고 있습니다. 챙김이가 매일 1,200개 공고를 분석해서
          내 회사에 딱 맞는 지원금만 골라드립니다.
        </p>
        <div className="mt-8 md:mt-10 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4">
          <Link href={user ? "/dashboard" : "/login"} className="w-full md:w-auto h-12 px-8 bg-[#2563EB] text-white rounded-lg font-medium hover:bg-[#1D4ED8] flex items-center justify-center gap-2">
            {user ? "대시보드 가기 →" : "30초만에 무료로 시작하기 →"}
          </Link>
          <Link href="/pricing" className="w-full md:w-auto h-12 px-8 bg-white border border-[#E2E8F0] text-[#0F172A] rounded-lg font-medium hover:bg-[#F8FAFC] flex items-center justify-center">
            요금제 보기
          </Link>
        </div>
        <div className="mt-4 text-xs text-[#94A3B8]">✓ 카드 등록 없이 시작 · ✓ 5분 만에 첫 매칭</div>
      </section>

      {/* Steps - responsive grid fix */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 hover:shadow-sm transition-shadow">
            <div className="w-8 h-8 bg-[#2563EB] text-white rounded-lg flex items-center justify-center text-sm font-bold">1</div>
            <h3 className="mt-4 font-semibold text-[#0F172A]">로그인 & 회사 정보 입력</h3>
            <p className="mt-2 text-sm text-[#64748B]">30초만에 이메일 가입, 회사 정보 간단 입력</p>
            <div className="mt-4 text-xs text-[#2563EB] font-medium">→ /login → /onboarding</div>
          </div>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 hover:shadow-sm transition-shadow">
            <div className="w-8 h-8 bg-[#2563EB] text-white rounded-lg flex items-center justify-center text-sm font-bold">2</div>
            <h3 className="mt-4 font-semibold text-[#0F172A]">준비도 62점 진단</h3>
            <p className="mt-2 text-sm text-[#64748B]">벤처인증, 연구소, IP 체크해서 점수 계산</p>
            <div className="mt-4 text-xs text-[#2563EB] font-medium">→ 온보딩 3단계 후 점수 공개</div>
          </div>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 hover:shadow-sm transition-shadow">
            <div className="w-8 h-8 bg-[#2563EB] text-white rounded-lg flex items-center justify-center text-sm font-bold">3</div>
            <h3 className="mt-4 font-semibold text-[#0F172A]">매일 지원금 추천</h3>
            <p className="mt-2 text-sm text-[#64748B]">92% 매칭된 공고만 골라서 알림</p>
            <div className="mt-4 text-xs text-[#2563EB] font-medium">→ /dashboard 에서 실시간 확인</div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-[#E2E8F0] py-12 md:py-16 text-center px-4">
        <h2 className="text-xl md:text-2xl font-bold text-[#0F172A]">지금 시작하면 오늘 공고 3개를 받을 수 있어요</h2>
        <Link href={user ? "/dashboard" : "/login"} className="mt-6 inline-flex h-12 px-8 bg-[#0F172A] text-white rounded-lg font-medium hover:bg-[#1E293B] items-center justify-center">
          {user ? "대시보드로 이동" : "무료로 시작하기 →"}
        </Link>
        {user && (
          <div className="mt-4">
            <AuthButtonClient isLoggedIn={true} showLogoutOnly />
          </div>
        )}
      </section>
    </div>
  )
}
