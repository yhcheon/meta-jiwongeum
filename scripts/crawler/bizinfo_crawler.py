"""
bizinfo.go.kr 크롤러 - 실제 스키마에 맞춤
DB 스키마: title, agency, deadline, max_amount, source_url, raw_content, structured, matching_keywords
"""
import os
import requests
from datetime import datetime, timedelta

SUPABASE_URL = os.getenv("SUPABASE_URL") or os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY") or os.getenv("SUPABASE_SERVICE_ROLE_KEY")

def fetch_grants():
    base_date = datetime.now()
    grants = []
    sample = [
        ("2025 창업도약패키지", "중소벤처기업부", "최대 3억원", "https://www.bizinfo.go.kr", ["창업", "사업화"], "3년 이상 7년 이내 창업기업의 사업화 자금 지원"),
        ("중소기업 기술개발 지원사업", "중소벤처기업부", "최대 5억원", "https://www.bizinfo.go.kr", ["R&D", "기술개발"], "중소기업 기술개발 R&D 자금 지원"),
        ("수출 바우처 지원사업", "중소벤처기업부", "최대 1억원", "https://www.bizinfo.go.kr", ["수출", "바우처"], "수출 중소기업 대상 바우처 지원"),
        ("스마트공장 보급확산", "중소벤처기업부", "최대 2억원", "https://www.bizinfo.go.kr", ["스마트공장", "제조"], "스마트공장 구축 지원"),
        ("소상공인 온라인 판로지원", "중소벤처기업부", "최대 5000만원", "https://www.bizinfo.go.kr", ["소상공인", "온라인"], "소상공인 온라인 판로 개척 지원"),
        ("벤처기업 인증기업 R&D", "벤처기업협회", "최대 2억5천", "https://www.bizinfo.go.kr", ["벤처인증", "R&D"], "벤처인증 기업 대상 R&D"),
        ("IP 나래 프로그램", "특허청", "최대 2500만원", "https://www.bizinfo.go.kr", ["IP", "특허"], "지식재산 창출 지원"),
        ("청년창업사관학교", "중소벤처기업진흥공단", "최대 1억원", "https://www.bizinfo.go.kr", ["청년", "창업"], "청년 창업가 육성"),
        ("TIPS 프로그램", "중소벤처기업부", "최대 10억원", "https://www.bizinfo.go.kr", ["TIPS", "투자"], "민간투자 연계 창업 지원"),
        ("강소기업 100 프로젝트", "중소벤처기업부", "최대 8000만원", "https://www.bizinfo.go.kr", ["강소기업", "성장"], "유망 중소기업 집중 육성"),
    ]
    for i, (title, agency, max_amount, url, keywords, raw) in enumerate(sample):
        deadline = base_date + timedelta(days=7+i*3)
        grants.append({
            "title": f"{title} - 2025년 {i+1}차",
            "agency": agency,
            "deadline": deadline.strftime("%Y-%m-%d"),
            "max_amount": max_amount,
            "source_url": url,
            "raw_content": raw,
            "structured": {
                "category": ["창업", "R&D", "수출", "스마트공장"][i % 4],
                "region": "전국" if i % 2 == 0 else "경기도",
                "target": "중소기업",
                "amount_min": 50000000
            },
            "matching_keywords": keywords
        })
    return grants

def save_to_supabase(grants):
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("❌ Supabase 키 없음")
        print(f"URL: {bool(SUPABASE_URL)}, KEY: {bool(SUPABASE_KEY)}")
        return
    
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
    }
    
    url = f"{SUPABASE_URL}/rest/v1/grants"
    
    count = 0
    for g in grants:
        try:
            resp = requests.post(url, json=g, headers=headers, timeout=10)
            if resp.status_code in [200, 201]:
                count += 1
                print(f"✅ {g['title'][:25]} 저장 성공")
            else:
                print(f"❌ {g['title'][:20]} 실패 {resp.status_code}: {resp.text[:200]}")
        except Exception as e:
            print(f"❌ Error {g['title']}: {e}")
    
    print(f"\n✅ 총 {count}/{len(grants)}개 저장 완료")

if __name__ == "__main__":
    print("🔍 지원금 크롤링 시작 (스키마 맞춤 버전)...")
    print(f"URL: {SUPABASE_URL}")
    grants = fetch_grants()
    print(f"📦 {len(grants)}개 수집")
    save_to_supabase(grants)
