# 지원금 챙김이 - 최종 패키지 M0~M6 (Desktop 7 + Mobile 7)

## 프로젝트 개요
- 서비스명: 지원금 챙김이 (놓친 지원금, 챙김이가 다 챙겨드립니다)
- URL: https://meta-jiwongeum.vercel.app/
- GitHub: https://github.com/yhcheon/meta-jiwongeum

## 디자인 시스템
- Primary #2563EB, Secondary #0F172A, Border #E2E8F0, Muted #64748B
- Toss + Linear, clinical white, 1px razor borders, no gradients
- Desktop 7개 + Mobile 7개 = 14개 화면

## 폴더 구조
- design/screens/desktop/: 랜딩, 온보딩 1/2/3, 대시보드, 공고상세 92%, 플레이북 7단계
- design/screens/mobile/: 동일 7개 375px 모바일 (하단 4탭 네비 포함)
- src/app/(dashboard)/: dashboard, feedback, grants/[id], playbook/[slug], pricing
- src/components/: MobileNav.tsx, ResponsiveDashboard.tsx
- src/lib/: analytics.ts, docGenerator.ts, readiness.ts, matcher.ts
- supabase/: 001_initial.sql + RLS
- scripts/crawler/: bizinfo_crawler.py + parser + matcher
- docs/: PRD, Tech Spec, Roadmap

## 개발 로드맵 완료
- M0 (11/5-11/9): 기획/디자인 - 7개 화면 정의
- M1 (11/10-11/16): 크롤러 코어 - bizinfo.go.kr 크롤링 + Supabase 5 tables
- M2 (11/17-11/23): 진단 엔진 - 62점 토글 (base 38 + venture 12 + lab 10 + ip 8 + innobiz 7...)
- M3 (11/24-11/30): 프론트 + Word - 92% 적합 + docx 생성
- M4 (12/1-12/7): 수익화 + 배포 - Toss Payments Free/Pro 29k/Premium 99k + Vercel
- M5 (12/8-12/14): Beta - feedback 페이지 + analytics + SEO
- M6 (12/15-): Mobile Responsive - 375px, 44px 터치, 하단 4탭, 1컬럼 그리드

## 현재 상태
- Vercel 배포: https://meta-jiwongeum.vercel.app/ - 전체 플로우 동작
- 모바일 400px: D-7 + 68/100 + Top Gaps 3개 + 시뮬레이션 68→80 +12 / 4→18 +7건 / +1.8억원 정상 표시 (세로 스택)
- Word 생성: grants/1에서 .docx 1페이지 생성 확인
- 피드백: feedback에서 전송 → 감사 메시지 확인

## Git 커밋 명령어
```
git add .
git commit -m "feat: M6 최종 - Desktop 7 + Mobile 7 + 반응형 1컬럼 수정"
git push origin main
# Vercel 자동 재배포 → Ready 확인
```

## 다음 단계 (운영)
- Beta 3개 회사 테스트
- Word 1페이지 → 5페이지 고도화 (wordTemplateV2.ts)
- Resend로 D-7 이메일 알림 연동
- Product Hunt / 로켓펀치 런칭
