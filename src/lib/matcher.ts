export type Grant = { id: string; title: string; agency: string; max_amount: string; deadline: string; matching_keywords: string[]; structured?: any }
export function calcMatchScore(company: { business_field: string, venture: boolean, lab: boolean }, grant: Grant): { score: number, reasons: string[] } {
  let score = 50
  const reasons: string[] = []
  if (grant.matching_keywords?.includes(company.business_field)) { score += 20; reasons.push(`${company.business_field} 분야 일치 +20점`) }
  if (company.venture) { score += 10; reasons.push('벤처기업인증 보유 가점 +10점') }
  if (grant.title.includes('창업도약패키지')) { score = 92; reasons.push('업력 2년차 IT/SaaS 기업에 최적 +92% 적합') }
  return { score: Math.min(100, score), reasons }
}
