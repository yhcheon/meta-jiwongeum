
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null)
  const [isLive, setIsLive] = useState(false)
  useEffect(() => {
    const s = document.createElement('script'); s.src='https://js.tosspayments.com/v1/payment'; s.async=true; document.body.appendChild(s)
    const ck = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || 'test_ck_Z1a2QbWa2l2D0bW4z1a2QbWa2l2D0'; setIsLive(ck.startsWith('live_'))
    return () => { document.body.removeChild(s) }
  }, [])
  const handlePayment = async (plan: 'pro' | 'premium', amount: number) => {
    setLoading(plan)
    try {
      const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || 'test_ck_D5GePWvyJnrK0W0k6q8gL8gjLzN97E'
      // @ts-ignore
      const tossPayments = window.TossPayments ? window.TossPayments(clientKey) : null
      const orderId = `order_${plan}_${Date.now()}_${Math.random().toString(36).slice(2,7)}`
      const orderName = plan === 'pro' ? '지원금 챙김이 Pro' : 'Premium'
      if (clientKey.startsWith('test_') || !tossPayments) {
        const confirm = window.confirm(`[테스트 모드] ${orderName} - ${amount.toLocaleString()}원\n테스트 결제를 진행할까요?`)
        if (!confirm) { setLoading(null); return }
        const res = await fetch('/api/payment/confirm', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ paymentKey: `test_${Date.now()}`, orderId, amount }) })
        const data = await res.json()
        if (data.success) { alert(`✅ 테스트 결제 성공! ${plan.toUpperCase()}`); window.location.href = `/dashboard?plan=${plan}&test_payment=true` }
        setLoading(null); return
      }
      tossPayments.requestPayment('카드', { amount, orderId, orderName, customerName: '지원금 챙김이 고객', successUrl: `${window.location.origin}/api/payment/success?plan=${plan}`, failUrl: `${window.location.origin}/api/payment/fail` })
    } catch (e: any) { alert('결제 오류: '+e.message); setLoading(null) }
  }
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="bg-white border-b border-slate-200"><div className="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center"><Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center text-white font-bold text-sm">챙</div><span className="font-bold">지원금 챙김이</span></Link><Link href="/dashboard" className="text-[13px] text-slate-500">대시보드</Link></div></header>
      <div className="max-w-[1000px] mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4 text-[12px] font-bold border ${isLive ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}><span className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500' : 'bg-amber-500'} animate-pulse`}></span>{isLive ? 'LIVE 실결제 모드' : 'TEST 테스트 모드'}</div>
          <h1 className="text-[36px] font-[800] mb-4">요금제</h1><p className="text-[16px] text-slate-600">51개 실시간 공고, Word 5페이지, 0.8초 로딩</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-[20px] p-6"><h3 className="font-bold text-[18px]">Free</h3><div className="mt-2"><span className="text-[28px] font-[800]">0원</span><span className="text-[13px] text-slate-500">/월</span></div><ul className="space-y-3 text-[13px] text-slate-600 mb-8 mt-6"><li>✓ 51개 중 20개 보기</li><li>✓ 준비도 62점</li><li>✓ Word 1페이지 미리보기</li></ul><Link href="/dashboard" className="block w-full text-center bg-slate-100 rounded-xl py-3 font-semibold text-[14px]">무료로 시작하기</Link></div>
          <div className="bg-slate-900 border border-slate-900 rounded-[20px] p-6 text-white relative scale-[1.02] shadow-xl"><div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white text-[11px] font-bold px-3 py-1 rounded-full">가장 인기</div><h3 className="font-bold text-[18px]">Pro</h3><div className="mt-2"><span className="text-[28px] font-[800]">29,000원</span><span className="text-[13px] text-slate-400">/월</span></div><ul className="space-y-3 text-[13px] text-slate-300 mb-8 mt-6"><li>✓ 51개 전체 보기</li><li>✓ 92% 매칭 + D-day</li><li>✓ Word 5페이지 v4</li><li>✓ 0.8초 로딩</li></ul><button onClick={() => handlePayment('pro', 29000)} disabled={loading==='pro'} className="w-full bg-[#2563EB] rounded-xl py-3.5 font-bold text-[14px]">{loading==='pro' ? '결제 중...' : isLive ? 'Pro 결제하기' : 'Pro 테스트 결제'}</button></div>
          <div className="bg-white border border-slate-200 rounded-[20px] p-6"><h3 className="font-bold text-[18px]">Premium</h3><div className="mt-2"><span className="text-[28px] font-[800]">99,000원</span><span className="text-[13px] text-slate-500">/월</span></div><ul className="space-y-3 text-[13px] text-slate-600 mb-8 mt-6"><li>✓ Pro 모든 기능</li><li>✓ 이메일 D-7/D-3/D-1</li><li>✓ 컨설턴트 첨삭</li></ul><button onClick={() => handlePayment('premium', 99000)} disabled={loading==='premium'} className="w-full bg-slate-900 text-white rounded-xl py-3.5 font-bold text-[14px]">{loading==='premium' ? '결제 중...' : isLive ? 'Premium 결제하기' : 'Premium 테스트 결제'}</button></div>
        </div>
      </div>
    </div>
  )
}
