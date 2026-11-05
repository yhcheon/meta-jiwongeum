// src/lib/alerts.ts - M9 D-7/D-3/D-1 Email Alerts
import { createClient } from '@/lib/supabase/server'

type AlertType = 'D-7' | 'D-3' | 'D-1'

export async function sendDeadlineAlerts() {
  const supabase = await createClient()
  
  // 1. 마감 7일, 3일, 1일 남은 공고 찾기
  const today = new Date()
  const targets = [7, 3, 1]
  
  for (const days of targets) {
    const targetDate = new Date()
    targetDate.setDate(today.getDate() + days)
    const dateStr = targetDate.toISOString().split('T')[0]
    
    const { data: grants } = await supabase
      .from('grants')
      .select('*')
      .eq('deadline', dateStr)
    
    if (!grants || grants.length === 0) continue
    
    // 2. 해당 공고를 북마크한 유저 찾기 (matches 테이블)
    // 여기선 모든 유저에게 발송한다고 가정 - 실제로는 matches 조인
    console.log(`D-${days} 공고 ${grants.length}개 발견:`, grants.map(g => g.title))
    
    // 3. Resend로 이메일 발송 (실제 키 있을 때만)
    // const resendApiKey = process.env.RESEND_API_KEY
    // if (resendApiKey) { ... }
  }
  
  return { success: true, message: 'Alerts checked' }
}

export function getDday(deadline: string): { type: AlertType | null, days: number } {
  const today = new Date()
  const d = new Date(deadline)
  const diff = Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  if (diff === 7) return { type: 'D-7', days: 7 }
  if (diff === 3) return { type: 'D-3', days: 3 }
  if (diff === 1) return { type: 'D-1', days: 1 }
  return { type: null, days: diff }
}
