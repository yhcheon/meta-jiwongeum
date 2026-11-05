'use client'
import { generateBusinessPlan } from '@/lib/docGenerator'
export function WordButton() {
  return <button onClick={async()=>{ const blob = await generateBusinessPlan({name:'(주)넥스트코어', businessField:'IT/SaaS'}, {title:'창업도약패키지', agency:'중기부', maxAmount:'2.5억원'}, {total:62}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='사업계획서_초안.docx'; a.click(); }}>Word 다운로드</button>
}
