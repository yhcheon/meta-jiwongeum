'use client'
import { calcReadiness } from '@/lib/readiness'

export default function Dashboard() {
  const result = calcReadiness({ venture: true, lab: true, ip: true, innobiz: false, mainbiz: false, iso: false })
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl p-4 flex justify-between items-center">
          <div className="text-sm"><span className="font-bold text-[#991B1B]">D-7</span> 2025 상반기 중기부 R&D 신청 마감까지 D-7, 현재 인증 점수 미비로 가점 5점 누락 상태입니다.</div>
          <button className="text-xs bg-white border border-[#FCA5A5] text-[#DC2626] px-3 py-1 rounded-full">긴급 가점 보완 진단</button>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
            <div className="font-bold">정부지원 준비도 정밀 진단</div>
            <div className="mt-4 flex items-center gap-4"><div className="w-20 h-20 rounded-full border-8 border-[#2563EB] flex items-center justify-center font-bold">{result.total}</div><div><div className="font-bold">{result.total}/100</div><div className="text-xs text-[#64748B]">상위 {result.rankPercent}% 도약권</div></div></div>
            <div className="mt-4 space-y-2 text-xs"><div>R&D 역량 80점</div><div className="w-full bg-[#E2E8F0] h-2 rounded"><div className="bg-[#2563EB] h-2 rounded w-[80%]"/></div><div>인증 지표 40점</div><div className="w-full bg-[#E2E8F0] h-2 rounded"><div className="bg-orange-400 h-2 rounded w-[40%]"/></div></div>
          </div>
          <div className="col-span-2 bg-white border border-[#E2E8F0] rounded-xl p-6">
            <div className="font-bold">점수 역전 필수 보완 과제 (Top Gaps)</div>
            <div className="mt-4 space-y-3">
              {result.allGaps.slice(0,3).map(g=>(
                <div key={g.key} className="border rounded-xl p-3 flex justify-between items-center">
                  <div><div className="font-semibold text-sm">{g.label}</div><div className="text-xs text-[#64748B]">{g.desc}</div></div>
                  <div className="flex gap-2 items-center"><span className="text-xs bg-[#FEF2F2] text-[#991B1B] px-2 py-1 rounded-full">{g.penalty}점</span><span className="text-xs bg-[#EFF6FF] text-[#2563EB] px-2 py-1 rounded-full">+{g.gain}점 상승 예상</span><span className="text-xs text-[#2563EB]">플레이북 보기</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[#0F172A] text-white rounded-xl p-6">
          <div className="font-bold">시뮬레이션: 만약 이번 달에 벤처기업인증을 취득한다면?</div>
          <div className="grid grid-cols-3 gap-6 mt-4">
            <div><div className="text-xs text-gray-400">준비도</div><div className="font-bold text-lg">{result.total}점 → {result.simulation.ifVenture.total}점 <span className="text-[#60A5FA]">+12</span></div></div>
            <div><div className="text-xs text-gray-400">즉시 지원 가능</div><div className="font-bold text-lg">4건 → {result.simulation.ifVenture.grantCount}건 <span className="text-[#60A5FA]">+7건</span></div></div>
            <div><div className="text-xs text-gray-400">총 수혜 가능</div><div className="font-bold text-lg text-[#60A5FA]">+{result.simulation.ifVenture.amountPlus}</div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
