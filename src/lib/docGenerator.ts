// src/lib/docGenerator.ts - M10 Word 5페이지 확실하게
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, PageBreak } from 'docx'

export interface GrantData {
  title: string
  agency: string
  max_amount: string
  deadline: string
  companyName?: string
  readinessScore?: number
}

export async function generateBusinessPlan(grant: GrantData): Promise<Blob> {
  const companyName = grant.companyName || '(주)지원금 챙김이'
  const score = grant.readinessScore || 62

  const createPageBreak = () => new Paragraph({ children: [new TextRun({ text: '', break: 1 }), new TextRun({ text: '', break: 1 })], pageBreakBefore: true })

  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // ========== PAGE 1: 표지 ==========
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
          children: [new TextRun({ text: '정부지원사업 사업계획서', size: 48, bold: true, color: '2563EB' })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
          children: [new TextRun({ text: grant.title, size: 26, bold: true })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [
            new TextRun({ text: `제출처: ${grant.agency}\n`, size: 22 }),
            new TextRun({ text: `신청기업: ${companyName}\n`, size: 22 }),
            new TextRun({ text: `준비도: ${score}점 (상위 28%)\n`, size: 22, bold: true, color: '2563EB' }),
            new TextRun({ text: `지원금액: ${grant.max_amount}\n`, size: 22 }),
            new TextRun({ text: `마감일: ${grant.deadline}\n`, size: 22 }),
            new TextRun({ text: `작성일: ${new Date().toLocaleDateString('ko-KR')}`, size: 20, color: '94A3B8' }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 800 },
          children: [
            new TextRun({ text: '지원금 챙김이 자동 생성 (5페이지)', size: 16, color: '94A3B8', italics: true }),
            new TextRun({ text: '\nhttps://meta-jiwongeum-yhcheon.vercel.app', size: 14, color: '2563EB' }),
            new TextRun({ text: '\n\n--- 1/5 페이지: 표지 ---', size: 12, color: 'E2E8F0' }),
          ],
        }),

        // ========== PAGE 2: 사업 개요 ==========
        new Paragraph({ pageBreakBefore: true, heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: '1. 사업 개요 (2/5 페이지)', bold: true, size: 28, color: '0F172A' })] }),
        new Paragraph({ spacing: { after: 300 }, children: [new TextRun({ text: `본 사업은 ${grant.title}에 부합하는 ${companyName}의 혁신 사업으로, 정부지원 준비도 ${score}점을 기반으로 선정 확률 92%를 확보하였습니다. ${grant.agency}의 지원 기준에 완벽히 부합합니다.`, size: 22 })] }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({ children: [new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: '구분', bold: true })] })] }), new TableCell({ children: [new Paragraph('내용')] })] }),
            new TableRow({ children: [new TableCell({ children: [new Paragraph('사업명')] }), new TableCell({ children: [new Paragraph(grant.title)] })] }),
            new TableRow({ children: [new TableCell({ children: [new Paragraph('주관기관')] }), new TableCell({ children: [new Paragraph(grant.agency)] })] }),
            new TableRow({ children: [new TableCell({ children: [new Paragraph('신청기업')] }), new TableCell({ children: [new Paragraph(companyName)] })] }),
            new TableRow({ children: [new TableCell({ children: [new Paragraph('지원금액')] }), new TableCell({ children: [new Paragraph(grant.max_amount)] })] }),
            new TableRow({ children: [new TableCell({ children: [new Paragraph('준비도')] }), new TableCell({ children: [new Paragraph(`${score}점 (상위 28%, 평균 대비 +${score-38}점, 92% 매칭)`)] })] }),
            new TableRow({ children: [new TableCell({ children: [new Paragraph('마감일')] }), new TableCell({ children: [new Paragraph(grant.deadline)] })] }),
          ],
        }),
        new Paragraph({ spacing: { before: 400 }, children: [new TextRun({ text: '사업의 필요성: 중소기업의 기술 개발 및 사업화 자금 확보가 절실하며, 본 공고는 평균 3,000만원의 지원금을 놓치는 기업을 위해 마련되었습니다. 챙김이는 92% 매칭으로 선정 확률을 높입니다.', size: 22 })] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: '--- 2/5 페이지: 사업 개요 ---', size: 12, color: 'E2E8F0' })] }),

        // ========== PAGE 3: 기업 역량 ==========
        new Paragraph({ pageBreakBefore: true, heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: '2. 기업 역량 및 준비도 분석 (3/5 페이지)', bold: true, size: 28 })] }),
        new Paragraph({
          children: [
            new TextRun({ text: `정부지원 준비도 ${score}점 상세 분석\n\n`, bold: true, size: 24 }),
            new TextRun({ text: `현재 ${companyName}의 정부지원 준비도는 ${score}점으로, 중소기업 평균 38점 대비 ${score-38}점 높으며 상위 28%에 해당합니다. 이는 벤처인증, 연구소, IP 등 핵심 역량 보유에 기인합니다.\n\n`, size: 22 }),
            new TextRun({ text: '[세부 역량]\n', bold: true, size: 22 }),
            new TextRun({ text: `• Base 점수: 38점 (기본 역량: 사업자등록, 재무, 인력)\n`, size: 22 }),
            new TextRun({ text: `• 벤처인증: ${score >= 50 ? '+12점 (보유)' : '0점 (미보유, +12점 가능) - 벤처기업 확인서 필요'}\n`, size: 22 }),
            new TextRun({ text: `• 기업부설연구소: ${score >= 60 ? '+10점 (보유)' : '0점 (미보유, +10점 가능) - 연구소 설립 필요'}\n`, size: 22 }),
            new TextRun({ text: `• 특허/IP: ${score >= 65 ? '+8점 (보유)' : '0점 (미보유, +8점 가능) - 특허 1건 필요'}\n`, size: 22 }),
            new TextRun({ text: `• 이노비즈: ${score >= 70 ? '+7점 (보유)' : '0점 (미보유, +7점 가능) - 이노비즈 인증 필요'}\n`, size: 22 }),
            new TextRun({ text: `• 메인비즈/ISO 등: 최대 +9점\n\n`, size: 22 }),
            new TextRun({ text: '[개선 시 효과]\n', bold: true, size: 22 }),
            new TextRun({ text: `• 벤처인증 → 연구소 → 특허 3개 추가 시 74점 달성\n`, size: 22 }),
            new TextRun({ text: `• 추가 지원금 1.8억원, 매칭 공고 4개 → 11개 (2.8배), 선정 확률 2.8배 증가\n`, size: 22, bold: true, color: '2563EB' }),
            new TextRun({ text: `• 지원금 챙김이 플레이북 참고: /playbook (벤처인증 7단계)\n`, size: 20, color: '64748B' }),
          ],
        }),
        new Paragraph({ children: [new TextRun({ text: '--- 3/5 페이지: 기업 역량 ---', size: 12, color: 'E2E8F0' })] }),

        // ========== PAGE 4: 사업 내용 ==========
        new Paragraph({ pageBreakBefore: true, heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: '3. 사업 내용 및 추진 계획 (4/5 페이지)', bold: true, size: 28 })] }),
        new Paragraph({
          children: [
            new TextRun({ text: '3-1. 사업 목적\n', bold: true, size: 24 }),
            new TextRun({ text: `본 사업은 ${grant.agency}의 ${grant.title}를 통해 ${companyName}의 기술 고도화 및 시장 확대를 목적으로 합니다. 정부지원 준비도 ${score}점을 활용하여 92% 매칭된 사업으로 선정 확률이 높습니다.\n\n`, size: 22 }),
            new TextRun({ text: '3-2. 추진 내용\n', bold: true, size: 24 }),
            new TextRun({ text: `1) 기술 개발: 정부지원 준비도 ${score}점을 기반으로 R&D 역량 강화, 기업부설연구소 활용\n`, size: 22 }),
            new TextRun({ text: `2) 사업화: ${grant.max_amount} 규모의 사업화 자금 확보, 시제품 제작 및 마케팅\n`, size: 22 }),
            new TextRun({ text: `3) 성과 창출: 매출 2배, 고용 3명 창출, 특허 1건 추가 목표\n`, size: 22 }),
            new TextRun({ text: `4) 인증 확보: 벤처인증, 이노비즈 등 추가 인증으로 74점 달성\n\n`, size: 22 }),
            new TextRun({ text: '3-3. 추진 일정 (6개월)\n', bold: true, size: 24 }),
            new TextRun({ text: `• 1개월차: 사업 계획 수립 및 협약, 착수금 수령\n`, size: 22 }),
            new TextRun({ text: `• 2개월차: 기술 개발 착수, 연구소 활용\n`, size: 22 }),
            new TextRun({ text: `• 3개월차: 시제품 제작 및 테스트\n`, size: 22 }),
            new TextRun({ text: `• 4개월차: 사업화 준비, 마케팅 전략 수립\n`, size: 22 }),
            new TextRun({ text: `• 5개월차: 사업화 진행, 매출 발생\n`, size: 22 }),
            new TextRun({ text: `• 6개월차: 성과 보고 및 정산, 추가 지원금 1.8억 도전\n`, size: 22 }),
          ],
        }),
        new Paragraph({ children: [new TextRun({ text: '--- 4/5 페이지: 사업 내용 ---', size: 12, color: 'E2E8F0' })] }),

        // ========== PAGE 5: 기대 효과 + 첨부 ==========
        new Paragraph({ pageBreakBefore: true, heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: '4. 기대 효과 및 5. 첨부 (5/5 페이지)', bold: true, size: 28 })] }),
        new Paragraph({
          children: [
            new TextRun({ text: '4-1. 기대 효과\n', bold: true, size: 24 }),
            new TextRun({ text: `• 직접 효과: ${grant.max_amount} 자금 확보, 기술 경쟁력 강화, 매출 2배\n`, size: 22 }),
            new TextRun({ text: `• 간접 효과: 벤처인증, 연구소 등 추가 역량 확보 시 74점 → 1.8억 추가 지원 가능, 2.8배 선정 확률\n`, size: 22 }),
            new TextRun({ text: `• 고용 창출: 3명 (개발 1, 영업 1, 마케팅 1) - 정부 일자리 창출 기여\n`, size: 22 }),
            new TextRun({ text: `• 매출 증대: 전년 대비 2배 (정부지원 활용) - 3,000만원 평균 지원금 활용\n\n`, size: 22 }),
            new TextRun({ text: '4-2. 매칭 이유 (92% 적합)\n', bold: true, size: 24 }),
            new TextRun({ text: `본 공고는 ${companyName}의 업종, 역량, 준비도 ${score}점과 92% 매칭되며, 특히 벤처인증 및 연구소 보유 시 가산점이 있습니다. ${grant.agency}의 평가 기준에 부합하여 선정 확률이 높으며, 상위 28%에 해당합니다.\n\n`, size: 22 }),
            new TextRun({ text: '5. 첨부 및 체크리스트\n', bold: true, size: 26 }),
            new TextRun({ text: '제출 서류 체크리스트 (필수)\n', bold: true, size: 22 }),
            new TextRun({ text: `□ 사업자등록증 (필수)\n`, size: 22 }),
            new TextRun({ text: `□ 벤처기업 확인서 (해당 시, +12점, 75점 이상 시 필수)\n`, size: 22 }),
            new TextRun({ text: `□ 기업부설연구소 인정서 (해당 시, +10점)\n`, size: 22 }),
            new TextRun({ text: `□ 특허 등록증 (해당 시, +8점, 65점 이상 시)\n`, size: 22 }),
            new TextRun({ text: `□ 재무제표 (최근 2년, 필수)\n`, size: 22 }),
            new TextRun({ text: `□ 사업계획서 본문 (본 문서, 필수, 5페이지)\n`, size: 22 }),
            new TextRun({ text: `□ 고용보험 가입자 명부 (해당 시)\n\n`, size: 22 }),
            new TextRun({ text: '지원금 챙김이 자동 생성 정보\n', bold: true, size: 22 }),
            new TextRun({ text: `• 생성일: ${new Date().toLocaleDateString('ko-KR')} ${new Date().toLocaleTimeString('ko-KR')}\n`, size: 18 }),
            new TextRun({ text: `• 준비도: ${score}점 (상위 28%, 평균 대비 +${score-38}점)\n`, size: 18 }),
            new TextRun({ text: `• 매칭률: 92% (선정 확률 2.8배)\n`, size: 18 }),
            new TextRun({ text: `• 공고 출처: ${grant.title} / ${grant.agency} / 마감 ${grant.deadline}\n`, size: 18 }),
            new TextRun({ text: `• 예상 지원: ${grant.max_amount}\n`, size: 18 }),
            new TextRun({ text: `• 문의: https://meta-jiwongeum-yhcheon.vercel.app\n`, size: 18, color: '2563EB' }),
            new TextRun({ text: `• 서비스: 놓친 지원금, 챙김이가 다 챙겨드립니다\n\n`, size: 18, bold: true }),
            new TextRun({ text: '--- 5/5 페이지: 기대 효과 + 첨부 (끝) ---\n', size: 12, color: '2563EB', bold: true }),
            new TextRun({ text: '본 문서는 지원금 챙김이에 의해 자동 생성되었습니다. 실제 제출 시 기업 상황에 맞게 수정하여 사용하세요.', size: 12, color: '94A3B8', italics: true }),
          ],
        }),
      ],
    }],
  })

  const blob = await Packer.toBlob(doc)
  return blob
}

export function downloadWordFile(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
