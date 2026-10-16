import os
from pathlib import Path
from playwright.sync_api import sync_playwright

URL="http://127.0.0.1:8765/"
Path("test-screenshots").mkdir(exist_ok=True)
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,args=["--enable-webgl","--use-gl=angle","--use-angle=swiftshader","--disable-dev-shm-usage","--no-sandbox"])
    for width,height in [(1440,900),(390,844)]:
        page=browser.new_page(viewport={"width":width,"height":height},reduced_motion="reduce")
        errors=[]
        page.on("pageerror",lambda err: errors.append(str(err)))
        page.goto(URL,wait_until="domcontentloaded")
        page.locator("#subwayToggle").click()
        assert page.locator("#subwayPanel").is_visible(),"Map did not open"
        assert page.locator("[data-station]").count()==5
        assert page.locator("#subwayHoverCard").count()==1
        assert page.locator("#subwayHoverCard").get_attribute("hidden") is not None
        page.screenshot(path=f"test-screenshots/subway-map-{width}.png",full_page=True)
        page.locator('[data-station="contact"]').click()
        page.locator("#arrivalPrompt").wait_for(state="visible",timeout=12000)
        assert "CONTACT" in page.locator("#arrivalName").inner_text()
        page.screenshot(path=f"test-screenshots/city-{width}.png",full_page=True)
        page.locator("#arrivalEnter").click()
        page.wait_for_url("**/district.html?room=contact",timeout=10000)
        assert page.locator("#districtTitle").inner_text()=="THE COFFEE LOUNGE"
        page.screenshot(path=f"test-screenshots/cafe-{width}.png",full_page=True)
        assert not errors, f"Browser JS errors: {errors}"
        page.close()
    for room in ["about","services","ai","contact"]:
        page=browser.new_page(viewport={"width":1280,"height":800})
        errors=[]
        page.on("pageerror",lambda err: errors.append(str(err)))
        page.goto(URL+f"district.html?room={room}",wait_until="domcontentloaded")
        page.locator("#districtTitle").wait_for(state="visible")
        page.wait_for_timeout(1800)
        assert page.locator("canvas").count()>0,room
        page.screenshot(path=f"test-screenshots/{room}.png",full_page=True)
        assert not errors, f"{room}: {errors}"
        page.close()
    # Exercise the actual 2.6-second train animation (not reduced-motion shortcut).
    page=browser.new_page(viewport={"width":1440,"height":900},reduced_motion="no-preference")
    page.goto(URL,wait_until="domcontentloaded")
    page.locator("#subwayToggle").click()
    page.locator('[data-station="work"]').click()
    assert page.locator("#subwayRideStatus").inner_text()=="NEXT STOP · WORK"
    page.locator("#arrivalPrompt").wait_for(state="visible",timeout=12000)
    assert "WORK" in page.locator("#arrivalName").inner_text()
    page.screenshot(path="test-screenshots/work-arrival.png",full_page=True)
    page.locator("#arrivalEnter").click()
    page.wait_for_url("**/work.html",timeout=10000)
    page.close()
    browser.close()
print("PASS: desktop/mobile subway arrival and entry, 4 interiors, JS error checks, screenshots")
