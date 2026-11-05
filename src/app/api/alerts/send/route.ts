
import { NextResponse } from 'next/server'
import { getExpiringGrants, generateEmailHtml, getAlertType } from '@/lib/alerts'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const testEmail = searchParams.get('email') || 'test@example.com'
    const expiring = await getExpiringGrants()

    if (expiring.length === 0) {
      return NextResponse.json({ message: '마감 임박 공고 없음 (D-7/D-3/D-1 없음)', count: 0, grants: [], mode: 'TEST - 공고 없음' })
    }

    const resendKey = process.env.RESEND_API_KEY

    if (!resendKey) {
      return NextResponse.json({
        mode: 'TEST (RESEND_API_KEY 없음 - 설치 불필요)',
        count: expiring.length,
        grants: expiring.map((g: any) => ({ title: g.title, dday: g.dday, type: getAlertType(g.dday), deadline: g.deadline })),
        message: 'Resend 키 설정 전 TEST 모드 - 실제 발송 안 됨, JSON만 반환',
      })
    }

    // LIVE: fetch로 직접 Resend API 호출 (라이브러리 없이)
    const html = generateEmailHtml(expiring, testEmail)
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: '지원금 챙김이 <onboarding@resend.dev>',
        to: [testEmail],
        subject: `[D-${expiring[0].dday}] 마감 임박! ${expiring.length}개 공고가 곧 마감됩니다`,
        html,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: data.message || 'Resend 발송 실패', details: data }, { status: 400 })
    }

    return NextResponse.json({ success: true, mode: 'LIVE (Resend fetch 발송)', count: expiring.length, grants: expiring, emailId: data.id })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
