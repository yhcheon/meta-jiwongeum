
import { NextResponse } from 'next/server'
export async function POST(req: Request) {
  try {
    const { paymentKey, orderId, amount } = await req.json()
    const secretKey = process.env.TOSS_SECRET_KEY || 'test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R'
    const isLive = secretKey.startsWith('live_')
    const tossRes = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: { 'Authorization': `Basic ${Buffer.from(secretKey + ':').toString('base64')}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentKey, orderId, amount }),
    })
    const tossData = await tossRes.json()
    if (!tossRes.ok && isLive) {
      return NextResponse.json({ error: tossData.message, code: tossData.code }, { status: 400 })
    }
    return NextResponse.json({ success: true, isLive, message: isLive ? '실결제 성공' : '테스트 결제 성공', data: tossData })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
