'use client'
import { useState } from 'react'
import { generateBusinessPlan } from '@/lib/docGenerator'

export default function GrantDetailPage({ params }: { params: { id: string } }) {
  const [downloading, setDownloading] = useState(false)
  const grant = {
    id: params.id,
    title: '2025 창업도약패키지 (스케일업 R&D)',
    agency: '중소벤처기업부',
    maxAmount: '최대 2.5억원',
    deadline: '2025-04-15',
    matchScore: 92
  }
  const company = { name: '(주)넥스트코어', businessField: 'IT/SaaS' }
  const readiness = { total: 62 }

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const blob = await generateBusinessPlan(company, grant, readiness)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${grant.title}_사업계획서_초안_${company.name}.docx`
      a.click()
      URL.revokeObjectURL(url)
    } catch (e) {
      console.error(e)
      alert('Word 생성 중 오류가 발생했습니다.')
    }
    setDownloading(false)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
            <div className="flex gap-2 mb-4">
              <span className="text-xs bg-[#FEF2F2] text-[#991B1B] border border-[#FCA5A5] px-3 py-1 rounded-full">D-12 마감임박</span>
              <span className="text-xs bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE] px-3 py-1 rounded-full">{grant.matchScore}% 적합</span>
              <span className="text-xs bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0] px-3 py-1 rounded-full">{grant.agency}</span>
            </div>
            <h1 className="text-2xl font-bold text-[#0F172A]">{grant.title}</h1>
            <div className="mt-2 text-sm text-[#64748B]">최대 {grant.maxAmount} · 마감 {grant.deadline}</div>
            
            <div className="mt-6">
              <h3 className="font-bold text-sm">자격 체크리스트 (자동 판정)</h3>
              <div className="mt-3 space-y-2">
                {[
                  { label: '창업 3~7년 이내', ok: true, reason: '설립 2023.04.15 → 2년차 충족' },
                  { label: '매출 10억 이하', ok: true, reason: '직전년도 3.5억 → 충족' },
                  { label: '벤처인증 보유 시 가점 +5점', ok: true, reason: '벤처인증 보유 → 가점 적용' },
                  { label: '기업부설연구소 보유', ok: true, reason: '부설연구소 보유 → 충족' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                    <div className="flex gap-2 items-center"><span className={item.ok ? 'text-green-600' : 'text-red-600'}>{item.ok ? '✓' : '✗'}</span><span className="text-sm font-medium">{item.label}</span></div>
                    <span className="text-xs text-[#64748B]">{item.reason}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-bold text-sm">평가 기준 역분석</h3>
              <div className="mt-3 border border-[#E2E8F0] rounded-lg overflow-hidden">
                <div className="grid grid-cols-3 bg-[#F8FAFC] text-xs font-semibold p-3 border-b"><span>평가 항목</span><span>배점</span><span>우리 회사 예상</span></div>
                <div className="grid grid-cols-3 text-sm p-3 border-b"><span>기술성</span><span>40점</span><span className="text-[#2563EB] font-bold">35점 예상</span></div>
                <div className="grid grid-cols-3 text-sm p-3 border-b"><span>사업성</span><span>30점</span><span className="text-[#2563EB] font-bold">25점 예상</span></div>
                <div className="grid grid-cols-3 text-sm p-3"><span>대표자 역량</span><span>30점</span><span className="text-[#2563EB] font-bold">28점 예상 (벤처인증 가점)</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sticky top-6">
            <div className="text-center"><div className="w-20 h-20 mx-auto rounded-full border-8 border-[#2563EB] flex items-center justify-center font-bold text-xl">{grant.matchScore}%</div><div className="text-sm font-bold mt-2">매칭 점수</div><div className="text-xs text-[#64748B]">상위 8% 적합</div></div>
            <div className="mt-6 space-y-2 text-xs">
              <div className="font-semibold">왜 92%인가?</div>
              <div>• IT/SaaS 분야 일치 +20점</div>
              <div>• 벤처기업인증 보유 +10점</div>
              <div>• 업력 2년차 최적 +15점</div>
              <div>• 기업부설연구소 보유 +8점</div>
            </div>
            <button onClick={handleDownload} disabled={downloading} className="w-full mt-6 bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-3 rounded-lg font-semibold text-sm disabled:opacity-50">
              {downloading ? '생성 중...' : '사업계획서 초안 생성 (10분) →'}
            </button>
            <button className="w-full mt-2 bg-white border border-[#E2E8F0] py-3 rounded-lg text-sm">공고 원문 보기</button>
            <div className="mt-4 text-xs text-[#64748B] text-center">생성된 Word 파일은 실제 제출 전 전문가 검토를 권장합니다.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
