import { NextRequest, NextResponse } from 'next/server'
import { sendDeadlineAlerts } from '@/lib/alerts'

export async function GET(req: NextRequest) {
  // Vercel Cron 또는 수동 호출: /api/alerts/send?secret=xxx
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.CRON_SECRET && process.env.NODE_ENV === 'production') {
    // 프로덕션에선 secret 체크 - 개발에선 스킵
    // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await sendDeadlineAlerts()
    return NextResponse.json(result)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  return GET(req)
}
