import asyncio, json, os
from datetime import datetime
from playwright.async_api import async_playwright
BIZINFO_URL = "https://www.bizinfo.go.kr/web/lay1/bbs/S1T122C128/AS/74/list.do"
async def crawl():
    results = []
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto(BIZINFO_URL, wait_until="domcontentloaded", timeout=60000)
        await page.wait_for_timeout(3000)
        try:
            rows = await page.query_selector_all("tbody tr")
            for row in rows[:100]:
                tds = await row.query_selector_all("td")
                if len(tds) < 3: continue
                title = await tds[1].inner_text()
                agency = await tds[2].inner_text() if len(tds) > 2 else ""
                results.append({"title": title.strip(), "agency": agency.strip(), "source_url": BIZINFO_URL, "crawled_at": datetime.now().isoformat()})
        except Exception as e:
            print(f"Error: {e}")
        await browser.close()
    print(f"Collected {len(results)}")
    os.makedirs("data", exist_ok=True)
    with open(f"data/bizinfo_{datetime.now().strftime('%Y%m%d')}.json","w",encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    return results
if __name__ == "__main__":
    asyncio.run(crawl())
