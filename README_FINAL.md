# 지원금 챙김이 - 최종 패키지 (M0-M5 + Stitch 디자인)

## 포함된 것
- design/screens/ 7개 화면 (Stitch)
  - landing.png: 3,000만원 헤드라인
  - onboarding-1.png: 30초만에 시작하기 1/3
  - onboarding-2.png: 어떤 준비가 되어있나요? 62점 토글 2/3
  - onboarding-3.png: 정부지원 준비도 62점! 상위 28% 3/3
  - dashboard.png: 실시간 관제 62/100
  - grant-detail.png: 2025 창업도약패키지 92% 적합 + Word 생성
  - playbook.png: 벤처기업인증 7단계 마일스톤

- src 변경/추가:
  - feedback/page.tsx: 피드백 버튼 기능 구현 (전송 → 감사 메시지)
  - pricing/page.tsx: 요금제 Free/Pro/Premium + Toss
  - lib/analytics.ts: PostHog 9개 이벤트

## M3, M4, M5 전체는 이미 Vercel 배포됨
https://meta-jiwongeum.vercel.app/
- / : 랜딩
- /onboarding : 62점 토글
- /dashboard : D-7 + 시뮬레이션
- /grants/1 : 92% + Word 생성
- /playbook/venture : 7단계
- /pricing : 요금제
- /feedback : 베타 피드백 (방금 수정)

## Git 커밋 명령어
아래 참조
