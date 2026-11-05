export type Capabilities = { venture: boolean; lab: boolean; ip: boolean; innobiz: boolean; mainbiz: boolean; iso: boolean }
export const SCORES = { venture: 12, lab: 10, ip: 8, innobiz: 7, mainbiz: 5, iso: 4 }
export function calcReadiness(caps: Capabilities) {
  const base = 38
  let bonus = 0
  if (caps.venture) bonus += SCORES.venture
  if (caps.lab) bonus += SCORES.lab
  if (caps.ip) bonus += SCORES.ip
  if (caps.innobiz) bonus += SCORES.innobiz
  if (caps.mainbiz) bonus += SCORES.mainbiz
  if (caps.iso) bonus += SCORES.iso
  const total = Math.min(100, base + bonus)
  const gaps = []
  if (!caps.venture) gaps.push({ key: 'venture', label: '벤처기업인증 미보유', penalty: -12, gain: 12, desc: '서면평가 면제 및 R&D 필수 요건' })
  if (!caps.lab) gaps.push({ key: 'lab', label: '기업부설연구소 미전환', penalty: -10, gain: 10, desc: 'R&D 인건비 계상 및 조세 감면' })
  if (!caps.ip) gaps.push({ key: 'ip', label: '핵심 특허 1건 부족', penalty: -8, gain: 8, desc: '등록 특허 1건 이상 또는 출원 2건' })
  if (!caps.innobiz) gaps.push({ key: 'innobiz', label: '이노비즈 미보유', penalty: -7, gain: 7, desc: '기술혁신형 중소기업 인증' })
  if (!caps.mainbiz) gaps.push({ key: 'mainbiz', label: '메인비즈 미보유', penalty: -5, gain: 5, desc: '경영혁신형 중소기업 인증' })
  if (!caps.iso) gaps.push({ key: 'iso', label: 'ISO 인증 미보유', penalty: -4, gain: 4, desc: '품질/환경 경영시스템' })
  const grantCount = total >= 60 ? 11 : 4
  const expectedAmount = total >= 60 ? '3억 5,000만원' : '1억 2,000만원'
  const increaseRate = total >= 60 ? '2.8배' : '1.0배'
  const breakdown = { rnd: 80, hr: 70, sales: 60, ip: caps.ip ? 80 : 50, cert: caps.venture && caps.lab ? 80 : 40 }
  return { total, base, bonus, gaps: gaps.slice(0, 3), allGaps: gaps, grantCount, expectedAmount, increaseRate, breakdown, simulation: { ifVenture: { total: Math.min(100, total + 12), grantCount: grantCount + 7, amountPlus: '1.8억원' }, ifLab: { total: Math.min(100, total + 10), grantCount: grantCount + 5, amountPlus: '1.2억원' } }, rankPercent: total >= 70 ? 15 : total >= 60 ? 28 : 55, isPass: total >= 75 }
}
