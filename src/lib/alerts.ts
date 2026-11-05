// D-7 알림 로직
import { createClient } from '@supabase/supabase-js'

export async function checkDeadlineAlerts() {
  // supabase에서 deadline이 7일 이내인 매칭 찾아서 알림
  // SELECT * FROM matches JOIN grants WHERE grants.deadline <= now()+7days
  // 실제로는 Supabase Edge Function + Resend/SMS로 발송
  return [
    { grantTitle: '2025 창업도약패키지', dDay: 12, matchScore: 92 },
    { grantTitle: '벤처 R&D 지원', dDay: 5, matchScore: 88 }
  ]
}
