'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({
    companyName: '',
    businessType: '',
    venture: false,
    lab: false,
    ip: false,
    innobiz: false,
  })
  const router = useRouter()

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // 완료 - localStorage에 저장하고 대시보드로
      localStorage.setItem('onboarded', 'true')
      localStorage.setItem('companyData', JSON.stringify(data))
      // 점수 계산: base 38 + venture 12 + lab 10 + ip 8 + innobiz 7
      let score = 38
      if (data.venture) score += 12
      if (data.lab) score += 10
      if (data.ip) score += 8
      if (data.innobiz) score += 7
      localStorage.setItem('readinessScore', score.toString())
      router.push('/dashboard')
    }
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[600px]">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#2563EB]">STEP {step} / 3</span>
            <span className="text-xs text-[#94A3B8]">{step === 1 ? '회사 정보' : step === 2 ? '역량 체크' : '결과 확인'}</span>
          </div>
          <div className="flex gap-1">
            <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-[#2563EB]' : 'bg-[#E2E8F0]'}`}></div>
            <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-[#2563EB]' : 'bg-[#E2E8F0]'}`}></div>
            <div className={`h-1 flex-1 rounded-full ${step >= 3 ? 'bg-[#2563EB]' : 'bg-[#E2E8F0]'}`}></div>
          </div>
          <div className="mt-2 text-xs text-[#94A3B8] text-center">로그인 완료 → 온보딩 → 대시보드</div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm">
          {step === 1 && (
            <div>
              <h1 className="text-2xl font-bold text-[#0F172A]">회사 정보를 알려주세요</h1>
              <p className="text-sm text-[#64748B] mt-2">30초만에 끝나요. 맞춤 지원금을 찾아드립니다.</p>
              
              <div className="mt-8 space-y-4">
                <div>
                  <label className="text-sm font-medium text-[#0F172A]">회사명</label>
                  <input
                    type="text"
                    placeholder="예: (주)지원금챙김이"
                    value={data.companyName}
                    onChange={(e) => setData({...data, companyName: e.target.value})}
                    className="mt-2 w-full h-12 px-4 rounded-lg border border-[#E2E8F0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A]">업종</label>
                  <select
                    value={data.businessType}
                    onChange={(e) => setData({...data, businessType: e.target.value})}
                    className="mt-2 w-full h-12 px-4 rounded-lg border border-[#E2E8F0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                  >
                    <option value="">선택해주세요</option>
                    <option value="제조">제조</option>
                    <option value="IT/SW">IT/SW</option>
                    <option value="서비스">서비스</option>
                    <option value="바이오">바이오</option>
                  </select>
                </div>
              </div>

              <button onClick={nextStep} className="mt-8 w-full h-12 bg-[#2563EB] text-white rounded-lg font-medium text-sm hover:bg-[#1D4ED8]">
                다음 → 역량 체크
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="text-2xl font-bold text-[#0F172A]">어떤 준비가 되어있나요?</h1>
              <p className="text-sm text-[#64748B] mt-2">체크할수록 정부지원 준비도 점수가 올라가요. 현재 38점 → 최대 75점</p>
              
              <div className="mt-8 space-y-3">
                {[
                  { key: 'venture', label: '벤처인증', desc: '벤처기업 확인서 보유 (+12점)', score: 12 },
                  { key: 'lab', label: '기업부설연구소', desc: '연구소 설립 완료 (+10점)', score: 10 },
                  { key: 'ip', label: '특허/IP', desc: '특허 등록 또는 출원 (+8점)', score: 8 },
                  { key: 'innobiz', label: '이노비즈 인증', desc: '기술혁신형 중소기업 (+7점)', score: 7 },
                ].map((item) => (
                  <label key={item.key} className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${data[item.key as keyof typeof data] ? 'bg-[#EFF6FF] border-[#2563EB]' : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1]'}`}>
                    <input
                      type="checkbox"
                      checked={!!data[item.key as keyof typeof data]}
                      onChange={(e) => setData({...data, [item.key]: e.target.checked})}
                      className="mt-1 w-5 h-5 rounded border-[#E2E8F0] text-[#2563EB] focus:ring-[#2563EB]"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-[#0F172A] text-sm">{item.label} <span className="text-[#2563EB]">+{item.score}점</span></div>
                      <div className="text-xs text-[#64748B] mt-1">{item.desc}</div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="mt-8 flex gap-3">
                <button onClick={prevStep} className="flex-1 h-12 bg-white border border-[#E2E8F0] text-[#0F172A] rounded-lg font-medium text-sm hover:bg-[#F8FAFC]">
                  ← 이전
                </button>
                <button onClick={nextStep} className="flex-[2] h-12 bg-[#2563EB] text-white rounded-lg font-medium text-sm hover:bg-[#1D4ED8]">
                  다음 → 결과 보기
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-[#EFF6FF] border border-[#DBEAFE] rounded-full px-4 py-1.5 text-xs font-medium text-[#2563EB] mb-4">
                분석 완료!
              </div>
              <h1 className="text-3xl font-bold text-[#0F172A]">정부지원 준비도 {(() => {
                let s = 38
                if (data.venture) s += 12
                if (data.lab) s += 10
                if (data.ip) s += 8
                if (data.innobiz) s += 7
                return s
              })()}점!</h1>
              <p className="text-sm text-[#64748B] mt-3">
                상위 28% · 평균보다 {(() => {
                let s = 38
                if (data.venture) s += 12
                if (data.lab) s += 10
                if (data.ip) s += 8
                if (data.innobiz) s += 7
                return s - 38
              })()}점 높아요
              </p>

              <div className="mt-8 bg-[#0F172A] rounded-2xl p-6 text-left text-white">
                <div className="text-sm font-medium">만약 모든 준비를 마치면?</div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[#60A5FA]">74점</div>
                    <div className="text-xs text-[#94A3B8] mt-1">준비도</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#60A5FA]">1.8억</div>
                    <div className="text-xs text-[#94A3B8] mt-1">추가 지원</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#60A5FA]">2.8배</div>
                    <div className="text-xs text-[#94A3B8] mt-1">선정 확률</div>
                  </div>
                </div>
                <div className="mt-4 text-xs text-[#64748B]">벤처인증 → 연구소 → 특허 3개만 추가해도 11개 지원금 더 받을 수 있어요</div>
              </div>

              <div className="mt-8 flex gap-3">
                <button onClick={prevStep} className="flex-1 h-12 bg-white border border-[#E2E8F0] text-[#0F172A] rounded-lg font-medium text-sm hover:bg-[#F8FAFC]">
                  ← 이전
                </button>
                <button onClick={nextStep} className="flex-[2] h-12 bg-[#2563EB] text-white rounded-lg font-medium text-sm hover:bg-[#1D4ED8]">
                  대시보드에서 지원금 보기 →
                </button>
              </div>

              <div className="mt-4 text-xs text-[#94A3B8]">클릭하면 대시보드로 이동합니다</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
