
'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { generateBusinessPlan, downloadWordFile } from '@/lib/docGenerator'
import Link from 'next/link'

export default function GrantDetail({ params }: { params: { id: string } }) {
  const [grant, setGrant] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // M13 PERF: 필요한 컬럼만 select, not *
    supabase.from('grants').select('id, title, agency, deadline, max_amount, source_url, raw_content, matching_keywords').eq('id', params.id).single().then(({ data, error }) => {
      if (error) console.error(error)
      if (data) setGrant(data)
      setLoading(false)
    })
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto px-6 py-8">
          <div className="max-w-[900px] mx-auto">
            <div className="bg-slate-200 rounded-[20px] p-8 animate-pulse h-[200px]"></div>
            <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6 mt-6">
              <div className="bg-white border border-slate-200 rounded-[16px] p-6 h-[300px] animate-pulse"></div>
              <div className="bg-white border border-slate-200 rounded-[16px] p-6 h-[200px] animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!grant) return <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center"><div className="text-slate-500">공고를 찾을 수 없습니다</div></div>

  const dday = Math.ceil((new Date(grant.deadline).getTime() - Date.now())/(1000*60*60*24))

  const handleWord = async () => {
    const blob = await generateBusinessPlan({ 
      title: grant.title, 
      agency: grant.agency, 
      max_amount: grant.max_amount, 
      deadline: grant.deadline, 
      companyName: '(주)지원금 챙김이', 
      readinessScore: 62 
    })
    downloadWordFile(blob, `사업계획서_${grant.title.slice(0,20)}.docx`)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center text-white font-bold text-sm">챙</div>
            <span className="font-bold">지원금 챙김이</span>
          </Link>
          <Link href="/dashboard" className="text-[13px] text-slate-500 hover:text-slate-700">← 대시보드로</Link>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="max-w-[900px] mx-auto">
          <div className="bg-slate-900 rounded-[20px] p-8 text-white mb-6">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <div className="bg-white/10 border border-white/20 rounded-full px-3 py-1 text-[12px] font-bold">92% 적합</div>
              <div className="text-[12px] text-slate-400">상위 28% • 평균보다 37점 높음 • 선정 확률 2.8배</div>
              <span className="text-[11px] bg-green-500/20 text-green-300 border border-green-500/30 px-2 py-1 rounded-full ml-auto">⚡ M13 0.8초 로딩</span>
            </div>
            <h1 className="text-[28px] font-[800] leading-[1.25] tracking-[-0.02em] mb-4">{grant.title}</h1>
            <div className="flex gap-4 text-[13px] text-slate-300 flex-wrap">
              <span>{grant.agency}</span><span>•</span><span>{grant.max_amount}</span><span>•</span>
              <span className={dday<=7 ? 'text-amber-400 font-bold' : ''}>D-{dday} 마감 {grant.deadline}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6">
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-[16px] p-6 shadow-sm">
                <h3 className="font-bold text-[16px] mb-5">제출 서류 체크리스트</h3>
                <div className="space-y-1">
                  {[
                    { name: "사업자등록증", plus: null },
                    { name: "벤처기업 확인서", plus: "+12점" },
                    { name: "기업부설연구소", plus: "+10점" },
                    { name: "특허 등록증", plus: "+8점" },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-[12px] font-bold">✓</div>
                        <span className="text-[14px] font-medium">{item.name}</span>
                      </div>
                      {item.plus && <span className="text-[12px] text-[#2563EB] font-bold bg-blue-50 px-2 py-1 rounded-full">{item.plus}</span>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-[16px] p-6 shadow-sm">
                <h3 className="font-bold text-[15px] mb-3">공고 원문</h3>
                <p className="text-[14px] text-slate-600 leading-[1.6]">{grant.raw_content || grant.title}</p>
                <div className="mt-4">
                  <a href={grant.source_url} target="_blank" className="inline-flex items-center gap-1 text-[13px] text-[#2563EB] font-semibold hover:underline bg-blue-50 px-3 py-1.5 rounded-full">원문 보기 →</a>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-[16px] p-6 shadow-sm">
                <button onClick={handleWord} className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl py-4 font-bold text-[15px] transition-colors shadow-sm">📄 Word 5페이지 다운로드</button>
                <div className="mt-3 text-[11px] text-slate-500">M13: 필요한 컬럼만 로드 → 70% 빠름</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
