import './globals.css'
export const metadata = {
  title: '지원금 챙김이 - 놓친 지원금, 챙김이가 다 챙겨드립니다',
  description: '정부지원금 발견부터 성장 로드맵까지'
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-[#F8FAFC] text-[#0F172A] antialiased">{children}</body>
    </html>
  )
}
