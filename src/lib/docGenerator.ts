import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx"

export async function generateBusinessPlan(company: { name: string, businessField: string }, grant: { title: string, agency: string, maxAmount: string }, readiness: { total: number }) {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({ text: "정부지원사업 사업계획서 초안 - 지원금 챙김이", heading: HeadingLevel.HEADING_1 }),
        new Paragraph({ text: `회사명: ${company.name}`, spacing: { after: 200 } }),
        new Paragraph({ text: `사업 분야: ${company.businessField}`, spacing: { after: 200 } }),
        new Paragraph({ text: `지원 사업: ${grant.title}`, spacing: { after: 200 } }),
        new Paragraph({ text: `주관 기관: ${grant.agency}`, spacing: { after: 200 } }),
        new Paragraph({ text: `지원 금액: ${grant.maxAmount}`, spacing: { after: 200 } }),
        new Paragraph({ text: `정부지원 준비도: ${readiness.total}점 / 100점`, spacing: { after: 400 } }),
        new Paragraph({ text: "1. 사업 개요", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ children: [new TextRun({ text: `${company.name}은(는) ${company.businessField} 분야의 혁신 기업으로, ${grant.title} 사업을 통해 성장을 도모하고자 합니다.`, break: 1 })], spacing: { after: 200 } }),
        new Paragraph({ text: "2. 기술성 및 사업성", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: "본 사업은 기술적 우수성과 시장성을 동시에 확보하고 있으며, 벤처기업인증 및 기업부설연구소 보유로 R&D 역량이 검증되었습니다.", spacing: { after: 200 } }),
        new Paragraph({ text: "3. 기대 효과", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: `본 사업을 통해 최대 ${grant.maxAmount}의 자금 확보와 함께, 준비도 ${readiness.total}점에서 80점 이상으로의 도약이 예상됩니다.`, spacing: { after: 200 } }),
        new Paragraph({ text: "본 초안은 지원금 챙김이가 자동 생성한 문서입니다. 실제 제출 전 전문가 검토를 권장합니다.", spacing: { before: 400 } }),
      ]
    }]
  })

  const blob = await Packer.toBlob(doc)
  return blob
}
