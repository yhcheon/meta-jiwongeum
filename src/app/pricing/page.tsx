'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null)
  const [sdkLoaded, setSdkLoaded] = useState(false)

  useEffect(() => {
    // Toss SDK 동적 로드
    const script = document.createElement('script')
    script.src = 'https://js.tosspayments.com/v1/payment'
    script.async = true
    script.onload = () => {
      console.log('Toss SDK loaded')
      setSdkLoaded(true)
    }
    script.onerror = () => {
      console.log('Toss SDK failed to load - test mode')
      setSdkLoaded(false)
    }
    document.body.appendChild(script)

    return () => {
      // cleanup
      try { document.body.removeChild(script) } catch {}
    }
  }, [])

  const handlePayment = async (planId: string, price: number) => {
    if (price === 0) {
      window.location.href = '/dashboard'
      return
    }

    setLoading(planId)
    
    // SDK 로드 여부와 관계없이 테스트 모드로 동작하게
    try {
      // @ts-ignore
      const TossPayments = window.TossPayments
      
      if (!TossPayments || !sdkLoaded) {
        // 테스트 모드: SDK 없이도 동작
        console.log('Test mode - no SDK')
        alert(`테스트 모드: ${planId} 플랜 (${price.toLocaleString()}원) 결제를 시뮬레이션합니다.\n\n실제 결제는 Toss Client Key 설정 후 가능합니다.\n\n대시보드로 이동합니다.`)
        window.location.href = `/dashboard?plan=${planId}&test_payment=true&amount=${price}`
        setLoading(null)
        return
      }

      const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq'
      const tossPayments = TossPayments(clientKey)
      
      const orderId = `order_${Date.now()}_${Math.random().toString(36).slice(2,8)}`
      
      await tossPayments.requestPayment('카드', {
        amount: price,
        orderId,
        orderName: `지원금 챙김이 ${planId} 플랜`,
        customerName: '테스트 고객',
        successUrl: `${window.location.origin}/dashboard?plan=${planId}&payment=success&orderId=${orderId}`,
        failUrl: `${window.location.origin}/pricing?fail=true`,
      })
    } catch (e: any) {
      console.error('Payment error:', e)
      // 에러 시에도 테스트 모드로 대시보드 이동
      if (e.code === 'USER_CANCEL') {
        alert('결제가 취소되었습니다')
      } else {
        alert(`결제 테스트 모드: ${planId} 플랜으로 대시보드로 이동합니다.\n에러: ${e.message || 'SDK 오류'}`)
        window.location.href = `/dashboard?plan=${planId}&test_payment=true`
      }
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-6 max-w-7xl mx-auto">
        <Link href="/" className="font-bold text-[#0F172A]">지원금 챙김이</Link>
        <Link href="/dashboard" className="h-9 px-4 bg-[#0F172A] text-white rounded-lg text-sm flex items-center">대시보드</Link>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0F172A]">요금제</h1>
          <p className="text-[#64748B] mt-3">놓친 지원금 평균 3,000만원 → Pro는 29,000원으로 100배 이득</p>
          <div className="mt-4 text-xs text-[#94A3B8]">
            {sdkLoaded ? '✅ Toss SDK 로드됨 - 실제 결제 가능' : '⚠️ 테스트 모드 - SDK 로드 중 또는 테스트 결제'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Free */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8">
            <h3 className="font-semibold text-[#0F172A]">Free</h3>
            <div className="mt-4 text-3xl font-bold text-[#0F172A]">0원<span className="text-sm font-normal text-[#94A3B8]">/월</span></div>
            <ul className="mt-6 space-y-3 text-sm text-[#64748B]">
              <li>✓ 공고 3개까지 보기</li>
              <li>✓ 준비도 점수 62점</li>
              <li>✓ Word 1개 생성</li>
              <li className="text-[#94A3B8]">✗ 알림 없음</li>
            </ul>
            <button onClick={() => handlePayment('free', 0)} className="mt-8 w-full h-11 bg-white border border-[#E2E8F0] rounded-lg font-medium text-sm hover:bg-[#F8FAFC]">
              무료로 시작
            </button>
          </div>

          {/* Pro */}
          <div className="bg-[#0F172A] rounded-2xl border border-[#0F172A] p-8 text-white relative scale-105 shadow-xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white text-xs font-medium px-3 py-1 rounded-full">가장 인기</div>
            <h3 className="font-semibold">Pro</h3>
            <div className="mt-4 text-3xl font-bold">29,000원<span className="text-sm font-normal text-[#94A3B8]">/월</span></div>
            <div className="mt-2 text-xs text-[#60A5FA]">대행사 200만원 → 29,000원 (98% 절약)</div>
            <ul className="mt-6 space-y-3 text-sm text-[#CBD5E1]">
              <li>✓ 공고 무제한 (20개)</li>
              <li>✓ 92% 매칭 + 이유</li>
              <li>✓ Word 무제한 생성</li>
              <li>✓ D-7/D-3/D-1 이메일 알림</li>
              <li>✓ 벤처인증 플레이북</li>
            </ul>
            <button onClick={() => handlePayment('pro', 29000)} disabled={!!loading} className="mt-8 w-full h-11 bg-[#2563EB] text-white rounded-lg font-medium text-sm hover:bg-[#1D4ED8] disabled:opacity-50">
              {loading === 'pro' ? '처리 중...' : 'Pro 시작하기 →'}
            </button>
            <div className="mt-3 text-xs text-[#64748B] text-center">테스트 카드: 4242424242424242</div>
          </div>

          {/* Premium */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8">
            <h3 className="font-semibold text-[#0F172A]">Premium</h3>
            <div className="mt-4 text-3xl font-bold text-[#0F172A]">99,000원<span className="text-sm font-normal text-[#94A3B8]">/월</span></div>
            <ul className="mt-6 space-y-3 text-sm text-[#64748B]">
              <li>✓ Pro 모든 기능</li>
              <li>✓ 1:1 컨설팅 월 2회</li>
              <li>✓ 사업계획서 첨삭</li>
              <li>✓ 벤처인증 대행 연결</li>
            </ul>
            <button onClick={() => handlePayment('premium', 99000)} disabled={!!loading} className="mt-8 w-full h-11 bg-white border border-[#0F172A] text-[#0F172A] rounded-lg font-medium text-sm hover:bg-[#F8FAFC] disabled:opacity-50">
              {loading === 'premium' ? '처리 중...' : 'Premium 문의 →'}
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-[#94A3B8]">
          <p>현재 테스트 모드: 실제 결제 없이 대시보드로 이동하여 Pro 기능 체험 가능</p>
          <p className="mt-1">실제 결제 연동 시 .env.local에 NEXT_PUBLIC_TOSS_CLIENT_KEY 설정 필요</p>
        </div>
      </div>
    </div>
  )
}
