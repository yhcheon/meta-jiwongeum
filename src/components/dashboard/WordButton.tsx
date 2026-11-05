// src/components/dashboard/WordButton.tsx - M10 5페이지 호환
'use client'
import { generateBusinessPlan, downloadWordFile } from '@/lib/docGenerator'

export function WordButton({ grant, companyName, score }: { grant?: any, companyName?: string, score?: number }) {
  const handleDownload = async () => {
    const grantData = {
      title: grant?.title || '2025년 중소기업 혁신바우처 지원사업 공고',
      agency: grant?.agency || grant?.organization || '중소벤처기업부',
      max_amount: grant?.max_amount || grant?.maxAmount || '최대 1억원',
      deadline: grant?.deadline || '2026-11-10',
      companyName: companyName || '(주)지원금 챙김이',
      readinessScore: score || 62
    }
    
    try {
      const blob = await generateBusinessPlan(grantData)
      downloadWordFile(blob, `사업계획서_${grantData.title.substring(0,20)}.docx`)
    } catch (e) {
      console.error('Word 생성 실패', e)
      alert('Word 생성 실패: ' + (e as Error).message)
    }
  }

  return (
    <button 
      onClick={handleDownload}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-bold"
    >
      📄 Word 사업계획서 5페이지 다운로드 (Pro)
    </button>
  )
}

// Legacy default export for compatibility
export default function WordButtonLegacy() {
  return (
    <WordButton 
      grant={{ title: '창업도약패키지', agency: '중기부', max_amount: '2.5억원', deadline: '2026-11-10' }}
      companyName="(주)넥스트코어"
      score={62}
    />
  )
}
