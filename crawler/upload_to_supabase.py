
# crawler/upload_to_supabase.py - M12 fix schema: description -> raw_content
import os, json, sys

try:
    from supabase import create_client
except:
    print("supabase 패키지 없음 - pip install supabase")
    sys.exit(1)

url = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SERVICE_ROLE_KEY") or os.getenv("SUPABASE_SECRET_KEY")

if not url or not key:
    print("Supabase 키 없음")
    sys.exit(1)

supabase = create_client(url, key)

json_path = "data/grants_50.json"
if not os.path.exists(json_path):
    json_path = "crawler/data/grants_50.json"

with open(json_path, "r", encoding="utf-8") as f:
    grants = json.load(f)

print(f"Supabase에 {len(grants)}개 업로드 시작...")

# 기존 데이터 삭제 - Supabase 실제 스키마: id(uuid), title, agency, deadline, max_amount, source_url, raw_content, structured, matching_keywords, created_at
try:
    del_res = supabase.table("grants").delete().neq("title", "__nonexistent_delete_all__").execute()
    print(f"기존 데이터 삭제 완료: {len(del_res.data) if hasattr(del_res, 'data') else 'ok'}개")
except Exception as e:
    print(f"삭제 에러 (무시): {e}")

success = 0
for i in range(0, len(grants), 20):
    batch = grants[i:i+20]
    payload = []
    for g in batch:
        # 실제 스키마에 맞게 변환 - description 없음, raw_content 사용
        payload.append({
            "title": g["title"][:200],
            "agency": g.get("agency", "")[:100],
            "deadline": g["deadline"],
            "max_amount": g.get("max_amount", "최대 5,000만원"),
            "source_url": g.get("source_url", "https://www.bizinfo.go.kr"),
            "raw_content": g.get("description", g.get("title", ""))[:1000],
            "structured": {"amount_min": 50000000, "category": "창업", "real_50": True, "original": g.get("agency")},
            "matching_keywords": g.get("matching_keywords", ["창업"]),
        })
    try:
        res = supabase.table("grants").insert(payload).execute()
        print(f"배치 {i//20+1}: {len(payload)}개 업로드 성공")
        success += len(payload)
    except Exception as e:
        print(f"배치 {i//20+1} 실패: {e}")
        for item in payload:
            try:
                supabase.table("grants").insert(item).execute()
                success += 1
            except Exception as e2:
                print(f"개별 실패 {item['title'][:20]}: {e2}")

print(f"\n총 {success}/{len(grants)}개 업로드 완료!")
print("Supabase 확인: SELECT COUNT(*) FROM grants; 실행해보세요")
