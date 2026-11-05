export default function PlaybookPage({ params }: { params: { slug: string } }) {
  const steps = [
    { no: 1, title: '유형 진단 (혁신성장유형)', duration: '1일', desc: '벤처투자 / 연구개발 / 혁신성장 중 혁신성장유형이 가장 유리합니다. 기술성 60% + 사업성 20% + 성장성 20%로 평가됩니다.' },
    { no: 2, title: '자가 진단 체크리스트', duration: '1일', desc: '매출, 특허, 연구인력, 인증 등 70점 이상인지 자가 진단합니다.' },
    { no: 3, title: '서류 준비 (6개)', duration: '3일', desc: '사업계획서, 법인등기부등본, 재무제표, 4대보험 가입자 명부, 특허증, 연구인력 증빙을 준비합니다.' },
    { no: 4, title: '벤처확인기관 접수', duration: '1일', desc: '벤처기업협회 홈페이지에서 온라인 접수합니다. 수수료 55만원.' },
    { no: 5, title: '현장 실사 대응', duration: '7~14일', desc: '평가위원이 방문하여 기술성과 사업성을 실사합니다. 연구소, 특허, 매출 증빙을 준비하세요.' },
    { no: 6, title: '심의 및 결과 통보', duration: '14일', desc: '70점 이상이면 인증서 발급. 미달 시 보완 후 재신청 가능합니다.' },
    { no: 7, title: '인증 후 활용', duration: '즉시', desc: 'R&D 가점, 세제 혜택, 정부지원사업 가점 등 12점 상승 효과가 즉시 적용됩니다.' },
  ]
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-bold">벤처기업인증 완전 정복 플레이북</h1>
              <div className="flex gap-2"><span className="text-xs bg-[#EFF6FF] text-[#2563EB] px-3 py-1 rounded-full">3주 완성</span><span className="text-xs bg-[#F1F5F9] px-3 py-1 rounded-full">0/7 steps</span></div>
            </div>
            <div className="relative">
              <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-[#E2E8F0]"></div>
              <div className="space-y-6">
                {steps.map(step => (
                  <div key={step.no} className="relative flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-sm font-bold z-10">{step.no}</div>
                    <div className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
                      <div className="flex justify-between"><span className="font-bold text-sm">{step.no}. {step.title}</span><span className="text-xs text-[#64748B] bg-white border px-2 py-1 rounded-full">{step.duration}</span></div>
                      <div className="text-sm text-[#64748B] mt-2">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full mt-8 bg-[#2563EB] text-white py-3 rounded-lg font-semibold">3주 완성 체크리스트 시작 →</button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
            <h3 className="font-bold text-sm">필수 서류 6개</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div>📄 사업계획서</div><div>📄 법인등기부등본</div><div>📄 재무제표 (최근 1년)</div><div>📄 4대보험 가입자 명부</div><div>📄 특허증 사본</div><div>📄 연구인력 증빙</div>
            </div>
            <div className="mt-4 pt-4 border-t space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-[#64748B]">수수료</span><span className="font-bold">55만원</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">합격 기준</span><span className="font-bold">70점</span></div>
            </div>
          </div>
          <div className="bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl p-4">
            <h3 className="font-bold text-sm text-[#991B1B]">자주 탈락하는 이유</h3>
            <div className="mt-2 text-xs text-[#991B1B] space-y-1">
              <div>• 매출 증빙 부족 (가장 많음)</div>
              <div>• 기술성 평가 미흡 - 특허 없음</div>
              <div>• 연구인력 2명 미만</div>
              <div>• 사업계획서 부실</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
