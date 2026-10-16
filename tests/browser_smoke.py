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
        assert page.locator("#districtTitle").inner_text()=="COFFEE & CONNECTIONS"
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
    # ABOUT gallery exhibits should be accessible on both desktop and mobile.
    for width,height in [(1440,900),(390,844)]:
        page=browser.new_page(viewport={"width":width,"height":height})
        page.goto(URL+"district.html?room=about",wait_until="domcontentloaded")
        page.locator("#aboutQuickActions button").first.wait_for()
        assert page.locator("#districtTitle").inner_text()=="THE STORY STATION"
        assert page.locator("#aboutQuickActions button").count()==4
        page.locator("#districtJourney").click()
        assert page.locator("#districtJourney").get_attribute("aria-pressed")=="true"
        page.locator("#districtJourney").click()
        assert page.locator("#districtJourney").get_attribute("aria-pressed")=="false"
        page.locator('[data-about="journey"]').click()
        assert "TD Bank" in page.locator("#districtDetailBody").inner_text()
        page.locator("#districtClose").click()
        page.locator('[data-about="personal"]').click()
        assert "scuba diving" in page.locator("#districtDetailBody").inner_text()
        page.close()
    # AI collectibles open their respective credential and project panels.
    for width,height in [(1440,900),(390,844)]:
        page=browser.new_page(viewport={"width":width,"height":height})
        page.goto(URL+"district.html?room=ai",wait_until="domcontentloaded")
        page.locator("#aiQuickActions button").first.wait_for()
        assert page.locator("#aiQuickActions button").count()==4
        page.locator("#aiQuestTour").click()
        assert page.locator("#aiQuestExit").is_visible()
        page.locator("#aiQuestExit").click()
        assert page.locator("#aiQuestSound").get_attribute("aria-pressed")=="false"
        page.locator("#aiQuestSound").click()
        assert page.locator("#aiQuestSound").get_attribute("aria-pressed")=="true"
        page.locator("#aiQuestSound").click()
        assert page.locator("#aiQuestSound").get_attribute("aria-pressed")=="false"
        page.locator("#aiQuestPlay").click()
        assert page.locator(".ai-quest-move").is_visible()
        page.locator('[data-move="1"]').click()
        page.locator("#aiQuestExit").click()
        assert page.locator("#aiQuestTour").is_visible()

        page.locator('[data-collectible="openai"]').click()
        assert "OpenAI Technical Practitioner" in page.locator("#districtDetailBody").inner_text()
        assert "MILESTONE UNLOCKED" in page.locator("#aiQuestCelebration").inner_text()
        assert "1 / 4 DISCOVERED" in page.locator("#aiQuestProgress").inner_text()
        assert page.locator("#aiQuestPassport .earned").count()==1
        assert page.locator("#aiQuestVault").is_hidden()

        page.locator("#districtClose").click()
        page.locator('[data-collectible="hackathon"]').click()
        assert "Cognizant" in page.locator("#districtDetailTitle").inner_text()
        page.locator("#districtClose").click()
        page.locator('[data-collectible="claude"]').click()
        page.locator("#districtClose").click()
        page.locator('[data-collectible="innovation"]').click()
        page.locator("#districtClose").click()
        assert page.locator("#aiQuestPassport .earned").count()==4
        assert page.locator("#aiQuestVault").is_visible()
        page.locator('[data-demo="api"]').click()
        assert "SYNTHETIC API MIGRATION COMPARISON" in page.locator("#aiDemoOutput").inner_text()
        page.locator('[data-demo="xpath"]').click()
        assert "SUGGESTED SELECTORS" in page.locator("#aiDemoOutput").inner_text()
        page.locator("#aiVaultClose").click()
        assert page.locator("#aiQuestVault").is_hidden()

        page.close()
    # Contact café links and coffee menu must be functional on desktop and mobile.
    for width,height in [(1440,900),(390,844)]:
        page=browser.new_page(viewport={"width":width,"height":height})
        page.goto(URL+"district.html?room=contact",wait_until="domcontentloaded")
        page.locator("#districtTitle").wait_for(state="visible")
        assert page.locator("#districtTitle").inner_text()=="COFFEE & CONNECTIONS"
        page.locator('#contactQuickActions [data-contact="phone"]').click()
        assert "774-486-****" in page.locator("#districtDetailBody").inner_text()
        assert page.locator('#districtDetailBody a[href^="tel:"]').count()==0
        page.locator("#districtClose").click()
        assert page.locator('#contactQuickActions [data-contact="email"]').get_attribute("href").startswith("mailto:vijay.sekhar18@gmail.com")
        assert page.locator('#contactQuickActions [data-contact="linkedin"]').get_attribute("href")=="https://www.linkedin.com/in/vijaygopireddy/"
        assert page.locator('#contactQuickActions [data-contact="copy"]').count()==1
        assert page.locator('#contactQuickActions [data-contact="email"]').evaluate("(el) => el.getBoundingClientRect().height >= 44")
        page.locator('#contactQuickActions [data-contact="location"]').click()
        assert "New York, NY" in page.locator("#districtDetailBody").inner_text()
        page.locator("#districtClose").click()
        page.locator('#contactQuickActions [data-contact="menu"]').click()
        assert page.locator(".coffee-menu a").count()==3
        assert page.locator('.coffee-menu a[href^="mailto:vijay.sekhar18@gmail.com"]').count()==2
        page.screenshot(path=f"test-screenshots/cafe-interactions-{width}.png",full_page=True)
        page.close()
    # Verify the decorative train moves while the map is open, and stops after closing.
    page=browser.new_page(viewport={"width":1440,"height":900},reduced_motion="no-preference")
    page.goto(URL,wait_until="domcontentloaded")
    page.locator("#subwayToggle").click()
    train=page.locator("#subwayTrain")
    start=train.get_attribute("transform")
    page.wait_for_timeout(1300)
    moved=train.get_attribute("transform")
    assert moved!=start, f"Decorative train did not move: {start}"
    page.locator("#subwayClose").click()
    page.wait_for_timeout(200)
    stopped=train.get_attribute("transform")
    page.wait_for_timeout(450)
    assert train.get_attribute("transform")==stopped, "Train continues animating when map is closed"
    page.close()
    # WORK Atelier: five company exhibits and verified TD current spotlight.
    for width,height in [(1440,900),(390,844)]:
        page=browser.new_page(viewport={"width":width,"height":height})
        errors=[]
        page.on("pageerror",lambda err: errors.append(str(err)))
        page.goto(URL+"work.html",wait_until="domcontentloaded")
        page.locator(".company-drawer summary").click()
        page.locator("#companyExhibits button").first.wait_for()
        assert page.locator("#companyExhibits button").count()==5
        assert page.locator("#companyExhibits button").first.get_attribute("data-company")=="dbs"
        assert page.locator("#companyExhibits button").nth(1).get_attribute("data-company")=="wells"
        page.locator('[data-company="td"]').click()
        assert "TD BANK" in page.locator("#projectContent").inner_text()
        assert "CURRENT CHAPTER" in page.locator("#projectContent").inner_text()
        page.screenshot(path=f"test-screenshots/work-atelier-td-{width}.png",full_page=True)
        page.locator("#closeProject").click()
        page.locator('[data-company="lpl"]').click()
        assert "Account View" in page.locator("#projectContent").inner_text()
        page.locator("#closeProject").click()
        page.locator('[data-company="wells"]').click()
        assert "WELLS FARGO" in page.locator("#projectContent").inner_text()
        assert not errors, f"WORK studio errors: {errors}"
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

    # Engineering Studio: four accessible exhibits and optional guided camera tour.
    for width,height in [(1440,900),(390,844)]:
        page=browser.new_page(viewport={"width":width,"height":height},reduced_motion="reduce")
        errors=[]
        page.on("pageerror",lambda err: errors.append(str(err)))
        page.goto(URL+"district.html?room=services",wait_until="domcontentloaded")
        assert page.locator("#districtTitle").inner_text()=="VSR INNOVATION CENTER"
        assert page.locator("#servicesHud [data-service]").count()==4
        assert page.locator("#servicesTour").is_visible()
        page.locator("#servicesTour").click()
        assert page.locator("#servicesTour").get_attribute("aria-pressed")=="true"
        page.locator("#servicesTour").click()
        assert page.locator("#servicesTour").get_attribute("aria-pressed")=="false"
        for key in ["automation","quality","cloud","aiEngineering"]:
            page.locator(f'#servicesHud [data-service="{key}"]').click()
            assert page.locator("#districtDialog").is_visible()
            assert len(page.locator("#districtDetailBody").inner_text())>100
            page.locator("#districtClose").click()
        page.screenshot(path=f"test-screenshots/services-studio-{width}.png",full_page=True)
        assert not errors,f"SERVICES JS errors: {errors}"
        page.close()
