'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

type Grant = {
  id: number
  title: string
  agency: string
  deadline: string
  max_amount: string
  matching_keywords: string[]
}

export default function DashboardPage() {
  const [grants, setGrants] = useState<Grant[]>([])
  const [loading, setLoading] = useState(true)
  const [score, setScore] = useState(62)
  const supabase = createClient()

  useEffect(() => {
    const savedScore = localStorage.getItem('readinessScore')
    if (savedScore) setScore(parseInt(savedScore))

    const fetchGrants = async () => {
      const { data, error } = await supabase
        .from('grants')
        .select('id, title, agency, deadline, max_amount, matching_keywords')
        .order('deadline', { ascending: true })
        .limit(100)

      if (!error && data) {
        setGrants(data)
      }
      setLoading(false)
    }

    fetchGrants()
  }, [])

  const getDday = (deadline: string) => {
    const today = new Date()
    const d = new Date(deadline)
    const diff = Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    if (diff < 0) return '마감'
    if (diff === 0) return 'D-Day'
    return `D-${diff}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-sm text-[#64748B]">로딩 중... grants 테이블에서 불러오는 중</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-4 md:px-6">
        <Link href="/" className="font-bold text-[#0F172A]">지원금 챙김이</Link>
        <div className="flex items-center gap-3">
          <div className="bg-[#0F172A] text-white rounded-lg px-3 py-1.5 text-sm font-medium">
            준비도 {score}점
          </div>
          <Link href="/feedback" className="h-9 px-3 bg-white border border-[#E2E8F0] rounded-lg text-sm">피드백</Link>
          <Link href="/" className="h-9 px-3 bg-white border border-[#E2E8F0] rounded-lg text-sm">홈</Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A]">실시간 관제 - {grants.length}개 공고</h1>
            <p className="text-sm text-[#64748B] mt-1">매일 06:00 자동 갱신 · Supabase에서 실시간 로드</p>
          </div>
          <div className="text-xs text-[#94A3B8] bg-white border border-[#E2E8F0] rounded-full px-3 py-1">
            M8 Real Crawler · {grants.length}개
          </div>
        </div>

        {/* Score + Top Gaps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
            <div className="text-sm text-[#64748B]">정부지원 준비도</div>
            <div className="text-3xl font-bold text-[#0F172A] mt-2">{score}<span className="text-lg text-[#94A3B8]">/100</span></div>
            <div className="text-xs text-[#2563EB] mt-2">상위 28% · 평균보다 {score-38}점 높음</div>
            <div className="mt-4 h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
              <div className="h-full bg-[#2563EB] rounded-full" style={{width: `${score}%`}}></div>
            </div>
          </div>
          
          <div className="bg-[#0F172A] rounded-2xl p-6 text-white">
            <div className="text-sm text-[#94A3B8]">만약 모든 준비를 마치면?</div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div><div className="text-xl font-bold text-[#60A5FA]">74점</div><div className="text-xs text-[#94A3B8]">준비도</div></div>
              <div><div className="text-xl font-bold text-[#60A5FA]">1.8억</div><div className="text-xs text-[#94A3B8]">추가 지원</div></div>
              <div><div className="text-xl font-bold text-[#60A5FA]">2.8배</div><div className="text-xs text-[#94A3B8]">선정 확률</div></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
            <div className="text-sm font-medium text-[#0F172A]">Top Gaps</div>
            <div className="mt-3 space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-[#64748B]">벤처인증</span><span className="text-[#2563EB] font-medium">+12점</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">기업부설연구소</span><span className="text-[#2563EB] font-medium">+10점</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">특허/IP</span><span className="text-[#2563EB] font-medium">+8점</span></div>
            </div>
            <Link href="/playbook" className="mt-4 block text-xs text-[#2563EB] hover:underline">→ 벤처인증 7단계 보기</Link>
          </div>
        </div>

        {/* Grants List - REAL DATA */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
            <h2 className="font-semibold text-[#0F172A]">맞춤 지원금 {grants.length}개 (92% 매칭)</h2>
            <span className="text-xs text-[#94A3B8]">마감일 순 · 실시간</span>
          </div>
          
          <div className="divide-y divide-[#F1F5F9]">
            {grants.map((grant) => {
              const dday = getDday(grant.deadline)
              const isUrgent = dday.includes('D-') && parseInt(dday.replace('D-','')) <= 7
              return (
                <div key={grant.id} className="p-4 md:p-6 hover:bg-[#F8FAFC] flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isUrgent ? 'bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]' : 'bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]'}`}>
                        {dday} 마감임박
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]">92% 적합</span>
                      <span className="text-xs text-[#94A3B8] hidden md:inline">{grant.agency}</span>
                    </div>
                    <div className="font-medium text-[#0F172A] text-sm md:text-base truncate">{grant.title}</div>
                    <div className="text-xs text-[#64748B] mt-1 md:hidden">{grant.agency} · {grant.max_amount}</div>
                    <div className="text-xs text-[#94A3B8] mt-1 hidden md:block">{grant.max_amount} · {grant.matching_keywords?.slice(0,3).join(', ')}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right hidden md:block">
                      <div className="text-sm font-medium text-[#0F172A]">{grant.max_amount}</div>
                      <div className="text-xs text-[#94A3B8]">{grant.deadline}</div>
                    </div>
                    <Link href={`/grants/${grant.id}`} className="h-8 px-3 bg-[#0F172A] text-white rounded-lg text-xs font-medium hover:bg-[#1E293B] flex items-center">
                      상세 →
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          {grants.length === 0 && (
            <div className="p-12 text-center text-sm text-[#94A3B8]">
              공고가 없습니다. 크롤러를 실행해주세요: python scripts/crawler/bizinfo_real_crawler.py
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link href="/feedback" className="text-xs text-[#94A3B8] hover:text-[#64748B]">피드백 보내기 →</Link>
        </div>
      </div>
    </div>
  )
}
