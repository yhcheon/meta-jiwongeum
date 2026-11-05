
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export function AlertBadge() {
  const [alerts, setAlerts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/alerts/send')
      .then(r => r.json())
      .then(data => {
        if (data.grants) setAlerts(data.grants)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="h-[56px] bg-slate-100 animate-pulse rounded-[12px]" />

  if (alerts.length === 0) {
    return (
      <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-[16px] p-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-[#22C55E] rounded-full flex items-center justify-center text-white text-[14px]">✓</div>
        <div>
          <div className="font-bold text-[13px] text-[#166534]">마감 임박 공고 없음</div>
          <div className="text-[11px] text-[#15803D]">51개 모두 여유 - D-7/D-3/D-1 모니터링 중</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-[16px] p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#F59E0B] rounded-full flex items-center justify-center text-white text-[14px] animate-pulse">!</div>
          <span className="font-bold text-[14px] text-[#92400E]">마감 임박 {alerts.length}개</span>
        </div>
        <Link href="/pricing" className="text-[11px] bg-[#92400E] text-white px-3 py-1 rounded-full font-bold hover:bg-[#78350F]">알림 설정</Link>
      </div>
      <div className="space-y-2">
        {alerts.map((g: any, i: number) => (
          <div key={i} className="bg-white border border-[#FDE68A] rounded-[12px] px-3 py-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${g.dday === 1 ? 'bg-red-100 text-red-700' : g.dday === 3 ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>{g.type}</span>
              <span className="text-[12px] font-semibold text-slate-800 truncate max-w-[180px]">{g.title}</span>
            </div>
            <span className="text-[11px] text-slate-500">{g.deadline}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
