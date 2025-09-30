# FlirtIO Development Workflow

## 🎯 **CORE PRINCIPLES**

### **SINGLE SOURCE OF TRUTH**
- **ALL CODE**: `FlirtIO/` directory only
- **ALL DOCS**: `docs/` directory only
- **NO DUPLICATES**: One file per purpose
- **NO OUTSIDE DIRECTORIES**: No `apps/`, `src/`, `lib/` outside FlirtIO/

## 📁 **DIRECTORY STRUCTURE (ENFORCED)**

```
flirtIO/
├── docs/                    ← ALL DOCUMENTATION
│   ├── README files
│   ├── Setup guides
│   ├── Standards
│   └── References
├── FlirtIO/                 ← ONLY CODE DIRECTORY
│   ├── App.tsx              ← MAIN APP (ONLY ONE)
│   ├── package.json         ← DEPENDENCIES (ONLY ONE)
│   ├── components/          ← UI COMPONENTS
│   ├── services/            ← SERVICE LAYER
│   │   └── SupabaseService.ts ← DATABASE (ONLY ONE)
│   ├── scripts/             ← DEVELOPMENT TOOLS
│   ├── constants/           ← APP CONSTANTS
│   └── assets/              ← IMAGES & MEDIA
├── cms/                     ← CMS (SEPARATE)
├── content/                 ← CONTENT (SEPARATE)
└── orchestrator/            ← PROJECT MANAGEMENT
```

## 🔒 **ENFORCEMENT MECHANISMS**

### **1. Pre-commit Hook**
- **Automatically runs** before every commit
- **Blocks commits** that violate organization standards
- **Prevents duplicates** and misplaced files

### **2. Chaos Prevention Script**
```bash
# Run before development
./FlirtIO/scripts/prevent-chaos.sh audit

# Run to fix issues
./FlirtIO/scripts/prevent-chaos.sh fix
```

### **3. File Organization Standards**
- **Documented** in `docs/FILE_ORGANIZATION_STANDARD.md`
- **Enforced** by automated scripts
- **Validated** before every commit

## 🚀 **DEVELOPMENT WORKFLOW**

### **Before Starting Work:**
```bash
# 1. Navigate to correct directory
cd FlirtIO/

# 2. Run prevention audit
./scripts/prevent-chaos.sh audit

# 3. Verify clean state
pwd  # Should show: /path/to/flirtIO/FlirtIO
```

### **During Development:**
```bash
# Always work from FlirtIO/ directory
cd FlirtIO/

# Make changes to files in FlirtIO/ only
# Never create files outside FlirtIO/
# Never duplicate existing files
```

### **Before Committing:**
```bash
# 1. Run prevention audit
./scripts/prevent-chaos.sh audit

# 2. Fix any issues found
./scripts/prevent-chaos.sh fix

# 3. Commit (pre-commit hook will validate)
git add .
git commit -m "Your message"
```

## 🛡️ **PREVENTION RULES**

### **NEVER CREATE:**
- ❌ `App.tsx` outside `FlirtIO/`
- ❌ `package.json` outside `FlirtIO/`
- ❌ `SupabaseService.ts` outside `FlirtIO/services/`
- ❌ `.md` files outside `docs/`
- ❌ `apps/`, `src/`, `lib/` directories outside `FlirtIO/`
- ❌ Duplicate files anywhere

### **ALWAYS CREATE:**
- ✅ New components in `FlirtIO/components/`
- ✅ New services in `FlirtIO/services/`
- ✅ New constants in `FlirtIO/constants/`
- ✅ Documentation in `docs/`
- ✅ Scripts in `FlirtIO/scripts/`

## 🔧 **TOOLS & SCRIPTS**

### **Organization Tools:**
- `prevent-chaos.sh` - Audit and fix organization issues
- `pre-commit` hook - Enforce standards before commits
- `test-services.sh` - Test external service connectivity

### **Development Tools:**
- `start-persistent.sh` - Start Expo with proper environment
- `runbook-rollback.sh` - Rollback to working state
- `audit-environment.sh` - Check development environment

## 📋 **DAILY CHECKLIST**

### **Morning Setup:**
- [ ] Navigate to `FlirtIO/` directory
- [ ] Run `./scripts/prevent-chaos.sh audit`
- [ ] Fix any organizational issues
- [ ] Start development server

### **Before Committing:**
- [ ] Run `./scripts/prevent-chaos.sh audit`
- [ ] Ensure all files are in correct directories
- [ ] Verify no duplicates exist
- [ ] Commit with descriptive message

### **Weekly Maintenance:**
- [ ] Review directory structure
- [ ] Clean up any temporary files
- [ ] Update documentation if needed
- [ ] Run full service connectivity tests

## 🚨 **COMMON MISTAKES TO AVOID**

### **File Placement:**
- ❌ Creating `App.tsx` in root directory
- ❌ Creating `services/` directory outside `FlirtIO/`
- ❌ Creating `.md` files in `FlirtIO/`
- ❌ Duplicating existing files

### **Directory Creation:**
- ❌ Creating `apps/mobile/` directory
- ❌ Creating `src/` directory outside `FlirtIO/`
- ❌ Creating `lib/` directory outside `FlirtIO/`
- ❌ Creating nested project structures

### **Import Paths:**
- ❌ Importing from `../services/` (wrong path)
- ❌ Importing from `apps/mobile/` (legacy path)
- ❌ Using absolute paths outside `FlirtIO/`

## 🎯 **SUCCESS METRICS**

### **Clean Project Indicators:**
- ✅ Only one `App.tsx` file (in `FlirtIO/`)
- ✅ Only one `package.json` file (in `FlirtIO/`)
- ✅ Only one `SupabaseService.ts` file (in `FlirtIO/services/`)
- ✅ All `.md` files in `docs/`
- ✅ No duplicate or misplaced files
- ✅ Pre-commit hook passes
- ✅ Prevention audit passes

### **Red Flags:**
- ❌ Multiple `App.tsx` files
- ❌ Files in wrong directories
- ❌ Duplicate service files
- ❌ Documentation outside `docs/`
- ❌ Pre-commit hook failures

---

**🎯 REMEMBER: FlirtIO/ is the ONLY code directory. Everything else is documentation or separate systems.**
