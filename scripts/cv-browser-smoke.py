"""Browser smoke test. Run with a local production server on port 3010."""
from playwright.sync_api import sync_playwright
import json, zipfile, io
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
with sync_playwright() as p:
 browser=p.chromium.launch(channel="msedge",headless=True)
 page=browser.new_page(viewport={"width":1440,"height":1000})
 errors=[]
 page.on("pageerror",lambda e:errors.append(str(e)))
 page.goto("http://127.0.0.1:3010/cv/customize",wait_until="networkidle")
 page.get_by_role("button",name="AI for Science",exact=True).click()
 page.get_by_label("Version name",exact=True).fill("QA Science")
 page.get_by_role("button",name="Save this version",exact=True).click()
 page.get_by_role("button",name="Clear selection",exact=True).click()
 assert page.get_by_role("button",name="Compile & preview PDF",exact=True).is_disabled()
 page.get_by_role("button",name="QA Science",exact=True).click()
 config=json.loads(page.evaluate("localStorage.getItem('runnel-cv-customizer-v1')"))["current"]
 assert 0<len(config["entries"])<23
 page.reload(wait_until="networkidle")
 assert json.loads(page.evaluate("localStorage.getItem('runnel-cv-customizer-v1')"))["current"]==config
 page.get_by_role("combobox").nth(0).select_option("a4")
 page.get_by_role("combobox").nth(1).select_option("compact")
 with page.expect_download() as dl:
  page.get_by_role("button",name="Download TeX source package",exact=True).click()
 z=zipfile.ZipFile(dl.value.path())
 assert z.testzip() is None
 assert {"main.tex","resume.cls","selection.json","assets/nju_vector.pdf","assets/thunlp_full_vector.pdf"}<=set(z.namelist())
 tex=z.read("main.tex").decode()
 assert "a4paper,top=.55in" in tex and "Microsoft Research Asia" not in tex
 assert "THUNLP" in tex
 source_config=json.loads(z.read("selection.json"))
 # Bullet selection, entry/section order and validation.
 page.get_by_role("button",name="Full CV",exact=True).click()
 page.get_by_role("button",name="Move section Education down",exact=True).click()
 assert page.locator("h2").nth(1).inner_text()=="Honors & Awards"
 first_bullet=page.locator('input[type="checkbox"]').nth(7)
 before=json.loads(page.evaluate("localStorage.getItem('runnel-cv-customizer-v1')"))["current"]
 # Restore a selected version before compiling.
 page.get_by_role("button",name="QA Science",exact=True).click()
 page.get_by_role("button",name="Compile & preview PDF",exact=True).click()
 page.get_by_role("heading",name="Compiled PDF",exact=True).wait_for(timeout=65000)
 with page.expect_download() as dl:
  page.get_by_role("link",name="Download PDF",exact=True).click()
 pdf=Path(dl.value.path()).read_bytes()
 assert pdf.startswith(b"%PDF-")
 (ROOT.parent/"resume-kit"/"cv-custom-science.pdf").write_bytes(pdf)
 page.set_viewport_size({"width":390,"height":844})
 page.goto("http://127.0.0.1:3010/cv/customize",wait_until="networkidle")
 assert page.evaluate("document.documentElement.scrollWidth<=window.innerWidth")
 page.screenshot(path=str(ROOT.parent/"resume-kit"/"cv-customizer-mobile.png"),full_page=False)
 assert not errors,errors
 invalid=page.request.post("http://127.0.0.1:3010/api/cv/export",data={"version":1,"paper":"a4","density":"normal","sections":[],"entries":[]})
 assert invalid.status==400
 print(json.dumps({"passed":True,"selected_entries":len(config["entries"]),"zip_files":z.namelist(),"pdf_bytes":len(pdf),"browser_errors":errors}))
 browser.close()
