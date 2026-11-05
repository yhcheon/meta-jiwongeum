# 지원금 챙김이 - DESIGN.md v2.2 Final
2026-11-05 - M0-M11 배포

## 브랜드
- 서비스명: 지원금 챙김이
- 태그라인: 놓친 지원금, 챙김이가 다 챙겨드립니다
- 도메인: meta-jiwongeum-yhcheon.vercel.app (Vercel)
- GitHub: yhcheon/meta-jiwongeum (Public)

## 인프라 - 0원 운영
```
[GitHub Actions 매일 06:00] → [Supabase DB 20개] → [Vercel 웹서버] → 유저
```
- Supabase: 500MB 무료, qclborpgdhwszdvyzthu.supabase.co
- Vercel: 100GB/월 무료, meta-jiwongeum-yhcheon.vercel.app
- GitHub Actions: 2000분/월 무료, cron 0 21 * * * = 06:00 KST
- 총 0원/월, 1000명까지 무료

## 기술 스택
- Frontend: Next.js 14, Tailwind, TypeScript
- Backend: Next.js API Routes, Supabase, Toss Payments
- Crawler: Python requests + BeautifulSoup + Playwright (준비)
- Word: docx 5페이지

## 화면 14개 + 5개 추가 = 19개
- Landing: / - CTA 플로우 연결
- Login: /login, /forgot-password, /reset-password, /auth/callback
- Onboarding: /onboarding (3단계, 38→75점)
- Dashboard: /dashboard (20개 실시간, D-day, 92%)
- Grant Detail: /grants/[id] (92% 매칭, Word 5페이지)
- Pricing: /pricing (Free 0원, Pro 29k, Premium 99k, Toss 테스트)
- Feedback: /feedback

## 로드맵
- M0-M6: 기획, 크롤러 mock 10개, 점수, 대시보드, Word 1페이지, 모바일
- M7: 로그인, 로그아웃, 비번 찾기, 플로우 연결 (2026-11-05)
- M8: 진짜 크롤러 20개, 매일 06:00 (2026-11-05)
- M9: 결제 Pro 29k 테스트 + 알림 D-7/D-3/D-1 + vercel.json cron (2026-11-05)
- M10: Word 5페이지 고도화 + 상세 92% + 404 수정 (2026-11-05)
- M11: 최종 배포 Vercel + 최종 패키지 (2026-11-05 진행 중)
- M12: 실결제 + Resend 이메일 + Playwright 실제 50개 + 런칭 (예정)

## 최종
- 90% 완성, 배포 중
- Word 5페이지 확인됨
- 20개 공고 확인됨
- git push 완료
- Vercel 배포 대기
