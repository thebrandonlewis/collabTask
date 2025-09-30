# **Project System Process Blueprint — v3.1**

**Purpose** A stable, high‑level plan for how we build, review, and ship. This Blueprint is the *constitution*; the Operational Guide is the *playbook*. They map **1:1**: each Phase here has a matching, more granular section in the Operational Guide.

---

## **0\) Start Here (Index)**

Create **`docs/README.md`** with these links and quick choices:

* **Blueprint (this doc)** – what stays stable.  
* **Operational Guide** – step‑by‑step runbook.  
* **JTBD.yml** – single source of truth for goals & budgets (Informed by Project JTBD scenarios)  
* **Open the Sprint Issue** – "Copy Phase checklist → Issue" button.

**First-time setup**

1. Fill `JTBD.yml` (owner, scope, budget caps).  
2. Create `actions.yml`, `orchestration.yml`, `gates.yml` with the stubs below.  
3. Name approvers and quality owners.

---

## **1\) Single Source of Truth (Contracts)**

Keep knobs and gates in code, not prose. These files are authoritative:

* **`JTBD.yml`** – business goals, audiences, guardrails, budgets.  
* **`actions.yml`** – named, reusable tasks (used by people & CI).  
* **`orchestration.yml`** – which actions run in which phase/run mode.  
* **`gates.yml`** – Definition‑of‑Ready/Done; quality & budget thresholds.  
* **`context_ledger.json`** – decision log \+ short rationale.

**JTBD.yml (schema sketch)**

```yaml
project:
  name: FlirtIO
  owner: @you
  approvers: [@design, @englead]
  goals:
    - "Ship V1 tasks + list sync"
    - "💬 Support messaging (text, SMS, push notifications)"
    - "🎙️ Integrate voice playback + 📹 video rendering"
    - "🔒 Implement consent checkpoints + burn mode"
  non_goals:
    - "Realtime collab"
  audiences: ["iOS", "Android", "Web (secure vault)"]
  constraints:
    budget:
      tokens: 1_000_000    # AI/ops budget caps
      time_days: 7
    compliance:
      accessibility: WCAG_2_2_AA
```

**gates.yml (quality & budget)**

```yaml
quality:
  accessibility: WCAG_2_2_AA
  lighthouse_min: 90
  tests_min_coverage: 0.70
budget:
  tokens_max: 1_000_000
  actions_on_over:
    - label: pause_generation
    - label: needs_human
    - notify: #slack-release
```

**actions.yml (reusable tasks)**

```yaml
actions:
  cms.strapi.bootstrap: "Create CTs, roles, perms"
  repo.swift.add_modules: "Add AppStore, Repositories, Networking"
  ui.tailwind.scan: "Scan components + presets"
  tests.run: "Run unit/ui tests"
  deploy.railway.preview: "Create preview env"
```

**orchestration.yml (what runs when)**

```yaml
phases:
  P1_discovery:
    plan:    [cms.strapi.bootstrap]
    dry_run: []
    exec:    []
  P4_build:
    plan:    [repo.swift.add_modules]
    dry_run: [tests.run]
    exec:    [deploy.railway.preview]
```

### ✅ Definition of Ready (DoR)

- `Persona + tone specs documented`
- `🔒 Consent checkpoints mapped for new features (voice, video, push)`
- `🧨 Burn mode requirements defined`

### 🏁 Definition of Done (DoD)

- `🎙️ Voice playback validated in-app`
- `🎥 Video rendering tested across devices`
- `📲 Push/SMS notifications delivered & opt-out confirmed`
- `🔐 Encryption verified for vault + burn mode tested`

### 💰 Budgets

- `Note: Budgets refer to internal ops allocation (AI tokens, API usage, infra overhead), not user-facing token purchases or credits.`
- `Allocate margin for 📹 video/voice media processing overhead (API + infra costs).`

---

## **2\) Run Modes**

Every Phase uses the same three "gears" to reduce risk:

* **plan** – generate plans, diffs, and checklists only.  
* **dry\_run** – simulate/validate (no live writes), run tests.  
* **exec** – perform the change; create PRs, provision, deploy.

CI honors run‑modes. If a gate fails, CI labels the PR `needs_human` and **stops** `exec`.

---

## **3\) Project Phases — 1:1 with Operational Guide**

Each phase below lists: **Goal → Inputs → Actions → Outputs → Gates → Owner & Time**.

### **P0 — Project Setup**

**Goal**: Project skeleton and contracts exist.

* Inputs: none  
* Actions: create repo; add contracts (`JTBD.yml`, `actions.yml`, `orchestration.yml`, `gates.yml`); add `docs/README.md`.  
* Outputs: repo with contracts; first Decision Ledger entry.  
* Gates: repo lint passes; approvers assigned.  
* Owner/Time: PM/Tech Lead, 0.5d

### **P1 — Discovery**

**Goal**: Clarify scope, risks, budget.

* Inputs: stakeholder notes → `JTBD.yml`  
* Actions: interviews → update JTBD; risk register; preset inventory.  
* Outputs: signed `JTBD.yml`; Phase checklists seeded.  
* Gates: approver sign‑off; budgets set.  
* Owner/Time: PM, 1d

### **P2 — Planning**

**Goal**: Convert scope into concrete actions.

* Inputs: `JTBD.yml`  
* Actions: author/validate `actions.yml` \+ `orchestration.yml`; assign owners.  
* Outputs: planned Actions with IDs; sprint issue created.  
* Gates: orchestration dry‑run green.  
* Owner/Time: Tech Lead, 0.5d

### **P3 — Design & Presets**

**Goal**: Design decisions & component presets ready.

* Inputs: JTBD audiences \+ constraints  
* Actions: preset‑first component scan; API contracts; Strapi schema draft.  
* Outputs: design tokens/presets; schema reviewed.  
* Gates: a11y tokens present; API surface approved.  
* Owner/Time: Design+Eng, 1d

### **P4 — Build**

**Goal**: Implement vertical slice with CI governance.

* Inputs: presets, schema  
* Actions (plan/dry\_run/exec): code generation; repo wiring; feature flags; tests.  
* Outputs: PR(s) to main; preview env.  
* Gates: tests ≥70%, a11y pass, Lighthouse ≥90; budget within cap.  
* Owner/Time: Eng, 2d

### **P5 — Hardening**

**Goal**: Stabilize & document.

* Inputs: preview usage data; bug list  
* Actions: fix defects; add docs & runbooks; perf pass.  
* Outputs: release candidate; runbook page.  
* Gates: zero P0s; perf thresholds met; docs added.  
* Owner/Time: Eng, 1d

### **P6 — Release**

**Goal**: Ship safely, announce clearly.

* Inputs: RC, changelog  
* Actions: approvals; cut release tag; store submission; announce.  
* Outputs: shipped build; release notes.  
* Gates: sign‑offs; incident playbook linked.  
* Owner/Time: PM+Eng, 0.5d

### **P7 — Post‑Release & Learnings**

**Goal**: Capture insights and update contracts.

* Inputs: metrics, retro  
* Actions: update `context_ledger.json`; adjust `gates.yml` if needed.  
* Outputs: learnings issue; backlog updates.  
* Gates: retro recorded; next sprint created.  
* Owner/Time: Team, 0.5d

---

## **4\) Governance & CI**

* **Quality gates** from `gates.yml` enforced in CI.  
* **Budget guardrails**: if token/time budget exceeded → label `pause_generation` \+ `needs_human`; block further `exec`.  
* **Labels & notifications**: CI posts status; owners auto‑pinged.

---

## **5\) Repo Layout (minimal)**

```
.├── docs/
│   └── README.md              # links + quickstart
├── orchestrator/
│   ├── JTBD.yml
│   ├── actions.yml
│   ├── orchestration.yml
│   ├── gates.yml
│   └── context_ledger.json
└── app/                       # source code
```

---

## **6\) Signals & Next Actions (Cheat‑Sheet)**

* **Gate fails** → CI adds `needs_human` and comments the failing metric.  
* **Over budget** → CI adds `pause_generation`; only approvers can resume.  
* **Decision needed** → open an ADR stub in `context_ledger.json` and link in PR.

---

## **7\) Roles**

* **Owner**: accountable for phase outcome, accepts DoD.  
* **Approver(s)**: can unblock `exec` after gate review.  
* **Quality Owner**: monitors a11y/tests/perf gates.

---

## **8\) Sprint Cadence (D1–D7 Template)**

* **D1** Discovery → **D2** Planning → **D3** Design → **D4–D5** Build → **D6** Hardening → **D7** Release & Retro. Each day maps to the Phases above and uses the same run‑modes.

---

## **9\) Change Management**

* Any change to contracts requires: PR \+ approver sign‑off \+ ledger entry.  
* The Operational Guide may evolve weekly; this Blueprint changes rarely.

---

## **10\) Mapping to Operational Guide (1:1)**

| Blueprint Phase | Operational Guide Section |
| ----- | ----- |
| P0 Setup | 0\. Setup & Contracts |
| P1 Discovery | 1\. Discovery (checklist) |
| P2 Planning | 2\. Planning & Action IDs |
| P3 Design & Presets | 3\. Presets & Schema |
| P4 Build | 4\. Build (day‑by‑day) |
| P5 Hardening | 5\. Hardening & Docs |
| P6 Release | 6\. Release Steps |
| P7 Post‑Release | 7\. Learnings & Ledger |

The Operational Guide will reference **exact `actions.yml` IDs** and the **gates** defined here. It provides atomic, confirmable checklists per phase.

---

## **🤝 Integration with Strategic Planning System**

**This Blueprint works PERFECTLY with our new Strategic Planning approach:**

### **Strategic Planning** (WHAT & WHY) → **Blueprint** (HOW & WHEN)

1. **Strategic Planning Phase** (1 hour)
   - Problem definition → Informs `JTBD.yml` goals
   - User personas → Defines target audiences
   - Feature prioritization → Creates `actions.yml` task list
   - Success metrics → Sets up `gates.yml` quality criteria

2. **Blueprint Setup** (15 minutes)
   - Convert strategic plan into orchestrator contracts
   - Set up phases and quality gates
   - Define team roles and approvals

3. **Automated Implementation** (1 hour)
   - Cursor executes based on orchestrator phases
   - Quality gates ensure strategic goals are met
   - Structured workflow prevents scope creep

4. **Continuous Improvement** (ongoing)
   - Post-release learnings update contracts
   - Strategic metrics validate success
   - Iterative improvement based on data

**Result: Strategic thinking + Systematic execution = Professional results!**
