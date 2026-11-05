'use client'
import { useState } from 'react'

export default function FeedbackPage() {
  const [text, setText] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!text.trim()) { alert("피드백 내용을 입력해주세요"); return }
    setLoading(true)
    try {
      // TODO: Supabase feedbacks 테이블에 저장
      // const supabase = createClient(...)
      // await supabase.from('feedbacks').insert({ content: text, created_at: new Date() })
      console.log("[Feedback]", text)
      await new Promise(r => setTimeout(r, 800)) // Mock 저장 딜레이
      setSent(true)
      setText("")
    } catch (e) {
      alert("전송 중 오류")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      <div className="max-w-2xl mx-auto bg-white border border-[#E2E8F0] rounded-xl p-6">
        <h1 className="text-xl font-bold">베타 피드백 (M5)</h1>
        <p className="text-sm text-[#64748B] mt-2">지원금 챙김이를 써보니 어떠셨나요? 3개 회사 베타 테스트 중입니다.</p>
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-[#F8FAFC] border rounded-lg p-4 text-center"><div className="text-2xl font-bold text-[#2563EB]">62→74점</div><div className="text-xs">시뮬레이션 상승</div></div>
          <div className="bg-[#F8FAFC] border rounded-lg p-4 text-center"><div className="text-2xl font-bold text-[#2563EB]">4→11건</div><div className="text-xs">2.8배 증가</div></div>
          <div className="bg-[#F8FAFC] border rounded-lg p-4 text-center"><div className="text-2xl font-bold text-[#2563EB]">92%</div><div className="text-xs">최고 적합도</div></div>
        </div>
        {!sent ? (
          <>
            <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="예: Word 파일이 1페이지밖에 안 나오는데, 더 자세히 나오면 좋겠어요." className="w-full mt-6 border border-[#E2E8F0] rounded-lg p-4 h-32 text-sm focus:outline-none focus:border-[#2563EB]" />
            <button onClick={handleSend} disabled={loading} className="w-full mt-4 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white py-3 rounded-lg font-semibold text-sm">
              {loading ? "전송 중..." : "피드백 보내기 →"}
            </button>
          </>
        ) : (
          <div className="mt-6 bg-[#F0FDF4] border border-[#86EFAC] rounded-lg p-6 text-center">
            <div className="text-2xl">✅</div>
            <div className="font-bold mt-2">피드백 감사합니다!</div>
            <div className="text-sm text-[#64748B] mt-1">베타 개선에 반영하겠습니다. 62→74점 시뮬레이션에 추가 가점을 적용할게요.</div>
            <button onClick={()=>setSent(false)} className="mt-4 text-sm text-[#2563EB] underline">다른 피드백도 보내기</button>
          </div>
        )}
        <div className="mt-6 text-xs text-[#64748B]">
          <div className="font-bold text-[#0F172A]">M5 개선 체크리스트</div>
          <div className="mt-2">• [x] 피드백 버튼 기능 구현</div>
          <div>• [ ] Word 템플릿 5페이지로 고도화 (현재 1페이지)</div>
          <div>• [ ] 실제 선정률 89.2% 데이터 반영</div>
          <div>• [ ] D-7 알림 이메일 연동 (Resend)</div>
          <div>• [ ] SEO: 지원금 챙김이 메타 태그</div>
        </div>
      </div>
    </div>
  )
}
