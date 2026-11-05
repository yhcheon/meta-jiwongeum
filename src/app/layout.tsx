
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: '지원금 챙김이 - 놓친 지원금, 챙김이가 다 챙겨드립니다',
    template: '%s | 지원금 챙김이'
  },
  description: '평균 3,000만원 정부지원금을 놓치고 계세요. 51개 실시간 공고 중 92% 매칭, Word 5페이지 사업계획서 자동 생성, 매일 06:00 자동 업데이트.',
  keywords: ['정부지원금', '중소기업 지원금', '창업 지원금', '혁신바우처', 'TIPS', '사업계획서', '지원금 챙김이'],
  authors: [{ name: '지원금 챙김이' }],
  creator: '지원금 챙김이',
  publisher: '지원금 챙김이',
  metadataBase: new URL('https://meta-jiwongeum-yhcheon.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '지원금 챙김이 - 놓친 지원금, 챙김이가 다 챙겨드립니다',
    description: '51개 실시간 공고 중 92% 매칭, Word 5페이지 사업계획서 자동 생성. 평균 3,000만원 지원금을 놓치지 마세요.',
    url: 'https://meta-jiwongeum-yhcheon.vercel.app',
    siteName: '지원금 챙김이',
    images: [
      {
        url: 'https://meta-jiwongeum-yhcheon.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: '지원금 챙김이 - 51개 실시간 공고, 92% 매칭',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '지원금 챙김이 - 놓친 지원금, 챙김이가 다 챙겨드립니다',
    description: '51개 실시간 공고 중 92% 매칭, Word 5페이지 사업계획서 자동 생성',
    images: ['https://meta-jiwongeum-yhcheon.vercel.app/og-image.png'],
    creator: '@jiwongeum',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
