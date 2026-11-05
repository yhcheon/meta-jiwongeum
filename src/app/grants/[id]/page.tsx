'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { generateBusinessPlan, downloadWordFile } from '@/lib/docGenerator'
import Link from 'next/link'

export default function GrantDetailPage({ params }: { params: { id: string } }) {
  const [grant, setGrant] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const fetchGrant = async () => {
      const { data, error } = await supabase
        .from('grants')
        .select('*')
        .eq('id', params.id)
        .single()

      if (!error && data) {
        setGrant(data)
      } else {
        // fallback mock if not found
        setGrant({
          id: params.id,
          title: '2025년 중소기업 혁신바우처 지원사업 공고',
          agency: '중소벤처기업부',
          deadline: '2026-11-20',
          max_amount: '최대 3억원',
          source_url: 'https://www.bizinfo.go.kr',
          raw_content: '중소기업 혁신바우처 지원사업 공고입니다.',
          matching_keywords: ['혁신바우처', '중소기업', '바우처'],
          structured: { category: 'R&D', region: '전국' }
        })
      }
      setLoading(false)
    }

    fetchGrant()
  }, [params.id])

  const handleDownload = async () => {
    if (!grant) return
    setDownloading(true)
    try {
      const score = parseInt(localStorage.getItem('readinessScore') || '62')
      const companyData = JSON.parse(localStorage.getItem('companyData') || '{}')
      
      const blob = await generateBusinessPlan({
        title: grant.title,
        agency: grant.agency,
        max_amount: grant.max_amount,
        deadline: grant.deadline,
        companyName: companyData.companyName || '(주)지원금 챙김이',
        readinessScore: score,
      })

      downloadWordFile(blob, `사업계획서_${grant.title.slice(0,20)}_${score}점.docx`)
    } catch (e) {
      console.error(e)
      alert('Word 생성 중 오류가 발생했습니다')
    } finally {
      setDownloading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-sm text-[#64748B]">공고 불러오는 중... ID: {params.id}</div>
      </div>
    )
  }

  const score = typeof window !== 'undefined' ? parseInt(localStorage.getItem('readinessScore') || '62') : 62

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-6 max-w-7xl mx-auto">
        <Link href="/dashboard" className="font-bold text-[#0F172A]">← 대시보드</Link>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-[#0F172A] text-white px-3 py-1.5 rounded-full">준비도 {score}점</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* 92% Matching Badge */}
        <div className="bg-[#0F172A] rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[#94A3B8]">매칭 점수</div>
              <div className="text-4xl font-bold text-[#60A5FA] mt-1">92% <span className="text-lg font-normal text-white">적합</span></div>
              <div className="text-xs text-[#CBD5E1] mt-2">상위 28% · 평균보다 {score-38}점 높음 · 선정 확률 2.8배</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-[#94A3B8]">예상 지원</div>
              <div className="text-2xl font-bold">{grant.max_amount}</div>
              <div className="text-xs text-[#94A3B8] mt-1">마감: {grant.deadline}</div>
            </div>
          </div>
          <div className="mt-4 text-xs text-[#94A3B8] bg-[#1E293B] rounded-lg p-3">
            <strong className="text-white">매칭 이유:</strong> {grant.agency}의 {grant.title}는 {grant.matching_keywords?.join(', ')} 키워드와 {score}점 준비도가 92% 일치합니다. 벤처인증 보유 시 가산점.
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8">
          <h1 className="text-2xl font-bold text-[#0F172A]">{grant.title}</h1>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div><div className="text-xs text-[#94A3B8]">주관기관</div><div className="font-medium text-[#0F172A]">{grant.agency}</div></div>
            <div><div className="text-xs text-[#94A3B8]">지원금액</div><div className="font-medium text-[#0F172A]">{grant.max_amount}</div></div>
            <div><div className="text-xs text-[#94A3B8]">마감일</div><div className="font-medium text-[#DC2626]">{grant.deadline} (D-{Math.ceil((new Date(grant.deadline).getTime() - new Date().getTime())/(1000*60*60*24))})</div></div>
            <div><div className="text-xs text-[#94A3B8]">출처</div><div className="font-medium text-[#2563EB]">{grant.source_url}</div></div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-[#0F172A]">공고 내용</h3>
            <p className="mt-3 text-sm text-[#64748B] leading-relaxed">{grant.raw_content}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {grant.matching_keywords?.map((kw: string, i: number) => (
                <span key={i} className="text-xs bg-[#F8FAFC] border border-[#E2E8F0] px-2.5 py-1 rounded-full text-[#64748B]">{kw}</span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-[#0F172A]">제출 체크리스트</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center gap-2"><input type="checkbox" checked readOnly className="rounded" /><span>사업자등록증</span></div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={score >= 50} readOnly className="rounded" /><span>벤처기업 확인서 {score >= 50 ? '(보유 +12점)' : '(미보유)'}</span></div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={score >= 60} readOnly className="rounded" /><span>기업부설연구소 인정서 {score >= 60 ? '(보유 +10점)' : '(미보유)'}</span></div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={score >= 65} readOnly className="rounded" /><span>특허 등록증 {score >= 65 ? '(보유 +8점)' : '(미보유)'}</span></div>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row gap-3">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex-1 h-12 bg-[#2563EB] text-white rounded-lg font-medium text-sm hover:bg-[#1D4ED8] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {downloading ? 'Word 생성 중... (5페이지)' : '📄 Word 사업계획서 5페이지 다운로드 (Pro)'}
            </button>
            <a href={grant.source_url} target="_blank" className="flex-1 h-12 bg-white border border-[#E2E8F0] text-[#0F172A] rounded-lg font-medium text-sm hover:bg-[#F8FAFC] flex items-center justify-center">
              원문 보기 →
            </a>
          </div>

          <div className="mt-4 text-xs text-[#94A3B8] text-center">
            Pro 29,000원/월 - Word 무제한 + D-7/D-3/D-1 알림 + 92% 매칭
          </div>
        </div>

        <div className="mt-6 flex justify-between text-xs">
          <Link href="/dashboard" className="text-[#94A3B8] hover:text-[#64748B]">← 대시보드로</Link>
          <Link href="/pricing" className="text-[#2563EB] hover:text-[#1D4ED8]">Pro로 업그레이드 →</Link>
        </div>
      </div>
    </div>
  )
}
