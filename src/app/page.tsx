import Link from 'next/link'
export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <header className="border-b border-[#E2E8F0] bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-lg text-[#0F172A]">지원금 챙김이</div>
          <nav className="flex gap-6 text-sm items-center">
            <Link href="/onboarding" className="text-[#2563EB] font-semibold">시작하기</Link>
            <Link href="/dashboard" className="text-[#64748B]">대시보드</Link>
            <Link href="/onboarding" className="bg-[#2563EB] text-white px-4 py-2 rounded-lg">무료로 시작하기</Link>
          </nav>
        </div>
      </header>
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold tracking-tight leading-tight text-[#0F172A]">지난달 놓친 정부지원금만<br/>평균 <span className="text-[#2563EB]">3,000만원</span>입니다.</h1>
            <p className="mt-6 text-lg text-[#64748B]">지원금 챙김이가 2,341개 공고 중 우리 회사에 딱 맞는 것만 골라드립니다.</p>
            <Link href="/onboarding" className="inline-block mt-8 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-lg font-semibold">내 지원금 3,000만원 찾기 (30초) →</Link>
            <div className="mt-8 flex gap-6 text-sm"><span><b>482억원</b> <span className="text-[#64748B]">누적 발굴</span></span><span><b>96.4%</b> <span className="text-[#64748B]">합격률</span></span><span><b>4.8배</b> <span className="text-[#64748B]">서류시간 단축</span></span></div>
          </div>
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between"><span className="text-xs bg-[#FEF2F2] text-[#991B1B] border px-2 py-1 rounded-full">D-12 마감임박</span><span className="text-xs bg-[#EFF6FF] text-[#1E40AF] border px-2 py-1 rounded-full">92% 적합</span></div>
            <div className="font-bold mt-4">2025 창업도약패키지 (스케일업 R&D)</div>
            <div className="text-sm text-[#64748B] mt-1">중소벤처기업부 주관 · 최대 사업화 자금 2.5억원</div>
            <div className="mt-4 p-3 bg-[#F8FAFC] rounded-lg text-sm"><div className="font-semibold">87% 매칭</div><div className="text-xs text-[#64748B]">최대 1.2억원 · 기술평가 통과율 89.2%</div></div>
          </div>
        </div>
      </section>
    </main>
  )
}
