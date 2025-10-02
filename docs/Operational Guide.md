# **Operational Guide — v3.2** 

**How to use this guide**

* Go one step at a time. Do **not** skip.  
* Each phase uses **Plan → Practice → Do**.  
  * **Plan** \= write a short list.  
  * **Practice** \= dry run with ChatGPT.  
  * **Do** \= make it real (PR, build, merge).  
* If you see **STOP**, fix things before moving on.  
* This matches the Blueprint from **P0 to P7**.  
* Helpful tools: **ChatGPT**, **Cursor**, **GitHub**, **Xcode/Simulator**, **Strapi Admin**.

---

## **P0 — Setup & Contracts**

**Goal:** Make the base folders and rules.

**Plan**

* Make two folders: `orchestrator` and `docs`.  
* Decide who is the **owner** and **approver**.  
* We need 4 small files: `JTBD.yml`, `actions.yml`, `orchestration.yml`, `gates.yml`.

**Use tools**

* **ChatGPT:** “Make short stubs for those 4 files for an iOS app named CollabTask.”  
* **Cursor/Terminal:**  
  * `mkdir orchestrator docs`  
  * `touch orchestrator/JTBD.yml orchestrator/actions.yml orchestrator/orchestration.yml orchestrator/gates.yml orchestrator/context_ledger.json docs/_README.md`  
  * Paste the stubs from ChatGPT.

**Practice**

* **ChatGPT:** “Check this `JTBD.yml` for missing parts.” Paste file.

**Do**

* **Tools:** Terminal (git), GitHub (web)

* Open a PR **“P0 – Setup & Contracts.”** Do it this way:  
  1. Make a branch: `git checkout -b p0-setup`  
  2. Add files: `git add orchestrator/* docs/*`  
  3. Commit: `git commit -m "P0: setup & contracts"`  
  4. Push: `git push -u origin p0-setup`  
  5. On GitHub: click **Compare & pull request**, set the title to **P0 – Setup & Contracts**, add a short note, add the **owner** and **approver** as reviewers, then press **Create pull request**.  
* Add the files. Put the **owner** and **approver** into `JTBD.yml`.  
* Ask for review. Fix small notes. **Merge to main.**  
* Tag the repo: `p0-baseline`.

**STOP:** Files are in **main**, owner and approver are written.

---

## **P1 — Discovery**

**Goal:** Agree on what we will and will not do.

**Plan**

* Write 5 bullets: **problem**, **who it’s for**, **must‑haves**, **out‑of‑scope**, **budget/time**.  
* Add 3–5 **constraints** (devices, OS, services).  
* List the top **risks** and a quick fix for each.  
* Decide how we know we are done (1–2 lines).  
* Pick **one approver** and put them in `JTBD.yml`.

**Use tools**

* **ChatGPT:** “Turn these notes into 5 bullets for a PR.” Paste notes.  
* **Cursor:** edit `JTBD.yml`; create `docs/RISKS.md` with the top 5 risks.

**Practice**

* **ChatGPT:** “Check this `JTBD.yml` for 6th‑grade reading.”

**Do**

* **Tools:** GitHub (web), Cursor/Editor  
* PR **“P1 – Discovery.”** Paste bullets into `JTBD.yml`; add `docs/RISKS.md`.  
* Ask the approver to review. Capture Q\&A in the PR. **Merge** when they say yes.

**STOP:** Scope, risks, and budget are in the repo.

---

## **P2 — Planning**

**Goal:** Break work into small, clear tasks.

**Plan**

* List tasks in **`actions.yml`**. Keep each task **90 minutes or less**.  
* For each task add: **owner** and short **Done** line.  
* Order tasks by value and blockers.  
* Add **gates** (ex: build green, tests ≥ 70%).  
* Map phases P0–P7 in **`orchestration.yml`**.

**Use tools**

* **ChatGPT:** “Propose `actions.yml` tasks for Strapi \+ iOS build/test/deploy.”  
* **ChatGPT:** “Make `orchestration.yml` that maps P0–P7 using these action IDs.”  
* **Cursor:** paste, fix YAML spacing.

**Practice**

* **ChatGPT:** “Check that `orchestration.yml` only uses valid action IDs.”

**Do**

* **Tools:** GitHub (web), Cursor/Editor  
* PR **“P2 – Planning.”** Commit `actions.yml` and `orchestration.yml`. Get OK from owners. **Merge**.

**STOP:** Plan is clear. Owners are tagged.

---

## **P3 — Presets & Schema**

**Goal:** Lock the look and the data shape.

**Plan**

* Pick colors, fonts, spacing in a **dark theme**.  
* Decide fields and the link: **TaskList has many Tasks**.  
* Set Strapi **roles & permissions** (users can change only their own items).  
* List needed **DTOs** (login, list CRUD, task CRUD).

**Use tools**

* **ChatGPT:** “Make `tokens.json` for dark UI with large titles and clear buttons.”  
* **ChatGPT:** “Draft Strapi schema for TaskList↔Task with our fields.”  
* **ChatGPT:** “Write simple API contracts for login, lists, tasks.”  
* **Cursor:** make files and paste.

**Practice**

* **ChatGPT:** “Summarize the schema in 3 bullets for the PR.”

**Do**

* **Tools:** Strapi Admin, Cursor/Editor, GitHub (web)  
* Add **tokens.json** to the repo.  
* In **Strapi**, create types, set relations and permissions.  
* Make a **test user** and **one TaskList**.  
* Add **strapi-schema.md** and **api-contracts.md**. PR and merge.

**STOP:** Tokens, schema, and API docs are in the repo and approved.

---

## **P4 — Build (3 simple days)**

**Goal:** App builds, logs in, shows lists, and lets you add tasks.

### **Day 1**

**Plan**

* Create **AppStore**, **AppServices**, and empty **repository protocols**.  
* Default backend \= **mock**.  
* Add `Config.swift` with `STRAPI_BASE_URL`.  
* Make sure all files are in the Xcode **target**.

**Use tools**

* **ChatGPT:** “Write Swift stubs for AppStore, AppServices, and empty repos.”  
* **Cursor:** create files, paste, add to target.

**Practice**

* **ChatGPT:** “Explain this build error in simple words and give one fix.”

**Do**

* **Tools:** Xcode, Cursor/Editor, Terminal (git), GitHub (web)  
* Build in Xcode. Fix missing imports/targets until **green**.  
* Commit: **“P4 D1 – skeleton builds.”**

**Gate:** Build is green.

### **Day 2**

**Plan**

* Write **mock repos**: Task, TaskList, Auth (in‑memory).  
* Add **unit tests** for CRUD and sorting.  
* (If you have CI) add a test job.

**Use tools**

* **ChatGPT:** “Write a mock TaskRepository with an array and CRUD.”  
* **ChatGPT:** “Write XCTest for that mock.”  
* **Cursor:** run tests (`⌘U`), apply fixes.

**Practice**

* **ChatGPT:** “Why did this test fail? Suggest a tiny patch.” Paste failure.

**Do**

* **Tools:** Xcode (tests), Cursor/Editor, Terminal (git), GitHub (web), CI system (optional)  
* Run tests. Fix until green. Aim for **≥ 70%** coverage.  
* Commit: **“P4 D2 – mocks \+ tests.”**

**Gate:** Tests ≥ 70%.

### **Day 3**

**Plan**

* Build SwiftUI flow: **Root → Home → List → Rows**.  
* Add **HeaderRow**, **MinutesPickerSheet**, **bottom toolbar**.  
* Hook views to **AppStore**.  
* Connect **StrapiClient** for login and list fetch. (Use your Mac’s IP in `STRAPI_BASE_URL` on a device/simulator.)

**Use tools**

* **ChatGPT:** “Make a simple SwiftUI flow with those screens and controls.”  
* **Cursor:** apply code; use find/replace if you renamed `Store`→`AppStore`.

**Practice**

* **ChatGPT:** “Check these files for obvious crashes or force unwraps.”

**Do**

* **Tools:** Xcode/Simulator, Strapi Admin, Cursor/Editor, Terminal (git), GitHub (web)  
* Run on Simulator. **Login → see first list → add a task**.  
* Record a 30‑sec clip.  
* Commit: **“P4 D3 – UI \+ Strapi happy path.”**

**Gate:** Basic accessibility check passes. No show‑stopper bugs.

---

## **P5 — Hardening**

**Goal:** Fix bugs. Add docs. Make it stable.

**Plan**

* Write a **bug list**. Mark **P0/P1** and owners.  
* Add light **logging** for errors.  
* Write **RUNBOOK.md** (how to roll back / recover).

**Use tools**

* **ChatGPT:** “Group these bugs by severity and give the order to fix.”  
* **Cursor:** apply small patches; run app 5 times.

**Practice**

* **ChatGPT:** “Make a 5‑item smoke test we can run by hand.”

**Do**

* **Tools:** GitHub Issues/Projects, Xcode, Cursor/Editor  
* Fix top items first. Close issues with a one‑line note.  
* Create **100 demo tasks**; check scroll, speed, and memory.  
* Update docs and screenshots.

**STOP:** No critical bugs. App feels fast enough. Docs added.

---

## **P6 — Release**

**Goal:** Ship the app.

**Plan**

* Set version numbers (build \+ marketing).  
* Freeze strings and icons.  
* Draft release notes and a one‑page checklist.  
* Confirm Strapi URL and roles.

**Use tools**

* **ChatGPT:** “Write friendly release notes. Keep it short.”

**Practice**

* **ChatGPT:** “Proofread these notes for 6th‑grade reading.”

**Do**

* **Tools:** Terminal (git), App Store Connect/TestFlight, GitHub Releases (optional)  
* **Cursor/Terminal:** `git tag v1.0.0 && git push --tags`  
* Store release as needed.

**STOP:** Live build is out. Notes saved.

---

## **P7 — After Release**

**Goal:** Save learnings. Plan the next sprint.

**Plan**

* Book a **30‑min retro**.  
* Collect facts: bugs, time, blockers, wins.  
* Pick **3 next steps**.

**Use tools**

* **ChatGPT:** “Turn our retro notes into a short entry for `context_ledger.json` and 3 next steps.”

**Practice**

* **ChatGPT:** “Make each next step a one‑sentence task with an owner.”

**Do**

* **Tools:** GitHub (Issues/Projects), Editor (for `context_ledger.json`)  
* Add the entry to **`context_ledger.json`**.  
* Open issues for the **3 next steps** and add owners.  
* Archive the sprint board.

**STOP:** Retro saved. Next sprint ready.

---

## **What to attach (each phase)**

* **Contracts:** JTBD.yml, actions.yml, orchestration.yml, gates.yml (diffs OK).  
* **Design:** tokens.json, strapi-schema.md, api-contracts.md.  
* **Build:** test screenshots and coverage %, preview URL.  
* **Hardening:** RUNBOOK.md, short perf notes.  
* **Release:** tag, store link, changelog.  
* **Learnings:** ledger entry.

---

## **If you get stuck**

* A check fails → label the PR **needs\_human**. Pause. Write a fix plan. Try again.  
* Over budget → pause, log the reason, adjust JTBD via PR.  
* Roll back → follow RUNBOOK: revert the PR, deploy last green tag, check health.

---

## **Add‑On: CollabTask notes (Strapi \+ iOS)**

* **Strapi types**  
  * TaskList: `name (text)`, `isFinished (bool)`, `owner (User)`, `tasks (many)`  
  * Task: `text (text)`, `minutes (int)`, `taskStatus (todo|inProgress|done)`, `order (int)`, `list (TaskList)`  
* **Permissions:** public \= off; authenticated \= CRUD **own** items.  
* **iOS files:** `AppStore.swift`, `AppServices.swift`, `Repositories/*`, `Networking/StrapiClient.swift`.  
* **Tests:** unit tests for repos; one UI smoke test (make list → add task → toggle done).  
* **Preview:** host Strapi; set `STRAPI_BASE_URL`.

---

## 🚨 Incident Response Additions
-----------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------
- **Voice/Video Failure** → Escalate to infra team, verify D-ID/HeyGen API keys, fallback to text mode.  
- **Consent Misfire** → Pause companion, alert safety ops, log event in moderation dashboard.  
- **Vault Leak Suspicion** → Trigger emergency encryption refresh, notify legal + compliance.  
- **Push Notification Opt-out Request** → Confirm in-app, propagate to notification service, validate removal.  

-----------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------


## **Quick Words**

* **Action**: a task line in `actions.yml`.  
* **Gate**: a rule to pass (ex: tests ≥ 70%).  
* **Plan / Practice / Do**: think → test safely → make real.

---

## **Project “Done” checklist**

* All phases P0–P7 merged to **main**.  
* Build green; tests ≥ **70%**.  
* You can **log in**, **see lists**, **add a task**.  
* Docs in repo (contracts, schema, API, runbook).  
* Release tag pushed. Notes saved.  
* Ledger updated with learnings.

