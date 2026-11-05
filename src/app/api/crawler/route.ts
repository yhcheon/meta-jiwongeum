
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'crawler', 'data', 'grants_50.json')
    let grants = []

    if (fs.existsSync(filePath)) {
      grants = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    } else {
      // fallback
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
      const { data } = await supabase.from('grants').select('*').limit(50)
      grants = data || []
    }

    return NextResponse.json({ count: grants.length, grants, updated: new Date().toISOString() })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
