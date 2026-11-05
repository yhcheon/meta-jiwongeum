# M6: Mobile Responsive - 375px (Stitch 반영)

## 완료
- components/MobileNav.tsx: 하단 4탭 네비게이션 (44px 터치 영역, md:hidden)
- components/ResponsiveDashboard.tsx: 모바일 1컬럼 / 데스크탑 3컬럼 그리드
- app/(dashboard)/layout.tsx: 전체 대시보드에 모바일 네비 적용

## 적용 방법
- 기존 dashboard/page.tsx에서 <ResponsiveDashboard /> 사용하거나
- layout.tsx가 자동으로 모든 (dashboard) 경로에 모바일 네비 추가

## Stitch 모바일 7개 반영 완료
- mobile_landing_check.png: 랜딩 모바일
- mobile_onboarding_1/2/3_check.png: 온보딩 모바일 3단계
- mobile_dashboard_check.png: 대시보드 모바일 375px + 4탭
- mobile_grant_detail_check.png: 공고 상세 모바일 92%
- mobile_playbook_check.png: 플레이북 모바일 7단계

## 다음
- Tailwind breakpoints: sm 375px, md 768px, lg 1024px
- 터치 영역 44px+ 준수
- Toss + Linear 스타일 유지 (#2563EB, 1px razor border)

## 테스트
npm run dev
- 데스크탑: 3컬럼 레이아웃
- 모바일 (Chrome DevTools 375px): 1컬럼 + 하단 4탭 네비
