"""Cross-browser accessibility/navigation smoke; no WebGL rendering assumption."""
from playwright.sync_api import sync_playwright

BASE="http://127.0.0.1:8765/"
PATHS=["","work.html","district.html?room=about","district.html?room=services","district.html?room=ai","district.html?room=contact"]
with sync_playwright() as p:
    for name in ("chromium","firefox","webkit"):
        browser=getattr(p,name).launch(headless=True)
        for width,height in ((390,844),(1366,768)):
            page=browser.new_page(viewport={"width":width,"height":height},reduced_motion="reduce")
            for path in PATHS:
                page.goto(BASE+path,wait_until="domcontentloaded")
                quick=page.locator("#vsrQuickToggle")
                quick.wait_for(state="visible",timeout=15000)
                quick.click()
                assert page.locator("#vsrQuickPanel").is_visible(),(name,path,width)
                assert page.evaluate("document.activeElement.id")=="vsrQuickClose",(name,path,width)
                page.keyboard.press("Escape")
                assert not page.locator("#vsrQuickPanel").is_visible(),(name,path,width)
                assert page.evaluate("document.activeElement.id")=="vsrQuickToggle",(name,path,width)
            page.close()
        browser.close()
print("PASS: Chromium, Firefox, WebKit Quick View keyboard/navigation checks")
