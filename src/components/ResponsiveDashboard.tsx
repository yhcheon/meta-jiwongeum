'use client'
import { MobileNav } from './MobileNav'

export function ResponsiveDashboard() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 md:pb-0">
      {/* Desktop: 2 columns, Mobile: 1 column */}
      <div className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 md:p-6">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-sm md:text-base">종합 준비도 62 / 100점</h2>
              <span className="text-xs bg-[#F1F5F9] px-2 py-1 rounded-full">3개 선택됨</span>
            </div>
            <div className="mt-4 flex gap-4">
              <div className="w-20 h-20 rounded-full border-8 border-[#2563EB] flex items-center justify-center font-bold">62</div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between text-xs"><span>R&D 역량</span><span>80점</span></div>
                <div className="w-full bg-[#E2E8F0] h-2 rounded"><div className="bg-[#2563EB] h-2 rounded w-[80%]"></div></div>
                <div className="flex justify-between text-xs"><span>인력 구성</span><span>70점</span></div>
                <div className="w-full bg-[#E2E8F0] h-2 rounded"><div className="bg-[#2563EB] h-2 rounded w-[70%]"></div></div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-[#0F172A] text-white rounded-xl p-4 md:p-6">
            <div className="text-xs text-[#94A3B8]">실시간 조건 변경 시뮬레이션</div>
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div><div className="text-lg font-bold">62→74점</div><div className="text-[10px]">+12점 상승</div></div>
              <div><div className="text-lg font-bold">4→11건</div><div className="text-[10px]">2.8배 증가</div></div>
              <div><div className="text-lg font-bold">+1.8억</div><div className="text-[10px]">증가</div></div>
            </div>
          </div>
        </div>
      </div>
      <MobileNav />
    </div>
  )
}
