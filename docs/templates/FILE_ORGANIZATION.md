# FlirtIO File Organization Guide 📁

**Complete guide to file placement, directory structure, and organization standards**

## 🎯 **Organization Principles**

### **1. Single Source of Truth**
- Each file type has ONE designated location
- No duplicate files across directories
- Clear hierarchy and purpose for each directory

### **2. Functional Grouping**
- Files grouped by function, not by type
- Related files stay together
- Easy to find and maintain

### **3. Scalability**
- Structure supports growth
- Clear patterns for new files
- Consistent naming conventions

---

## 📂 **Directory Structure**

```
flirtio-project/
├── mobile-app/                    # React Native mobile application
│   ├── App.tsx                   # Main app entry point
│   ├── package.json              # Mobile app dependencies
│   ├── components/               # UI components
│   │   ├── PersonaCard.tsx
│   │   ├── LoadingScreen.tsx
│   │   └── onboarding/           # Onboarding flow components
│   ├── services/                 # API and external services
│   │   ├── SupabaseService.ts
│   │   └── PersonaImageService.ts
│   ├── constants/                # App constants and configuration
│   │   └── personas.ts
│   ├── assets/                   # Images, icons, and media
│   │   └── personas/             # Persona-specific images
│   ├── __tests__/                # Unit tests
│   │   ├── components/           # Component tests
│   │   ├── services/             # Service tests
│   │   └── utils/                # Utility tests
│   └── .env                      # Environment variables
├── cms/flirtio-strapi/           # Strapi CMS backend
│   ├── src/                      # CMS source code
│   ├── config/                   # CMS configuration
│   ├── public/                   # CMS assets
│   └── .env                      # CMS environment variables
├── docs/                         # Documentation
│   ├── SETUP.md                  # Setup guide
│   ├── SERVICES.md               # Services documentation
│   ├── TESTING.md                # Testing documentation
│   ├── FILE_ORGANIZATION.md      # This file
│   └── images/                   # Documentation images
├── scripts/                      # Automation and utility scripts
│   ├── testing/                  # Testing scripts
│   │   ├── test-integration.sh
│   │   └── test-e2e.sh
│   ├── test-services.sh          # Service connectivity tests
│   ├── diagnose_flirtio.sh       # Diagnostic script
│   └── healthcheck.sh            # Health check script
├── content/                      # Content and data
│   └── personas/                 # Persona content files
├── orchestrator/                 # Project orchestration
│   ├── actions.yml
│   ├── gates.yml
│   └── JTBD.yml
└── package.json                  # Root dependencies and scripts
```

---

## 📋 **File Placement Rules**

### **Mobile App Files (`mobile-app/`)**

| File Type | Location | Purpose | Examples |
|-----------|----------|---------|----------|
| **Components** | `components/` | UI components | `PersonaCard.tsx`, `LoadingScreen.tsx` |
| **Services** | `services/` | API services | `SupabaseService.ts`, `PersonaImageService.ts` |
| **Constants** | `constants/` | App constants | `personas.ts`, `config.ts` |
| **Assets** | `assets/` | Images, icons | `personas/`, `icons/` |
| **Tests** | `__tests__/` | Unit tests | `components/`, `services/` |
| **Config** | Root | Configuration | `package.json`, `.env`, `tsconfig.json` |

### **CMS Files (`cms/flirtio-strapi/`)**

| File Type | Location | Purpose | Examples |
|-----------|----------|---------|----------|
| **Source Code** | `src/` | CMS source | `api/`, `admin/`, `extensions/` |
| **Configuration** | `config/` | CMS config | `database.ts`, `server.ts` |
| **Assets** | `public/` | CMS assets | `uploads/`, `robots.txt` |
| **Types** | `types/` | TypeScript types | `generated/` |

### **Documentation Files (`docs/`)**

| File Type | Location | Purpose | Examples |
|-----------|----------|---------|----------|
| **Setup Guides** | Root | Setup instructions | `SETUP.md`, `DEVELOPER_SETUP.md` |
| **Service Docs** | Root | Service documentation | `SERVICES.md`, `BACKEND_SETUP.md` |
| **Testing Docs** | Root | Testing documentation | `TESTING.md`, `TESTING_STRATEGY.md` |
| **Images** | `images/` | Documentation images | `screenshots/`, `diagrams/` |

### **Scripts (`scripts/`)**

| File Type | Location | Purpose | Examples |
|-----------|----------|---------|----------|
| **Testing Scripts** | `testing/` | Test automation | `test-integration.sh`, `test-e2e.sh` |
| **Service Scripts** | Root | Service management | `test-services.sh`, `healthcheck.sh` |
| **Diagnostic Scripts** | Root | Diagnostics | `diagnose_flirtio.sh` |

---

## 🚫 **What NOT to Do**

### **Avoid These Patterns**

1. **Duplicate Files**
   ```bash
   # ❌ DON'T: Multiple copies of the same file
   mobile-app/services/SupabaseService.ts
   services/SupabaseService.ts
   apps/mobile/services/SupabaseService.ts
   ```

2. **Wrong Directory**
   ```bash
   # ❌ DON'T: Put mobile app files in root
   App.tsx                    # Should be in mobile-app/
   package.json               # Should be in mobile-app/
   ```

3. **Mixed Concerns**
   ```bash
   # ❌ DON'T: Mix different types of files
   components/
   ├── PersonaCard.tsx
   ├── SupabaseService.ts    # Should be in services/
   └── personas.ts           # Should be in constants/
   ```

4. **Legacy Directories**
   ```bash
   # ❌ DON'T: Use legacy directories
   apps/mobile/               # Legacy - use mobile-app/
   services/                  # Legacy - use mobile-app/services/
   ```

---

## ✅ **Best Practices**

### **1. Consistent Naming**

```bash
# ✅ DO: Use consistent naming patterns
components/
├── PersonaCard.tsx          # PascalCase for components
├── LoadingScreen.tsx
└── onboarding/
    ├── OnboardingFlow.tsx
    └── PersonaSelectionScreen.tsx

services/
├── SupabaseService.ts       # PascalCase for services
├── PersonaImageService.ts
└── NotificationService.ts

constants/
├── personas.ts              # camelCase for constants
├── config.ts
└── api-endpoints.ts
```

### **2. Clear File Purposes**

```bash
# ✅ DO: Make file purposes clear
__tests__/
├── components/              # Component tests
│   ├── PersonaCard.test.tsx
│   └── LoadingScreen.test.tsx
├── services/                # Service tests
│   ├── SupabaseService.test.ts
│   └── PersonaImageService.test.ts
└── utils/                   # Utility tests
    └── helpers.test.ts
```

### **3. Logical Grouping**

```bash
# ✅ DO: Group related files
mobile-app/
├── components/
│   ├── PersonaCard.tsx
│   ├── PersonaCard.styles.ts
│   └── PersonaCard.test.tsx
├── services/
│   ├── SupabaseService.ts
│   ├── SupabaseService.types.ts
│   └── SupabaseService.test.ts
```

---

## 🔧 **File Organization Commands**

### **Create New Files**

```bash
# Create new component
touch mobile-app/components/NewComponent.tsx
touch mobile-app/components/NewComponent.test.tsx
touch mobile-app/components/NewComponent.styles.ts

# Create new service
touch mobile-app/services/NewService.ts
touch mobile-app/services/NewService.test.ts

# Create new test
touch mobile-app/__tests__/components/NewComponent.test.tsx
```

### **Move Files**

```bash
# Move file to correct location
mv old-location/file.ts new-location/file.ts

# Update imports after moving
# Search and replace import paths
```

### **Find Files**

```bash
# Find all TypeScript files
find . -name "*.ts" -o -name "*.tsx"

# Find all test files
find . -name "*.test.ts" -o -name "*.test.tsx"

# Find duplicate files
find . -name "App.tsx" -type f
```

---

## 📊 **File Organization Checklist**

### **Before Adding New Files**

- [ ] **Is this the right directory?** Check the file type and purpose
- [ ] **Does a similar file already exist?** Avoid duplicates
- [ ] **Are the naming conventions consistent?** Follow established patterns
- [ ] **Will this scale?** Consider future growth

### **When Moving Files**

- [ ] **Update all imports** that reference the moved file
- [ ] **Update any build scripts** that reference the old path
- [ ] **Test the changes** to ensure nothing breaks
- [ ] **Update documentation** if needed

### **Regular Maintenance**

- [ ] **Remove unused files** regularly
- [ ] **Consolidate similar files** when appropriate
- [ ] **Update file organization** as the project grows
- [ ] **Keep documentation current** with actual structure

---

## 🎯 **Quick Reference**

### **Where to Put New Files**

| New File Type | Put It Here | Example |
|---------------|-------------|---------|
| React Component | `mobile-app/components/` | `NewComponent.tsx` |
| API Service | `mobile-app/services/` | `NewService.ts` |
| App Constant | `mobile-app/constants/` | `newConstants.ts` |
| Test File | `mobile-app/__tests__/` | `NewComponent.test.tsx` |
| Image Asset | `mobile-app/assets/` | `new-image.jpg` |
| Documentation | `docs/` | `NEW_FEATURE.md` |
| Script | `scripts/` | `new-script.sh` |

### **Common Patterns**

```bash
# Component with styles and tests
components/
├── ComponentName.tsx
├── ComponentName.styles.ts
└── ComponentName.test.tsx

# Service with types and tests
services/
├── ServiceName.ts
├── ServiceName.types.ts
└── ServiceName.test.ts

# Test organization
__tests__/
├── components/
├── services/
└── utils/
```

---

**🎯 Remember: Good file organization makes development faster and more maintainable!**
