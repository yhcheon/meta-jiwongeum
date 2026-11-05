# M4: 수익화 + 배포 (마지막 단계)

## 1. 요금제 페이지
src/app/(dashboard)/pricing/page.tsx
- Free 0원 / Pro 29,000원 / Premium 99,000원
- Pro는 Toss Payments 버튼
- /pricing 에서 확인

## 2. Toss Payments
src/lib/tossPayments.ts
- PRICING 상수 정의
- requestTossPayment 함수 (실제로는 test_ck_... 넣으면 됨)
- docs.tosspayments.com 참고

## 3. D-7 알림
src/lib/alerts.ts
- deadline 7일 이내 공고 찾아서 알림 리스트 반환
- 나중에 Supabase Edge Function + cron으로 매일 09:00 실행

## 4. API
src/app/api/payment/route.ts
- POST /api/payment → 구독 Pro로 업데이트

## 5. Vercel 배포
1. vercel.com → New Project → Import yhcheon/meta-jiwongeum
2. Env: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
3. Deploy
4. Domain 연결: 지원금챙김이.com (가비아 등)

## 6. 최종 구조
- 랜딩 → 온보딩 → 대시보드 (D-7) → 상세 (92% + Word) → 플레이북 (7단계) → 요금제 (Toss)

M4 끝나면 MVP 완성! Beta 테스트 시작.
