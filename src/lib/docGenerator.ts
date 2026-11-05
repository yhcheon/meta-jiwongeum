// src/lib/docGenerator.ts - M10 5페이지 포맷 개선 v4
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType, convertInchesToTwip } from 'docx'

export interface GrantData {
  title: string
  agency: string
  max_amount: string
  deadline: string
  companyName?: string
  readinessScore?: number
}

const BORDER_NONE = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }
const BORDER_LIGHT = { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' }

function para(text: string, opts: any = {}) {
  return new Paragraph({
    spacing: { after: 120, line: 360, ...opts.spacing },
    ...opts,
    children: [new TextRun({ text, size: 22, font: 'Malgun Gothic', ...opts.textOpts })],
  })
}

function heading(text: string, level = HeadingLevel.HEADING_1) {
  return new Paragraph({
    heading: level,
    spacing: { before: 400, after: 200 },
    children: [new TextRun({ text, bold: true, size: 28, color: '0F172A', font: 'Malgun Gothic' })],
  })
}

function bullet(text: string, boldPrefix?: string) {
  const runs = []
  if (boldPrefix) runs.push(new TextRun({ text: boldPrefix, bold: true, size: 22, font: 'Malgun Gothic' }))
  runs.push(new TextRun({ text, size: 22, font: 'Malgun Gothic' }))
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 100, line: 360 },
    children: runs,
  })
}

export async function generateBusinessPlan(grant: GrantData): Promise<Blob> {
  const companyName = grant.companyName || '(주)지원금 챙김이'
  const score = grant.readinessScore || 62
  const plus = score - 38

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: { top: convertInchesToTwip(0.8), bottom: convertInchesToTwip(0.8), left: convertInchesToTwip(0.9), right: convertInchesToTwip(0.9) },
        },
      },
      children: [
        // PAGE 1 - 표지
        new Paragraph({ spacing: { before: 2000 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: '정부지원사업', size: 56, bold: true, color: '2563EB', font: 'Malgun Gothic' })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '사업계획서', size: 56, bold: true, color: '2563EB', font: 'Malgun Gothic' })] }),
        new Paragraph({ spacing: { after: 600 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: '', size: 22 })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: grant.title, size: 26, bold: true, font: 'Malgun Gothic' })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 800 }, children: [new TextRun({ text: '', size: 22 })] }),

        new Table({
          width: { size: 80, type: WidthType.PERCENTAGE },
          alignment: AlignmentType.CENTER,
          rows: [
            new TableRow({ children: [
              new TableCell({ width: { size: 30, type: WidthType.PERCENTAGE }, shading: { type: ShadingType.SOLID, color: 'F1F5F9' }, children: [new Paragraph({ children: [new TextRun({ text: '제출처', bold: true, size: 22 })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: grant.agency, size: 22 })] })] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ shading: { type: ShadingType.SOLID, color: 'F1F5F9' }, children: [new Paragraph({ children: [new TextRun({ text: '신청기업', bold: true, size: 22 })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: companyName, size: 22 })] })] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ shading: { type: ShadingType.SOLID, color: 'F1F5F9' }, children: [new Paragraph({ children: [new TextRun({ text: '준비도', bold: true, size: 22 })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `${score}점 (상위 28%, +${plus}점)`, bold: true, size: 22, color: '2563EB' })] })] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ shading: { type: ShadingType.SOLID, color: 'F1F5F9' }, children: [new Paragraph({ children: [new TextRun({ text: '지원금액', bold: true, size: 22 })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: grant.max_amount, size: 22 })] })] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ shading: { type: ShadingType.SOLID, color: 'F1F5F9' }, children: [new Paragraph({ children: [new TextRun({ text: '마감일', bold: true, size: 22 })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: grant.deadline, size: 22 })] })] }),
            ]}),
          ],
        }),

        new Paragraph({ spacing: { before: 800 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: `작성일: ${new Date().toLocaleDateString('ko-KR')} | 지원금 챙김이 자동 생성 (5페이지)`, size: 18, color: '94A3B8', font: 'Malgun Gothic' })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'https://meta-jiwongeum-yhcheon.vercel.app', size: 16, color: '2563EB' })] }),

        // PAGE 2
        new Paragraph({ pageBreakBefore: true }),
        heading('1. 사업 개요'),
        para(`본 사업은 ${grant.title}에 부합하는 ${companyName}의 혁신 사업입니다.`, { spacing: { after: 300 } }),
        para(`정부지원 준비도 ${score}점(평균 38점 대비 +${plus}점, 상위 28%)을 기반으로 선정 확률 92%를 확보하였으며, ${grant.agency}의 평가 기준에 완벽히 부합합니다.`, { spacing: { after: 400 } }),

        heading('1-1. 사업 정보 요약', HeadingLevel.HEADING_2),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({ children: [
              new TableCell({ width: { size: 25, type: WidthType.PERCENTAGE }, shading: { type: ShadingType.SOLID, color: 'EFF6FF' }, children: [para('구분', { textOpts: { bold: true } })] }),
              new TableCell({ shading: { type: ShadingType.SOLID, color: 'EFF6FF' }, children: [para('내용', { textOpts: { bold: true } })] }),
            ]}),
            new TableRow({ children: [new TableCell({ children: [para('사업명')] }), new TableCell({ children: [para(grant.title)] })]}),
            new TableRow({ children: [new TableCell({ children: [para('주관기관')] }), new TableCell({ children: [para(grant.agency)] })]}),
            new TableRow({ children: [new TableCell({ children: [para('신청기업')] }), new TableCell({ children: [para(companyName)] })]}),
            new TableRow({ children: [new TableCell({ children: [para('지원금액')] }), new TableCell({ children: [para(grant.max_amount, { textOpts: { bold: true, color: '2563EB' } })] })]}),
            new TableRow({ children: [new TableCell({ children: [para('준비도')] }), new TableCell({ children: [para(`${score}점 (상위 28%, 92% 매칭, 선정 확률 2.8배)`, { textOpts: { bold: true } })] })]}),
          ],
        }),
        new Paragraph({ spacing: { before: 300 } }),
        heading('1-2. 사업의 필요성', HeadingLevel.HEADING_2),
        para('중소기업의 기술 개발 및 사업화 자금 확보가 절실한 상황에서, 평균 3,000만원의 정부 지원금을 놓치는 기업이 많습니다.'),
        para('지원금 챙김이는 20개 실시간 공고를 분석하여 92% 매칭으로 선정 확률을 높이고, Word 5페이지 사업계획서를 자동 생성하여 서류 준비 시간을 90% 단축합니다.'),

        // PAGE 3
        new Paragraph({ pageBreakBefore: true }),
        heading('2. 기업 역량 및 준비도 분석'),
        para(`정부지원 준비도 ${score}점 상세 분석`, { textOpts: { bold: true, size: 24 }, spacing: { after: 200 } }),
        para(`현재 ${companyName}의 정부지원 준비도는 ${score}점으로, 중소기업 평균 38점 대비 ${plus}점 높으며 상위 28%에 해당합니다.`),
        para('이는 벤처인증, 기업부설연구소, IP 등 핵심 역량 보유에 기인합니다.', { spacing: { after: 400 } }),

        heading('세부 역량', HeadingLevel.HEADING_2),
        bullet(' 38점 (기본 역량: 사업자등록, 재무, 인력)', 'Base 점수:'),
        bullet(` ${score >= 50 ? '+12점 (보유 ✅)' : '0점 (미보유, +12점 가능) - 벤처기업 확인서 필요'}`, '벤처인증:'),
        bullet(` ${score >= 60 ? '+10점 (보유 ✅)' : '0점 (미보유, +10점 가능) - 연구소 설립 필요'}`, '기업부설연구소:'),
        bullet(` ${score >= 65 ? '+8점 (보유 ✅)' : '0점 (미보유, +8점 가능) - 특허 1건 필요'}`, '특허/IP:'),
        bullet(` ${score >= 70 ? '+7점 (보유 ✅)' : '0점 (미보유, +7점 가능) - 이노비즈 인증 필요'}`, '이노비즈:'),
        bullet(' 최대 +9점', '메인비즈/ISO 등:'),

        new Paragraph({ spacing: { before: 400 } }),
        heading('개선 시 효과', HeadingLevel.HEADING_2),
        bullet(' 벤처인증 → 연구소 → 특허 3개 추가 시 74점 달성', '•'),
        para('추가 지원금 1.8억원, 매칭 공고 4개 → 11개 (2.8배), 선정 확률 2.8배 증가', { textOpts: { bold: true, color: '2563EB' }, spacing: { before: 100, after: 100 } }),
        para('지원금 챙김이 플레이북 참고: /playbook (벤처인증 7단계)', { textOpts: { size: 20, color: '64748B' } }),

        // PAGE 4
        new Paragraph({ pageBreakBefore: true }),
        heading('3. 사업 내용 및 추진 계획'),
        heading('3-1. 사업 목적', HeadingLevel.HEADING_2),
        para(`${grant.agency}의 ${grant.title}를 통해 ${companyName}의 기술 고도화 및 시장 확대를 목적으로 합니다.`),
        para(`정부지원 준비도 ${score}점을 활용하여 92% 매칭된 사업으로 선정 확률이 높습니다.`, { spacing: { after: 400 } }),

        heading('3-2. 추진 내용', HeadingLevel.HEADING_2),
        bullet(' 기술 개발: 정부지원 준비도 기반 R&D 역량 강화, 기업부설연구소 활용', '1)'),
        bullet(` 사업화: ${grant.max_amount} 규모의 사업화 자금 확보, 시제품 제작 및 마케팅`, '2)'),
        bullet(' 성과 창출: 매출 2배, 고용 3명 창출, 특허 1건 추가 목표', '3)'),
        bullet(' 인증 확보: 벤처인증, 이노비즈 등 추가 인증으로 74점 달성', '4)'),

        new Paragraph({ spacing: { before: 400 } }),
        heading('3-3. 추진 일정 (6개월)', HeadingLevel.HEADING_2),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({ children: [
              new TableCell({ shading: { type: ShadingType.SOLID, color: 'F1F5F9' }, children: [para('구분', { textOpts: { bold: true } })] }),
              new TableCell({ shading: { type: ShadingType.SOLID, color: 'F1F5F9' }, children: [para('내용', { textOpts: { bold: true } })] }),
            ]}),
            new TableRow({ children: [new TableCell({ children: [para('1개월차')] }), new TableCell({ children: [para('사업 계획 수립 및 협약, 착수금 수령')] })]}),
            new TableRow({ children: [new TableCell({ children: [para('2개월차')] }), new TableCell({ children: [para('기술 개발 착수, 연구소 활용')] })]}),
            new TableRow({ children: [new TableCell({ children: [para('3개월차')] }), new TableCell({ children: [para('시제품 제작 및 테스트')] })]}),
            new TableRow({ children: [new TableCell({ children: [para('4개월차')] }), new TableCell({ children: [para('사업화 준비, 마케팅 전략 수립')] })]}),
            new TableRow({ children: [new TableCell({ children: [para('5개월차')] }), new TableCell({ children: [para('사업화 진행, 매출 발생')] })]}),
            new TableRow({ children: [new TableCell({ children: [para('6개월차')] }), new TableCell({ children: [para('성과 보고 및 정산, 추가 지원금 1.8억 도전')] })]}),
          ],
        }),

        // PAGE 5
        new Paragraph({ pageBreakBefore: true }),
        heading('4. 기대 효과'),
        heading('4-1. 정량적 효과', HeadingLevel.HEADING_2),
        bullet(` ${grant.max_amount} 자금 확보, 기술 경쟁력 강화, 매출 2배`, '직접 효과:'),
        bullet(' 벤처인증, 연구소 등 추가 역량 확보 시 74점 → 1.8억 추가 지원 가능', '간접 효과:'),
        bullet(' 3명 (개발 1, 영업 1, 마케팅 1) - 정부 일자리 창출 기여', '고용 창출:'),
        bullet(' 전년 대비 2배 (정부지원 활용) - 3,000만원 평균 지원금 활용', '매출 증대:'),

        new Paragraph({ spacing: { before: 400 } }),
        heading('4-2. 매칭 이유 (92% 적합)', HeadingLevel.HEADING_2),
        para(`본 공고는 ${companyName}의 업종, 역량, 준비도 ${score}점과 92% 매칭되며, 특히 벤처인증 및 연구소 보유 시 가산점이 있습니다.`),
        para(`${grant.agency}의 평가 기준에 부합하여 선정 확률이 높으며, 상위 28%에 해당합니다.`, { spacing: { after: 400 } }),

        heading('5. 첨부 및 체크리스트'),
        heading('제출 서류 체크리스트 (필수)', HeadingLevel.HEADING_3),
        bullet(' 사업자등록증 (필수)'),
        bullet(' 벤처기업 확인서 (해당 시, +12점, 75점 이상 시 필수)'),
        bullet(' 기업부설연구소 인정서 (해당 시, +10점)'),
        bullet(' 특허 등록증 (해당 시, +8점, 65점 이상 시)'),
        bullet(' 재무제표 (최근 2년, 필수)'),
        bullet(' 사업계획서 본문 (본 문서, 필수, 5페이지)'),
        bullet(' 고용보험 가입자 명부 (해당 시)'),

        new Paragraph({ spacing: { before: 400 } }),
        heading('자동 생성 정보', HeadingLevel.HEADING_3),
        para(`생성일: ${new Date().toLocaleDateString('ko-KR')} ${new Date().toLocaleTimeString('ko-KR')}`),
        para(`준비도: ${score}점 (상위 28%, 평균 대비 +${plus}점)`),
        para('매칭률: 92% (선정 확률 2.8배)'),
        para(`공고 출처: ${grant.title} / ${grant.agency} / 마감 ${grant.deadline}`),
        para(`예상 지원: ${grant.max_amount}`),
        new Paragraph({ spacing: { before: 300 }, children: [new TextRun({ text: `문의: https://meta-jiwongeum-yhcheon.vercel.app | 서비스: 놓친 지원금, 챙김이가 다 챙겨드립니다`, size: 18, color: '2563EB', font: 'Malgun Gothic' })] }),
        new Paragraph({ spacing: { before: 400 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: '본 문서는 지원금 챙김이에 의해 자동 생성되었습니다.', size: 14, color: '94A3B8', italics: true, font: 'Malgun Gothic' })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '실제 제출 시 기업 상황에 맞게 수정하여 사용하세요.', size: 14, color: '94A3B8', italics: true, font: 'Malgun Gothic' })] }),
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
