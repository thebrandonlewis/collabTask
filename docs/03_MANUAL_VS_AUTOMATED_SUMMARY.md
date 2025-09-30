# Manual vs. Automated Tasks Summary 🎯

**Complete breakdown of what users must do manually vs. what Cursor can automate**

---

## 🎯 **Overview**

This document provides a clear breakdown of all tasks in the documentation system, explicitly marking what users must do manually versus what can be automated with Cursor prompts.

---

## 🖐️ **Manual Tasks (User Responsibility)**

### **System Setup & Installation**
- **Install Node.js** - Download and install from nodejs.org
- **Install Expo CLI** - Run `npm install -g @expo/cli`
- **Install Cursor IDE** - Download and install from cursor.sh
- **Configure Git** - Set up user name and email
- **Install Expo Go app** - Download from App Store/Google Play

### **Account Creation & API Keys**
- **Create Supabase account** - Sign up at supabase.com
- **Create GitHub account** - Sign up at github.com
- **Create project accounts** - Any other service accounts needed
- **Copy API keys** - Gather all necessary API keys and tokens
- **Configure environment variables** - Add sensitive data to .env files

### **Physical Device Testing**
- **Scan QR codes** - Use phone to scan development server QR codes
- **Test on physical devices** - Install and test apps on real devices
- **Debug device-specific issues** - Handle platform-specific problems

### **Production & Deployment**
- **App store submissions** - Submit to Apple App Store and Google Play
- **Production deployments** - Deploy to production servers
- **Final testing** - User acceptance testing and quality assurance
- **Release management** - Coordinate releases and updates

### **Decision Making**
- **Choose project name** - Decide on app name and branding
- **Select features** - Choose which features to include
- **Pick technologies** - Decide on tech stack and services
- **Design decisions** - Make UI/UX and architectural choices

---

## 🤖 **Automated Tasks (Cursor Can Do)**

### **Code Generation**
- **Create project structure** - Generate complete file organization
- **Generate components** - Create React Native components and screens
- **Write service files** - Create API services and business logic
- **Generate configuration files** - Create package.json, tsconfig.json, etc.
- **Create documentation** - Generate README files and comments

### **Project Setup**
- **Install dependencies** - Add packages to package.json
- **Configure build tools** - Set up TypeScript, ESLint, Prettier
- **Set up testing framework** - Configure Jest and testing utilities
- **Create development scripts** - Add npm scripts for common tasks

### **Feature Implementation**
- **Authentication flows** - Create login/signup screens and logic
- **Navigation setup** - Configure React Navigation
- **State management** - Set up Redux or Context API
- **API integration** - Connect to backend services
- **UI components** - Create reusable UI components

### **Code Maintenance**
- **Refactor code** - Improve code structure and organization
- **Add error handling** - Implement proper error handling
- **Add validation** - Create input validation and form handling
- **Optimize performance** - Improve app performance and efficiency

---

## 📝 **Cursor Prompt Templates**

### **Project Setup Template**
```
**Context**: Setting up a new React Native/Expo project
**Project Details**: 
- Project Name: [PROJECT_NAME]
- Developer: [YOUR_NAME]
- Target Platforms: [TARGET_PLATFORM]
- Main Features: [FEATURE_LIST]
- Backend: [BACKEND_TECH]
- Database: [DATABASE_TYPE]

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

### **Authentication Setup Template**
```
**Context**: Adding authentication system to existing project
**Project Details**:
- Project Name: [PROJECT_NAME]
- Auth Providers: [AUTH_PROVIDERS]
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

### **Feature Development Template**
```
**Context**: Adding new feature to existing app
**Project Details**:
- Project Name: [PROJECT_NAME]
- Feature: [SPECIFIC_FEATURE]
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

## 🎯 **Project-Specific Placeholders**

### **Replace These in Every Prompt**
- `[PROJECT_NAME]` → Your app name (e.g., "FlirtIO", "MyShoppingApp")
- `[YOUR_NAME]` → Your name or team name
- `[TARGET_PLATFORM]` → "iOS", "Android", or "Both"
- `[FEATURE_LIST]` → Specific features you want to build
- `[BACKEND_TECH]` → "Supabase", "Firebase", "Custom API", etc.
- `[DATABASE_TYPE]` → "PostgreSQL", "MongoDB", "SQLite", etc.
- `[AUTH_PROVIDERS]` → "Apple Sign-In, Google Sign-In, Phone OTP"
- `[API_ENDPOINTS]` → Your backend API URLs
- `[DATABASE_URL]` → Your database connection string
- `[BRAND_COLORS]` → Your app's color scheme

---

## 🚀 **Workflow Examples**

### **Complete Project Setup Workflow**
1. **Manual**: Install Node.js, Expo CLI, Cursor IDE
2. **Manual**: Create Supabase account, get API keys
3. **Manual**: Decide on project name and features
4. **Automated**: Use Project Setup Template with your details
5. **Manual**: Add API keys to environment files
6. **Manual**: Test on physical device
7. **Automated**: Use Feature Development Templates for additional features

### **Adding Authentication Workflow**
1. **Manual**: Create Supabase project, get URL and key
2. **Automated**: Use Authentication Setup Template
3. **Manual**: Add Supabase URL and key to .env file
4. **Manual**: Test authentication flow on device
5. **Automated**: Use Feature Development Template for user profiles

### **Feature Development Workflow**
1. **Manual**: Decide on feature requirements and design
2. **Automated**: Use Feature Development Template
3. **Manual**: Test feature functionality
4. **Manual**: Deploy changes to production

---

## ⚠️ **Important Guidelines**

### **Always Do Manually**
- **Review generated code** before accepting
- **Test functionality** after each automation
- **Add API keys** and sensitive configuration
- **Deploy to production** (final step)
- **Make project decisions** (name, features, etc.)

### **Never Automate**
- **API keys and secrets** (security risk)
- **Production deployments** (requires manual review)
- **App store submissions** (requires manual approval)
- **User acceptance testing** (requires human judgment)
- **Physical device testing** (requires human interaction)

### **Best Practices**
- **Be specific** in prompts about requirements
- **Include context** about your project
- **Break large tasks** into smaller prompts
- **Review output** before proceeding to next step
- **Test frequently** throughout the development process

---

## 📋 **Quick Reference Cards**

### **🖐️ Manual Tasks Card**
```
- Install software (Node.js, Expo CLI, Cursor)
- Create accounts (Supabase, GitHub, etc.)
- Copy API keys and configure environment
- Test on physical devices
- Deploy to production
- Make project decisions
```

### **🤖 Automated Tasks Card**
```
- Generate project structure and files
- Create components and screens
- Set up authentication and navigation
- Implement business logic
- Configure build tools and testing
- Add error handling and validation
```

### **📝 Prompt Structure Card**
```
**Context**: [What you're building]
**Project Details**: [YOUR_PROJECT_SPECIFIC_INFO_HERE]
**Requirements**: [What needs to be created]
**Deliverables**: [Expected output]
```

---

**🎯 Use this guide to maximize Cursor's automation while maintaining control over critical manual tasks!**
