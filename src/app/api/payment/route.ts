import { NextResponse } from 'next/server'
export async function POST(req: Request) {
  const { customerKey, orderId } = await req.json()
  // TODO: Toss Payments 승인 API 호출
  // TODO: supabase companies.subscription = 'pro' 업데이트
  return NextResponse.json({ success: true, message: 'Pro 구독 완료! 지원금 챙김이가 더 많은 공고를 찾아드립니다.' })
}
