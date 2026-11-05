# M17 최종 런칭 체크리스트 - 지원금 챙김이

## 현재 상태 (2026-11-05)
- [x] 51개 실시간 공고 (bizinfo.go.kr 크롤러)
- [x] 0.8초 로딩 (select 6컬럼 + 20개 pagination + skeleton)
- [x] 모바일 반응형 (375px, 44px 터치, bottom 4-tab)
- [x] 로그인/로그아웃/비밀번호 재설정
- [x] TEST 결제 배지 + Toss Live 분기 (pricing)
- [x] 이메일 D-7/D-3/D-1 TEST 성공 (2개 발견)
- [x] SEO + OG 1200x630 + sitemap/robots/manifest

## M17 추가
- [x] vercel.json 크론 2개
  - 크롤러: 0 21 * * * = KST 06:00 매일 51개 업데이트
  - 알림: 0 0 * * * = KST 09:00 매일 이메일
- [x] AlertBadge.tsx 대시보드용 컴포넌트
- [x] Resend fetch 버전 (라이브러리 없이)

## 남은 LIVE 전환 (선택)
1. Toss Live:
   - https://tosspayments.com 가입
   - live_ck_, live_sk_ 발급
   - .env.local + Vercel Env에 설정

2. Resend Live:
   - https://resend.com 가입
   - re_... 발급
   - .env.local + Vercel Env에 설정
   - 도메인 인증 (jiwongeum.com)

3. Vercel Cron 확인:
   - Dashboard > Cron Jobs에 2개 떠 있는지
   - 로그: /api/crawler/run, /api/alerts/send

## 최종 배포 명령
```
git add vercel.json src/components/AlertBadge.tsx
git commit -m "feat: M17 크론 2개 + 대시보드 알림 배지 - 최종 런칭"
git push origin main
```

배포 후:
- https://meta-jiwongeum-yhcheon.vercel.app/api/alerts/send?email=yhcheon@gmail.com → TEST JSON 확인
- 대시보드에 AlertBadge 추가 시 마감 임박 2개 카드 노출
