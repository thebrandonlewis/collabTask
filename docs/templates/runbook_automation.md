# Standardized Ops Pack

Agnostic, reusable templates you can drop into any repo. Customize only via **environment variables** and a few optional project flags in `orchestrator/runbook.yml`.

---

## 1) `docs/RUNBOOK.md` (human-friendly)
```md
# RUNBOOK (Human – Simple Steps)

This is your emergency guide. If X happens → do Y.

## How to use
1) Find the problem below.
2) Do the steps in order.
3) Stop when you hit the “Done signal.”
4) Log what happened in `orchestrator/context_ledger.json`.

## Common Problems

### A) Build fails (local or CI)
**Do:**
1. Clean build cache.
2. Rebuild.
3. If failing, run tests to see first error.
4. If still failing, checkout last green tag.

**Commands (examples):**
- macOS/iOS: `Product > Clean Build Folder` or `rm -rf ~/Library/Developer/Xcode/DerivedData/*`
- CLI tests: `bash scripts/healthcheck.sh tests`
- Rollback: `bash scripts/rollback_to_tag.sh $LAST_GREEN_TAG`

**Done signal:** Build is green.

---

### B) API/Backend looks down
**Do:**
1. Health check: `bash scripts/healthcheck.sh backend`
2. If down → restart service: `bash scripts/restart_service.sh backend`
3. If up but app still failing → confirm `BACKEND_URL` in config.
4. If still failing → escalate or rollback.

**Done signal:** Health endpoint returns OK; app flows work.

---

### C) Login broken (after deploy)
**Do:**
1. Check backend auth: health + auth plugin/route enabled.
2. Confirm app points at the right URL.
3. If still failing → rollback to last green tag.

**Commands:**
- `bash scripts/verify_app.sh login`
- `bash scripts/rollback_to_tag.sh $LAST_GREEN_TAG`

**Done signal:** You can log in from a clean app session.

---

### D) Tests under threshold (< 70%)
**Do:**
1. Run tests locally: `bash scripts/healthcheck.sh tests`
2. Open the first 3 failures and fix.
3. Commit and push; CI should pass.

**Done signal:** Coverage ≥ threshold in CI.

---

## QA Testing FLIRT IO SPECIFIC
-----------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------

### 🤖 QA Automation Tasks
- [ ] Validate text blocking + nudges (Tier 1)  
- [ ] Test voice playback + video rendering (Tier 2)  
- [ ] Verify consent checkpoints trigger correctly (Tier 2–3)  
- [ ] Confirm vault restrictions + encryption integrity (Tier 3)  
- [ ] Test push notification delivery + SMS nudge workflows  
- [ ] Run burn mode verification (temporary data deletion)  

-----------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------

## Notes
- Keep environment variables in `.env` or CI secrets.
- Risky actions (like rollback) should require approval.
```

---

## 2) `orchestrator/runbook.yml` (machine-readable twin)
```yaml
# Minimal, project-agnostic mapping of problems → checks → fixes.
# Use env vars: BACKEND_URL, APP_URL, LAST_GREEN_TAG (or discover via GitHub API).

version: 1
thresholds:
  tests_min_coverage: 0.70

problems:
  build_fails:
    checks:
      - name: run_tests
        run: "bash scripts/healthcheck.sh tests"
    fixes:
      - when: "check:run_tests == fail"
        run: "bash scripts/ensure_env.sh && bash scripts/healthcheck.sh tests"
      - when: "still_failing"
        require_approval: true
        run: "bash scripts/rollback_to_tag.sh ${LAST_GREEN_TAG}"
    done_signal:
      - "[CI] reports build: green"

  backend_down:
    checks:
      - name: backend_health
        run: "bash scripts/healthcheck.sh backend"
    fixes:
      - when: "check:backend_health == down"
        run: "bash scripts/restart_service.sh backend"
      - when: "still_failing"
        require_approval: true
        run: "bash scripts/rollback_to_tag.sh ${LAST_GREEN_TAG}"
    done_signal:
      - "curl -fsS ${BACKEND_URL}/health | grep ok"

  login_broken:
    checks:
      - name: backend_health
        run: "bash scripts/healthcheck.sh backend"
      - name: app_login
        run: "bash scripts/verify_app.sh login"
    fixes:
      - when: "check:backend_health == down"
        run: "bash scripts/restart_service.sh backend"
      - when: "check:backend_health == ok && check:app_login == fail"
        run: "bash scripts/verify_app.sh config && bash scripts/verify_app.sh login"
      - when: "still_failing"
        require_approval: true
        run: "bash scripts/rollback_to_tag.sh ${LAST_GREEN_TAG}"
    done_signal:
      - "bash scripts/verify_app.sh login"
```

---

## 3) `scripts/` (shared, reusable)

### `scripts/healthcheck.sh`
```bash
#!/usr/bin/env bash
set -euo pipefail
TARGET="${1:-}"
case "$TARGET" in
  backend)
    : "${BACKEND_URL:?BACKEND_URL not set}"
    curl -fsS "$BACKEND_URL/health" >/dev/null && echo ok || { echo down; exit 1; }
    ;;
  tests)
    # Example placeholder: replace with your stack's test runner
    if command -v xcodebuild >/dev/null; then
      xcodebuild -quiet -scheme CollabTask -destination 'platform=iOS Simulator,name=iPhone 15' test || exit 1
    elif command -v npm >/dev/null; then
      npm test || exit 1
    else
      echo "No known test runner found" && exit 2
    fi
    ;;
  *)
    echo "usage: healthcheck.sh {backend|tests}" && exit 2
    ;;
esac
```

### `scripts/restart_service.sh`
```bash
#!/usr/bin/env bash
set -euo pipefail
SERVICE="${1:-backend}"
# Prefer process managers if available
if command -v pm2 >/dev/null; then
  pm2 restart "$SERVICE"
elif command -v systemctl >/dev/null; then
  sudo systemctl restart "$SERVICE"
else
  echo "No service manager found; implement your restart here" && exit 2
fi
```

### `scripts/rollback_to_tag.sh`
```bash
#!/usr/bin/env bash
set -euo pipefail
TAG="${1:?usage: rollback_to_tag.sh <tag>}"
# Safeguard: require explicit approval env flag in CI/n8n before proceeding
: "${ALLOW_ROLLBACK:?Set ALLOW_ROLLBACK=true to permit rollbacks}"

echo "Rolling back to tag $TAG"
git fetch --tags
# Use a protected rollback strategy for your platform
# Example (GitHub Actions runner doing deploy from main):
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
[ "$CURRENT_BRANCH" = "main" ] || git checkout main

git reset --hard "$TAG"
# Push is optional – your deploy may be tag-based; adapt to your flow
# git push --force origin main
```

### `scripts/verify_app.sh`
```bash
#!/usr/bin/env bash
set -euo pipefail
WHAT="${1:-}"
case "$WHAT" in
  login)
    : "${APP_URL:?APP_URL not set}"
    # Replace with a real synthetic check for your app (login endpoint or UI test)
    curl -fsS "$APP_URL/ping" | grep -qi ok
    ;;
  config)
    # Placeholder example: ensure required envs exist
    : "${BACKEND_URL:?BACKEND_URL not set}"
    : "${APP_URL:?APP_URL not set}"
    echo "config ok"
    ;;
  *)
    echo "usage: verify_app.sh {login|config}" && exit 2
    ;;
esac
```

### `scripts/ensure_env.sh`
```bash
#!/usr/bin/env bash
set -euo pipefail
# Load .env if present for local runs
if [ -f .env ]; then
  set -a; source .env; set +a
fi
# In CI/n8n, rely on injected env/secret values
: "${BACKEND_URL:?BACKEND_URL not set}"
: "${APP_URL:?APP_URL not set}"
: "${LAST_GREEN_TAG:?LAST_GREEN_TAG not set}"
```

> All scripts are POSIX-ish and intentionally generic so they can run in CI, local dev, or n8n containers.

---

## 4) GitHub Actions: `.github/workflows/health.yml`
```yaml
name: health
on:
  schedule: [{ cron: "*/15 * * * *" }] # every 15 minutes
  workflow_dispatch:
jobs:
  checks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set env
        run: |
          echo "BACKEND_URL=${{ secrets.BACKEND_URL }}" >> $GITHUB_ENV
          echo "APP_URL=${{ secrets.APP_URL }}" >> $GITHUB_ENV
          echo "LAST_GREEN_TAG=${{ vars.LAST_GREEN_TAG }}" >> $GITHUB_ENV
      - name: Ensure env
        run: bash scripts/ensure_env.sh
      - name: Backend health
        run: bash scripts/healthcheck.sh backend
      - name: Tests
        run: bash scripts/healthcheck.sh tests
```

---

## 5) n8n – Minimal Workflow (JSON export)
> Import this into n8n and replace URLs/commands as needed. It pings health, restarts if down, and asks for approval before rollback.
```json
{
  "name": "Runbook Auto-Heal (Minimal)",
  "nodes": [
    {"parameters": {"path": "runbook-health", "options": {}}, "id": "Webhook", "name": "Webhook", "type": "n8n-nodes-base.webhook", "typeVersion": 1, "position": [260, 300], "webhookMethods": {"GET": true}},
    {"parameters": {"url": "={{$json[\"BACKEND_URL\"] || $env.BACKEND_URL}}/health", "responseFormat": "string"}, "id": "PingBackend", "name": "HTTP Request", "type": "n8n-nodes-base.httpRequest", "typeVersion": 2, "position": [520, 300]},
    {"parameters": {"conditions": {"string": [{"value1": "={{$json}}", "operation": "contains", "value2": "ok"}]}}, "id": "IFHealthy", "name": "IF Healthy", "type": "n8n-nodes-base.if", "typeVersion": 1, "position": [740, 300]},
    {"parameters": {"command": "bash scripts/restart_service.sh backend"}, "id": "RestartService", "name": "Execute Command", "type": "n8n-nodes-base.executeCommand", "typeVersion": 1, "position": [960, 380]},
    {"parameters": {"text": "Approve rollback? (Yes to proceed)", "additionalFields": {}}, "id": "ManualApproval", "name": "Manual Trigger", "type": "n8n-nodes-base.manualTrigger", "typeVersion": 1, "position": [1160, 380]},
    {"parameters": {"command": "ALLOW_ROLLBACK=true bash scripts/rollback_to_tag.sh $LAST_GREEN_TAG"}, "id": "Rollback", "name": "Execute Command", "type": "n8n-nodes-base.executeCommand", "typeVersion": 1, "position": [1360, 380]}
  ],
  "connections": {
    "Webhook": {"main": [[{"node": "HTTP Request", "type": "main", "index": 0}]]},
    "HTTP Request": {"main": [[{"node": "IF Healthy", "type": "main", "index": 0}]]},
    "IF Healthy": {"main": [[ ], [{"node": "Execute Command", "type": "main", "index": 0}]]},
    "Execute Command": {"main": [[{"node": "Manual Trigger", "type": "main", "index": 0}]]},
    "Manual Trigger": {"main": [[{"node": "Execute Command1", "type": "main", "index": 0}]]}
  }
}
```
*(If your n8n uses different node IDs after import, just reconnect: Webhook → HTTP → IF; IF.false → Restart; Restart → Manual Approval → Rollback.)*

---

## 6) Standard Env Contract
Put these in **`.env`** (local) and CI/n8n secrets/vars (prod):
```
BACKEND_URL=https://api.example.com
APP_URL=https://app.example.com
LAST_GREEN_TAG=v1.0.0
```

> Optional per-project flags can live in `orchestrator/runbook.yml` if truly needed. Avoid hard-coding commands.

---

## 7) How to Adopt in Any Project
1) Copy this whole pack into your repo.
2) Set env vars/secrets.
3) Skim `docs/RUNBOOK.md` and tweak examples (keep it short).
4) Wire **GitHub Actions** (scheduled) and import the **n8n** workflow.
5) Test a failure path (e.g., stop backend) → confirm auto-heal + approval gate.

You now have a **standardized**, mostly agnostic safety net that scales across projects with only env + minimal YAML edits.
