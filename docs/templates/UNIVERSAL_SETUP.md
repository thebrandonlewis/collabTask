# Universal React Native + Expo Setup Guide 🚀

**Template for setting up any React Native + Expo project with backend services**

## 📋 **Quick Start Template**

```bash
# 1. Clone and setup
git clone https://github.com/your-org/your-project.git
cd your-project

# 2. Install dependencies
npm install
cd mobile-app && npm install
cd ../backend/your-backend && npm install

# 3. Start services
npm run start:all

# 4. Run tests
npm run test:all
```

---

## 🛠️ **Prerequisites**

### **Required Software**
- **Node.js** v18+ (v22.19.0 recommended)
- **npm** (comes with Node.js)
- **Git** for version control
- **Xcode** (for iOS development)
- **CocoaPods** (for iOS dependencies)

### **Recommended Tools**
- **VS Code** with React Native extensions
- **iOS Simulator** (comes with Xcode)
- **Expo CLI** (will be installed during setup)

---

## 🔧 **Environment Setup**

### **Node.js Setup**
```bash
# Install Node.js via nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 22.19.0
nvm use 22.19.0

# Verify installation
node -v  # Should be v22.19.0
npm -v
```

### **CocoaPods Setup (iOS)**
```bash
# Install CocoaPods
sudo gem install cocoapods

# Verify installation
pod --version
```

---

## 🏗️ **Standard Project Structure**

```
your-project/
├── mobile-app/                 # React Native mobile app
│   ├── App.tsx                # Main app component
│   ├── components/            # UI components
│   ├── services/              # API services
│   ├── constants/             # App constants
│   └── assets/                # Images and media
├── backend/your-backend/       # Backend service (Strapi, Express, etc.)
│   ├── src/                   # Backend source code
│   ├── config/                # Backend configuration
│   └── public/                # Backend assets
├── docs/                      # Documentation
├── scripts/                   # Automation scripts
└── package.json               # Root dependencies
```

---

## 🚀 **Running the Project**

### **Start All Services**
```bash
# Start mobile app + backend
npm run start:all

# Or start individually
npm run start:mobile  # Mobile app only
npm run start:backend # Backend only
```

### **Mobile App Development**
```bash
cd mobile-app

# Start Expo development server
npm start

# Start with iOS simulator
npm run ios

# Start with Android emulator
npm run android

# Start with web browser
npm run web
```

### **Backend Development**
```bash
cd backend/your-backend

# Start backend development server
npm run develop

# Build for production
npm run build

# Start production server
npm start
```

---

## 🔑 **API Keys Configuration**

### **Required API Keys Template**
| Service | Status | Required Keys | Purpose |
|---------|--------|---------------|---------|
| **Database** | ⚠️ Needs Setup | `DATABASE_URL`, `DATABASE_KEY` | Data storage |
| **CMS** | ⚠️ Needs Setup | `CMS_URL`, `CMS_KEY` | Content management |
| **Push Notifications** | ⚠️ Needs Setup | `FIREBASE_SERVER_KEY` | Push notifications |
| **SMS** | ⚠️ Needs Setup | `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN` | SMS messaging |
| **File Storage** | ⚠️ Needs Setup | `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` | File storage |

### **Environment Variables Template**
```bash
# Create .env files
touch mobile-app/.env
touch backend/your-backend/.env

# Add to mobile-app/.env
DATABASE_URL=your_database_url
DATABASE_KEY=your_database_key

FIREBASE_SERVER_KEY=your_firebase_server_key
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_APP_ID=your_app_id

TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
S3_BUCKET=your_s3_bucket
```

### **Getting API Keys Template**

#### **Database Setup (Supabase/Firebase)**
1. Go to [Database Console](https://your-database-console.com/)
2. Create or select project
3. Go to Project Settings → API Keys
4. Copy API URL and Key
5. Add to environment variables

#### **File Storage Setup (AWS S3)**
1. Go to [AWS Console](https://console.aws.amazon.com/)
2. Go to IAM → Create User
3. Attach `AmazonS3FullAccess` policy
4. Create Access Key
5. Create S3 bucket for file storage

---

## 🧪 **Testing**

### **Run All Tests**
```bash
# Run complete test suite
npm run test:all

# Run specific test types
npm run test              # Unit tests
npm run test:services     # Service connectivity
npm run test:integration  # Integration tests
npm run test:e2e         # End-to-end tests
```

### **Test Coverage**
```bash
# Generate coverage report
npm run test:coverage

# View coverage in browser
open coverage/lcov-report/index.html
```

---

## 🔧 **Development Workflow**

### **Making Changes**
1. **Create feature branch**: `git checkout -b feature/your-feature`
2. **Make changes**: Edit files in appropriate directories
3. **Test locally**: `npm run test:all`
4. **Commit changes**: `git commit -m "Descriptive message"`
5. **Push and PR**: `git push origin feature/your-feature`

### **File Organization Rules**
- **Mobile app code**: `mobile-app/` directory only
- **Backend code**: `backend/your-backend/` directory only
- **Documentation**: `docs/` directory
- **Scripts**: `scripts/` directory

### **Code Quality**
```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Type check
npm run type-check
```

---

## 🐛 **Troubleshooting**

### **Common Issues**

#### **1. "Command not found: npm"**
```bash
# Set up Node.js path
export PATH="/Users/your-username/.nvm/versions/node/v22.19.0/bin:$PATH"

# Or add to ~/.zshrc
echo 'export PATH="/Users/your-username/.nvm/versions/node/v22.19.0/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

#### **2. "Metro bundler not starting"**
```bash
# Clear all caches
rm -rf node_modules
rm -rf .expo
npm cache clean --force
npm install
npx expo start --clear
```

#### **3. "Database connection failed"**
```bash
# Test database connectivity
curl -s "your_database_url/rest/v1/table?select=id&limit=1" \
  -H "apikey: your_database_key"
```

#### **4. "iOS simulator not opening"**
```bash
# Reset simulator
xcrun simctl erase all

# Reinstall app
npx expo start --ios --clear
```

### **Debug Commands**
```bash
# Check service status
lsof -i :8081 -i :1337

# Run diagnostics
npm run diagnose

# Check logs
tail -f mobile-app/expo.log
```

---

## 📚 **Documentation**

### **Project-Specific Documentation**
- **Setup Guide**: Customize this template for your project
- **Services Documentation**: Document your specific backend services
- **Testing Guide**: Document your specific testing procedures

### **Additional Resources**
- **Expo Documentation**: https://docs.expo.dev/
- **React Native Documentation**: https://reactnative.dev/
- **Backend Documentation**: Link to your backend framework docs

---

## 🎯 **Customization Instructions**

### **To Use This Template:**

1. **Copy this file** to your project's `docs/` directory
2. **Replace placeholders** with your project-specific details:
   - `your-project` → Your actual project name
   - `your-backend` → Your actual backend service name
   - `your-org` → Your actual organization name
   - API keys and URLs → Your actual service configurations

3. **Update the project structure** to match your actual directory layout
4. **Add project-specific sections** as needed
5. **Update troubleshooting** with your specific common issues

### **Placeholders to Replace:**
- `your-project` - Project name
- `your-backend` - Backend service name
- `your-org` - Organization name
- `your-username` - Developer username
- `your_database_url` - Database URL
- `your_database_key` - Database API key
- All service-specific URLs and keys

---

**🎉 This template provides a standardized setup process that can be customized for any React Native + Expo project!**
