# Cursor Automation Guide 🤖

**Clear guidance on what to do manually vs. what Cursor can automate**

---

## 🎯 **Purpose**

This guide provides explicit instructions on:
- **What you must do manually** (user responsibility)
- **What Cursor can automate** (with specific prompts)
- **Where to insert project-specific details** in prompts
- **How to structure prompts for maximum effectiveness**

---

## 📋 **Manual vs. Automated Tasks**

### **🖐️ Manual Tasks (User Must Do)**
- **Download and install software** (Node.js, Expo CLI, etc.)
- **Create accounts** (Supabase, GitHub, etc.)
- **Configure API keys** and environment variables
- **Test on physical devices** (scan QR codes, etc.)
- **Make project decisions** (app name, features, etc.)
- **Review and approve** generated code
- **Deploy to app stores** (final production steps)

### **🤖 Automated Tasks (Cursor Can Do)**
- **Generate code files** from templates
- **Set up project structure** and directories
- **Install dependencies** and configure packages
- **Create configuration files** (package.json, tsconfig.json, etc.)
- **Generate boilerplate code** for components and services
- **Set up authentication flows** and API integrations
- **Create documentation** and README files
- **Configure testing frameworks** and scripts

---

## 🚀 **Cursor Prompt Templates**

### **Template Structure**
Every Cursor prompt should follow this structure:

```
**Context**: [What you're building]
**Project Details**: [YOUR_PROJECT_SPECIFIC_INFO_HERE]
**Requirements**: [What needs to be created]
**Deliverables**: [Expected output]
```

### **Project-Specific Placeholders**
Use these placeholders in prompts, replacing with your actual details:

- `[PROJECT_NAME]` → Your app name (e.g., "FlirtIO", "MyShoppingApp")
- `[YOUR_NAME]` → Your name or team name
- `[API_ENDPOINTS]` → Your backend API URLs
- `[DATABASE_URL]` → Your database connection string
- `[AUTH_PROVIDERS]` → Which auth methods you want (Apple, Google, Phone)
- `[FEATURE_LIST]` → Specific features you want to build
- `[BRAND_COLORS]` → Your app's color scheme
- `[TARGET_PLATFORM]` → iOS, Android, or both

---

## 📝 **Specific Prompt Examples**

### **1. Project Setup Prompt**
```
**Context**: Setting up a new React Native/Expo project
**Project Details**: 
- Project Name: [PROJECT_NAME]
- Developer: [YOUR_NAME]
- Target Platforms: [TARGET_PLATFORM]
- Main Features: [FEATURE_LIST]

**Requirements**: 
- Create complete project structure
- Set up development environment
- Configure build tools and linting
- Create basic app shell with navigation

**Deliverables**:
- Working Expo project that runs on device
- Proper file organization following React Native best practices
- Package.json with all necessary dependencies
- Basic app structure with welcome screen
```

### **2. Authentication Setup Prompt**
```
**Context**: Adding authentication system to existing project
**Project Details**:
- Project Name: [PROJECT_NAME]
- Auth Providers: [AUTH_PROVIDERS] (e.g., "Apple, Google, Phone OTP")
- Backend API: [API_ENDPOINTS]
- Database: [DATABASE_URL]

**Requirements**:
- Implement secure authentication flow
- Create login/signup screens
- Set up token management
- Add user session handling

**Deliverables**:
- Complete authentication screens (React Native)
- Backend API endpoints for auth
- Secure token storage implementation
- User state management system
```

### **3. Feature Development Prompt**
```
**Context**: Adding new feature to existing app
**Project Details**:
- Project Name: [PROJECT_NAME]
- Feature: [SPECIFIC_FEATURE] (e.g., "Chat system", "Payment processing")
- Integration Points: [EXISTING_SYSTEMS]
- UI Requirements: [BRAND_COLORS] and design preferences

**Requirements**:
- Create feature components and screens
- Implement business logic
- Add navigation integration
- Include proper error handling

**Deliverables**:
- Feature components with proper styling
- Business logic and state management
- Navigation integration
- Error handling and validation
```

---

## 🎯 **Where to Insert Project-Specific Details**

### **In Every Prompt, Replace These Placeholders:**

#### **Basic Project Info**
- `[PROJECT_NAME]` → Your actual project name
- `[YOUR_NAME]` → Your name or team name
- `[PROJECT_DESCRIPTION]` → Brief description of what you're building

#### **Technical Details**
- `[TARGET_PLATFORM]` → "iOS", "Android", or "Both"
- `[BACKEND_TECH]` → "Supabase", "Firebase", "Custom API", etc.
- `[DATABASE_TYPE]` → "PostgreSQL", "MongoDB", "SQLite", etc.

#### **Feature-Specific**
- `[AUTH_METHODS]` → "Apple Sign-In, Google Sign-In, Phone OTP"
- `[PAYMENT_METHODS]` → "Stripe, PayPal, Apple Pay"
- `[NOTIFICATION_TYPES]` → "Push, Email, SMS"

#### **Design/Branding**
- `[PRIMARY_COLOR]` → "#FF6B6B" or your brand color
- `[SECONDARY_COLOR]` → "#4ECDC4" or your secondary color
- `[FONT_FAMILY]` → "Inter", "Roboto", "System Default"

---

## 📋 **Step-by-Step Automation Workflow**

### **Phase 1: Manual Setup (5-10 minutes)**
1. **Install required software** (Node.js, Expo CLI, etc.)
2. **Create project accounts** (Supabase, GitHub, etc.)
3. **Decide on project details** (name, features, branding)
4. **Gather API keys** and configuration details

### **Phase 2: Cursor Automation (10-30 minutes)**
1. **Use Project Setup Prompt** with your details
2. **Review generated code** and approve changes
3. **Use Feature-Specific Prompts** for each feature
4. **Test generated functionality** on device

### **Phase 3: Manual Integration (5-15 minutes)**
1. **Add API keys** to environment files
2. **Test on physical devices**
3. **Configure app store settings**
4. **Deploy to production**

---

## 🚨 **Important Guidelines**

### **Always Do Manually**
- **Review generated code** before accepting
- **Test functionality** after each automation
- **Add API keys** and sensitive configuration
- **Deploy to production** (final step)

### **Never Automate**
- **API keys and secrets** (security risk)
- **Production deployments** (requires manual review)
- **App store submissions** (requires manual approval)
- **User acceptance testing** (requires human judgment)

### **Prompt Best Practices**
- **Be specific** about requirements
- **Include context** about your project
- **Break large tasks** into smaller prompts
- **Review output** before proceeding to next step

---

## 🎯 **Quick Reference Cards**

### **Project Setup Card**
```
Prompt: "Set up new [PROJECT_NAME] React Native project with [FEATURE_LIST] for [TARGET_PLATFORM]. Include [AUTH_METHODS] authentication and [BRAND_COLORS] styling."
Manual: Install Node.js, create accounts, decide on features
```

### **Feature Addition Card**
```
Prompt: "Add [SPECIFIC_FEATURE] to [PROJECT_NAME] app. Integrate with [EXISTING_SYSTEMS] and use [BRAND_COLORS] design."
Manual: Test feature, add API keys, deploy changes
```

### **Bug Fix Card**
```
Prompt: "Fix [SPECIFIC_ERROR] in [PROJECT_NAME] app. Error occurs when [ERROR_CONTEXT]. Current code: [PASTE_RELEVANT_CODE]"
Manual: Test fix, verify solution, document changes
```

---

**🎯 Use this guide to maximize Cursor's automation while maintaining control over critical manual tasks!**
