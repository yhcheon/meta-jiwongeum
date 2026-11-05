
import Link from 'next/link'
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center text-white font-bold">챙</div>
            <span className="font-bold text-[17px]">지원금 챙김이</span>
          </div>
          <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">로그인</Link>
        </div>
      </header>
      <section className="max-w-[1200px] mx-auto px-6 pt-20 pb-16">
        <div className="max-w-[720px]">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-3 py-1.5 mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[13px] font-semibold text-blue-700">매일 06:00 51개 공고 자동 업데이트</span>
          </div>
          <h1 className="text-[48px] leading-[1.1] font-[800] tracking-[-0.03em] text-slate-900 mb-6">놓친 지원금,<br/><span className="text-[#2563EB]">챙김이가 다</span><br/>챙겨드립니다</h1>
          <p className="text-[18px] leading-[1.6] text-slate-600 mb-8 max-w-[480px]">평균 3,000만원의 정부지원금을 놓치고 계세요.<br/>51개 실시간 공고 중 92% 매칭된 사업만 골라드립니다.</p>
          <div className="flex gap-3 mb-12">
            <Link href="/login" className="bg-[#2563EB] text-white rounded-xl px-8 py-3.5 font-semibold text-[16px] hover:bg-[#1D4ED8]">무료로 시작하기 →</Link>
            <Link href="/dashboard" className="bg-white border border-slate-200 rounded-xl px-8 py-3.5 font-semibold text-[15px] hover:bg-slate-50">51개 공고 보기</Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="stitch-card p-5"><div className="text-[28px] font-[800]">51개</div><div className="text-[13px] text-slate-500 mt-1">실시간 공고</div></div>
            <div className="stitch-card p-5"><div className="text-[28px] font-[800] text-[#2563EB]">92%</div><div className="text-[13px] text-slate-500 mt-1">평균 매칭률</div></div>
            <div className="stitch-card p-5"><div className="text-[28px] font-[800]">3,000만원</div><div className="text-[13px] text-slate-500 mt-1">평균 지원금</div></div>
          </div>
        </div>
      </section>
    </div>
  )
}
