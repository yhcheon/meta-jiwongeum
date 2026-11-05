'use client'
import { useState } from 'react'
import { calcReadiness, Capabilities } from '@/lib/readiness'

export default function OnboardingPage() {
  const [step, setStep] = useState<1|2|3>(1)
  const [caps, setCaps] = useState<Capabilities>({ venture: true, lab: true, ip: true, innobiz: false, mainbiz: false, iso: false })
  const result = calcReadiness(caps)

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#E2E8F0]">
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#2563EB] font-semibold bg-[#EFF6FF] px-3 py-1 rounded-full">빠른 온보딩 ({step}/3단계)</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-[#E2E8F0] rounded-full overflow-hidden"><div className="h-full bg-[#2563EB]" style={{width: `${(step/3)*100}%`}} /></div>
              <span className="text-sm text-[#64748B]">{step}/3</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold mt-4">{step===1 ? '30초만에 시작하기' : step===2 ? '어떤 준비가 되어있나요?' : `정부지원 준비도 ${result.total}점! 상위 ${result.rankPercent}% 도약권입니다`}</h1>
        </div>

        {/* Step 1 */}
        {step===1 && (
          <div className="p-6 grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-4">
              <div><label className="text-sm font-medium">회사명</label><input defaultValue="(주)넥스트코어" className="w-full mt-1 border border-[#E2E8F0] rounded-lg p-3" /></div>
              <div><label className="text-sm font-medium">설립일자</label><div className="flex gap-2 mt-1"><button className="px-4 py-2 bg-[#2563EB] text-white rounded-lg text-sm">3년 미만</button><button className="px-4 py-2 border rounded-lg text-sm">3~7년</button><button className="px-4 py-2 border rounded-lg text-sm">7년 이상</button></div></div>
              <div><label className="text-sm font-medium">주요 사업 분야</label><div className="flex gap-2 mt-1"><span className="px-3 py-1 bg-[#2563EB] text-white rounded-full text-sm">IT/SaaS</span><span className="px-3 py-1 border rounded-full text-sm">바이오</span><span className="px-3 py-1 border rounded-full text-sm">제조</span></div></div>
            </div>
            <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
              <div className="text-xs text-[#2563EB] font-semibold">실시간 매칭 엔진 • 2,341개 분석 중</div>
              <div className="mt-3 p-3 bg-white rounded-lg border"><div className="text-sm font-bold">중기부 R&D D-14 최대 2.5억원 98% 적합도</div></div>
              <div className="mt-3 text-lg font-bold">현재 조건 예상 수혜<br/><span className="text-[#2563EB] text-2xl">{result.expectedAmount}+</span></div>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step===2 && (
          <div className="p-6">
            <div className="flex justify-end mb-4"><div className="bg-white border rounded-xl p-3 flex items-center gap-3"><div className="w-12 h-12 rounded-full border-4 border-[#2563EB] flex items-center justify-center font-bold">{result.total}</div><div className="text-sm"><div className="font-bold">현재 준비도 +{result.bonus}점 상승 중!</div><div className="text-xs text-[#64748B]">기본 {result.base}점 + 역량가점</div></div></div></div>
            <div className="grid grid-cols-2 gap-4">
              {[
                {k:'venture', label:'벤처기업인증', gain:'+12점 가점', desc:'서면평가 면제 및 주요 R&D 필수 요건'},
                {k:'lab', label:'기업부설연구소 / 전담부서', gain:'+10점 가점', desc:'연구개발 R&D 인건비 계상 및 조세 감면'},
                {k:'ip', label:'지식재산권 (특허/실용신안)', gain:'+8점 가점', desc:'등록 특허 1건 이상 또는 출원 2건'},
                {k:'innobiz', label:'이노비즈 (Inno-Biz)', gain:'+7점 상승 가능', desc:'기술혁신형 중소기업 인증'},
                {k:'mainbiz', label:'메인비즈 (Main-Biz)', gain:'+5점 상승 가능', desc:'경영혁신형 중소기업 인증'},
                {k:'iso', label:'ISO 인증 (9001/14001)', gain:'+4점 상승 가능', desc:'국제표준 품질/환경 경영시스템'},
              ].map(item => (
                <label key={item.k} className={`border rounded-xl p-4 flex justify-between items-start cursor-pointer ${caps[item.k as keyof Capabilities] ? 'border-[#2563EB] bg-[#EFF6FF]/30' : 'border-[#E2E8F0] bg-white'}`}>
                  <div><div className="font-semibold text-sm flex gap-2">{item.label} <span className="text-xs bg-[#EFF6FF] text-[#2563EB] px-2 py-0.5 rounded">{item.gain}</span></div><div className="text-xs text-[#64748B] mt-1">{item.desc}</div></div>
                  <input type="checkbox" checked={caps[item.k as keyof Capabilities]} onChange={e=> setCaps({...caps, [item.k]: e.target.checked})} className="w-5 h-5 accent-[#2563EB]" />
                </label>
              ))}
            </div>
            <div className="mt-6 p-4 bg-[#EFF6FF] rounded-xl text-sm"><span className="font-bold text-[#2563EB]">3개 역량 보유 확인</span>으로 즉시 지원 가능한 정부지원금이 4건에서 <span className="font-bold text-[#2563EB]">{result.grantCount}건</span>으로 <span className="font-bold">{result.increaseRate} 증가</span>했습니다!</div>
          </div>
        )}

        {/* Step 3 */}
        {step===3 && (
          <div className="p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-[#F8FAFC] rounded-xl p-4 border">
                <div className="text-xs font-semibold">DIAGNOSTIC SCORE</div>
                <div className="mt-4 flex justify-center"><div className="w-24 h-24 rounded-full border-8 border-[#2563EB] border-t-[#E2E8F0] flex items-center justify-center font-bold text-xl">{result.total}/100</div></div>
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between"><span>R&D 역량</span><span>80점</span></div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded"><div className="bg-[#2563EB] h-2 rounded" style={{width:'80%'}}/></div>
                  <div className="flex justify-between"><span>인증 지표</span><span className="text-[#DC2626]">40점</span></div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded"><div className="bg-orange-400 h-2 rounded" style={{width:'40%'}}/></div>
                </div>
              </div>
              <div className="col-span-2 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-xl p-4"><div className="text-xs text-[#64748B]">즉시 신청 가능 공고</div><div className="text-xl font-bold">{result.grantCount}개 공고</div><div className="text-xs text-[#64748B]">자격 결격 사유 0건 확인</div></div>
                  <div className="border rounded-xl p-4"><div className="text-xs text-[#64748B]">총 수혜 가능 한도</div><div className="text-xl font-bold text-[#2563EB]">최대 {result.expectedAmount}</div><div className="text-xs text-[#64748B]">R&D 2.5억 + 바우처 1억</div></div>
                </div>
                <div className="border rounded-xl p-4 bg-[#F8FAFC]"><div className="flex gap-2"><span className="text-xs bg-[#FEF2F2] text-[#991B1B] border border-[#FCA5A5] px-2 py-1 rounded-full">D-12 마감임박</span><span className="text-xs bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE] px-2 py-1 rounded-full">92% 적합</span></div><div className="font-bold mt-2">2025 창업도약패키지 (스케일업 R&D)</div><div className="text-xs text-[#64748B] mt-1">중소벤처기업부 주관 · 최대 사업화 자금 2.5억원 + 글로벌 진출 연계</div></div>
                <div className="mt-2"><div className="font-bold">🚀 합격 안정권(80점+) 돌파를 위한 로드맵 시뮬레이션</div><div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="border rounded-xl p-3"><div className="text-xs bg-yellow-100 px-2 py-1 rounded inline">가점 부스터 +12점 → 총 {result.simulation.ifVenture.total}점</div><div className="font-bold text-sm mt-2">벤처기업인증 취득 시</div><div className="text-xs text-[#64748B] mt-1">소요 기간 약 45일 · 합격률 96.4% 패스트플레이북 제공</div><div className="text-xs text-[#2563EB] mt-2 font-semibold">3주 완성 플레이북 보기 →</div></div>
                  <div className="border rounded-xl p-3"><div className="text-xs bg-green-100 px-2 py-1 rounded inline">80점 돌파 키 +8점 → 총 {Math.min(100, result.total+8)}점 도달!</div><div className="font-bold text-sm mt-2">기업부설연구소 승격</div><div className="text-xs text-[#64748B] mt-1">예상 소요 2~3주 · 인증 즉시 법인세/R&D 가점 연계</div><div className="text-xs text-[#2563EB] mt-2 font-semibold">연구소 승격 체크리스트 →</div></div>
                </div></div>
              </div>
            </div>
          </div>
        )}

        <div className="p-6 border-t border-[#E2E8F0] flex justify-between">
          <button disabled={step===1} onClick={()=> setStep(s=> Math.max(1, s-1) as any)} className="px-4 py-2 border rounded-lg text-sm disabled:opacity-30">← 이전</button>
          {step<3 ? <button onClick={()=> setStep(s=> (s+1) as any)} className="px-6 py-2 bg-[#2563EB] text-white rounded-lg text-sm font-semibold">다음: {step===1 ? '보유 역량 확인 (2/3)' : 'AI 진단 리포트 확인 (3/3)'} →</button> : <button onClick={()=> window.location.href='/dashboard'} className="px-6 py-2 bg-[#2563EB] text-white rounded-lg text-sm font-semibold">내 맞춤 지원금 3개 및 대시보드 바로가기 →</button>}
        </div>
      </div>
    </div>
  )
}
