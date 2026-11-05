import { NextRequest, NextResponse } from 'next/server'
import { confirmPayment } from '@/lib/tossPayments'

export async function POST(req: NextRequest) {
  try {
    const { paymentKey, orderId, amount } = await req.json()
    
    const result = await confirmPayment(paymentKey, orderId, amount)
    
    if (result.status === 'DONE' || result.paymentKey) {
      // 결제 성공 - Supabase에 저장 (subscriptions 테이블 있으면)
      // await supabase.from('subscriptions').insert({ user_id, plan, paymentKey, orderId, amount })
      return NextResponse.json({ success: true, data: result })
    } else {
      return NextResponse.json({ success: false, error: result }, { status: 400 })
    }
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}
