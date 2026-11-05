추가 필요: @supabase/ssr

npm install @supabase/ssr 필요

그리고 Supabase Dashboard에서:
1. Authentication -> Providers -> Google 활성화 (선택)
2. Authentication -> URL Configuration -> Site URL: https://meta-jiwongeum.vercel.app
3. Authentication -> URL Configuration -> Redirect URLs에 추가:
   - https://meta-jiwongeum.vercel.app/auth/callback
   - http://localhost:3000/auth/callback
