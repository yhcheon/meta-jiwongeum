export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">요금제 선택</h1>
          <p className="text-sm text-[#64748B] mt-2">놓친 지원금, 챙김이가 다 챙겨드립니다</p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
            <h3 className="font-bold">Free</h3><div className="text-2xl font-bold mt-2">0원</div><div className="text-xs text-[#64748B]">/월</div>
            <div className="mt-4 space-y-2 text-sm text-[#475569]">
              <div>✓ 월 3개 공고 추천</div><div>✓ 매칭 점수 보기</div><div className="text-[#94A3B8]">✗ 사업계획서 생성</div><div className="text-[#94A3B8]">✗ D-7 알림</div>
            </div>
            <button className="w-full mt-6 border border-[#E2E8F0] py-3 rounded-lg text-sm font-semibold">현재 플랜</button>
          </div>
          <div className="bg-[#0F172A] border border-[#0F172A] rounded-xl p-6 text-white relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2563EB] text-xs px-3 py-1 rounded-full font-bold">가장 인기</div>
            <h3 className="font-bold">Pro</h3><div className="text-2xl font-bold mt-2">29,000원</div><div className="text-xs text-[#94A3B8]">/월</div>
            <div className="mt-4 space-y-2 text-sm text-[#CBD5E1]">
              <div>✓ 무제한 공고 추천</div><div>✓ 사업계획서 초안 월 5개</div><div>✓ D-7 마감 알림</div><div>✓ 준비도 시뮬레이션</div>
            </div>
            <button className="w-full mt-6 bg-[#2563EB] hover:bg-[#1D4ED8] py-3 rounded-lg text-sm font-bold">Pro 구독하기</button>
            <div className="text-xs text-center mt-2 text-[#64748B]">Toss Payments 안전 결제</div>
          </div>
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
            <h3 className="font-bold">Premium</h3><div className="text-2xl font-bold mt-2">99,000원</div><div className="text-xs text-[#64748B]">/월</div>
            <div className="mt-4 space-y-2 text-sm text-[#475569]">
              <div>✓ Pro 모든 기능</div><div>✓ 사업계획서 무제한</div><div>✓ 전문가 1:1 컨설팅</div><div>✓ 선정 시뮬레이션 리포트</div>
            </div>
            <button className="w-full mt-6 bg-white border border-[#2563EB] text-[#2563EB] py-3 rounded-lg text-sm font-semibold">Premium 문의</button>
          </div>
        </div>
        <div className="mt-8 bg-white border rounded-xl p-4 text-xs text-[#64748B]">
          <div className="font-bold text-[#0F172A]">M4: 수익화 완료 체크</div>
          <div className="mt-2">• Toss Payments 연동 → Pro 결제 시 companies.subscription = pro 업데이트</div>
          <div>• Free는 Word 생성 막고 업그레이드 유도</div>
          <div>• D-7 알림: Supabase cron 매일 09:00 deadline 체크 → 이메일/문자</div>
        </div>
      </div>
    </div>
  )
}
