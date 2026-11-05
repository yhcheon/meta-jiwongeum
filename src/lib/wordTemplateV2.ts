// M5: Word 5페이지 고도화 버전 (기존 docGenerator.ts 개선)
import { Document, Paragraph, HeadingLevel, TextRun } from "docx"

export const WORD_V2_SECTIONS = [
  "1. 사업 개요 (회사명, 사업분야, 연혁)",
  "2. 문제 정의 및 시장 분석 (TAM/SAM/SOM)",
  "3. 기술성 (벤처인증 + 연구소 + IP)",
  "4. 사업성 및 성장 전략 (매출 3.5억 → 10억 로드맵)",
  "5. 기대 효과 및 자금 활용 계획 (2.5억 활용)",
  "부록: 정부지원 준비도 62점 상세 분석 및 74점 시뮬레이션"
]
