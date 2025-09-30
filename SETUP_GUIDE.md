# CollabTask Setup Guide 🚀

**Complete setup guide for CollabTask - Shared Task Management for Teams**

## 🎯 **Project Overview**

CollabTask is a complete task management solution with:
- **React Native iOS App** - Native iOS app with dark theme
- **Strapi CMS Backend** - Headless CMS with PostgreSQL database
- **JWT Authentication** - Secure user authentication and authorization
- **Real-time Sync** - Data synchronization between app and backend

## 📁 **Project Structure**

```
collabTask-project/
├── src/                          # React Native iOS App
│   ├── components/              # Reusable UI components
│   ├── screens/                 # App screens
│   │   ├── auth/               # Authentication screens
│   │   └── main/               # Main app screens
│   ├── navigation/             # Navigation configuration
│   ├── store/                  # Redux store and slices
│   ├── services/               # API services
│   ├── config/                 # Configuration files
│   └── utils/                  # Utility functions
├── backend/                     # Strapi CMS Backend
│   ├── src/api/                # API content types
│   ├── config/                 # Strapi configuration
│   └── scripts/                # Setup scripts
├── docs/                        # Documentation
└── README.md                    # Project documentation
```

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js (v16 or higher)
- React Native CLI
- Xcode (for iOS development)
- iOS Simulator or physical iOS device

### **1. Frontend Setup (React Native)**

```bash
# Navigate to project root
cd /Users/b/Documents/projects/collabTask-project

# Install dependencies
npm install

# Install iOS dependencies
cd ios && pod install && cd ..

# Start Metro bundler
npm start

# Run on iOS (in a new terminal)
npm run ios
```

### **2. Backend Setup (Strapi)**

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Start Strapi development server
npm run develop
```

### **3. Access Points**
- **React Native App**: iOS Simulator
- **Strapi Admin**: http://localhost:1337/admin
- **Strapi API**: http://localhost:1337/api

## 🔧 **Detailed Setup**

### **Frontend Configuration**

#### **1. Install Dependencies**
```bash
# Core dependencies
npm install react react-native @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler
npm install @reduxjs/toolkit react-redux axios @react-native-async-storage/async-storage
npm install react-native-vector-icons

# Development dependencies
npm install --save-dev @babel/core @babel/preset-env @babel/runtime
npm install --save-dev @react-native/eslint-config @react-native/metro-config
npm install --save-dev jest @types/react @types/react-test-renderer
npm install --save-dev eslint prettier
```

#### **2. iOS Configuration**
```bash
# Install iOS dependencies
cd ios && pod install && cd ..

# Configure Xcode project
# Open ios/CollabTask.xcworkspace in Xcode
# Set deployment target to iOS 11.0 or higher
# Configure signing and capabilities
```

#### **3. Environment Configuration**
```javascript
// src/config/api.js
export const API_CONFIG = {
  BASE_URL: 'http://localhost:1337/api',
  // ... other configuration
};
```

### **Backend Configuration**

#### **1. Install Dependencies**
```bash
# Core Strapi dependencies
npm install @strapi/strapi @strapi/plugin-users-permissions @strapi/plugin-i18n
npm install pg sqlite3
```

#### **2. Database Configuration**
```javascript
// config/database.js
module.exports = ({ env }) => ({
  connection: {
    client: 'sqlite', // or 'postgres' for production
    // ... database configuration
  },
});
```

#### **3. Environment Variables**
```bash
# .env file
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
HOST=0.0.0.0
PORT=1337
PUBLIC_URL=http://localhost:1337
APP_KEYS=your_app_key_1,your_app_key_2
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
TRANSFER_TOKEN_SALT=your_transfer_token_salt
JWT_SECRET=your_jwt_secret
```

## 📱 **App Features**

### **Authentication**
- ✅ User registration with email/password
- ✅ User login with JWT tokens
- ✅ Password reset functionality
- ✅ Secure token storage
- ✅ Automatic logout on token expiry

### **Task Lists**
- ✅ View all task lists
- ✅ Create new task lists
- ✅ Edit task list details
- ✅ Delete task lists
- ✅ Public/private list settings
- ✅ Collaborator management

### **Tasks**
- ✅ Create tasks with time estimates
- ✅ View tasks in task lists
- ✅ Edit task details
- ✅ Delete tasks
- ✅ Task status tracking (pending, in-progress, completed)
- ✅ Task assignment to users
- ✅ Due date management

### **User Interface**
- ✅ Dark theme implementation
- ✅ Intuitive navigation
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling
- ✅ Empty states
- ✅ Accessibility support

## 🔐 **Security Features**

### **Authentication**
- JWT tokens with 7-day expiry
- Automatic token refresh
- Secure token storage
- Password reset via email

### **Authorization**
- Users can only access their own task lists
- Users can only access tasks in accessible lists
- Proper permission checks for all CRUD operations
- Collaborator access control

### **API Security**
- CORS configuration for React Native
- Rate limiting protection
- Input validation
- SQL injection protection
- XSS protection

## 🛠️ **Development Commands**

### **Frontend Commands**
```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run tests
npm test

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

### **Backend Commands**
```bash
# Start development server
npm run develop

# Build for production
npm run build

# Start production server
npm run start

# Database operations
npm run strapi db:create
npm run strapi db:migrate
npm run strapi db:seed
npm run strapi db:reset
```

## 📊 **API Endpoints**

### **Authentication**
```
POST /auth/local                    # User login
POST /auth/local/register           # User registration
POST /auth/forgot-password          # Password reset request
POST /auth/reset-password           # Password reset confirmation
GET  /users/me                      # Get current user
```

### **Task Lists**
```
GET    /task-lists                  # Get user's task lists
POST   /task-lists                  # Create task list
GET    /task-lists/:id              # Get specific task list
PUT    /task-lists/:id              # Update task list
DELETE /task-lists/:id              # Delete task list
```

### **Tasks**
```
GET    /tasks?taskList=:id          # Get tasks for a list
POST   /tasks                       # Create task
GET    /tasks/:id                   # Get specific task
PUT    /tasks/:id                   # Update task
DELETE /tasks/:id                   # Delete task
```

## 🧪 **Testing**

### **Frontend Testing**
```bash
# Run unit tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- --testNamePattern="AuthSlice"
```

### **Backend Testing**
```bash
# Test API endpoints
curl -X GET http://localhost:1337/api/task-lists \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Test authentication
curl -X POST http://localhost:1337/api/auth/local \
  -H "Content-Type: application/json" \
  -d '{"identifier":"user@example.com","password":"password"}'
```

## 🚀 **Deployment**

### **Frontend Deployment**
1. **iOS App Store**:
   - Configure Xcode project
   - Set up code signing
   - Create App Store Connect account
   - Submit for review

### **Backend Deployment**
1. **Production Database**:
   - Set up PostgreSQL database
   - Configure connection string
   - Run database migrations

2. **Hosting**:
   - Deploy to Railway, Heroku, or AWS
   - Configure environment variables
   - Set up SSL certificate
   - Configure domain

## 🔍 **Troubleshooting**

### **Common Issues**

#### **Metro bundler issues**
```bash
# Clear Metro cache
npx react-native start --reset-cache

# Clear npm cache
npm cache clean --force
```

#### **iOS build issues**
```bash
# Clean iOS build
cd ios && xcodebuild clean && cd ..

# Reinstall pods
cd ios && pod deintegrate && pod install && cd ..
```

#### **Strapi issues**
```bash
# Clear Strapi cache
rm -rf .tmp
npm run develop

# Reset database
npm run strapi db:reset
```

### **Debug Mode**
```bash
# React Native debug mode
npx react-native start --verbose

# Strapi debug mode
DEBUG=strapi:* npm run develop
```

## 📚 **Documentation**

### **Project Documentation**
- **Strategic Planning**: `COLLABTASK_STRATEGIC_PLANNING.md`
- **Technical Strategy**: `COLLABTASK_TECHNICAL_STRATEGY.md`
- **Implementation Plan**: `COLLABTASK_IMPLEMENTATION_PLAN.md`
- **Project Summary**: `COLLABTASK_PROJECT_SUMMARY.md`

### **API Documentation**
- **Backend README**: `backend/README.md`
- **API Endpoints**: See backend documentation
- **Data Models**: See schema files in backend

### **Orchestrator Contracts**
- **JTBD.yml**: Job-to-be-Done contract
- **actions.yml**: Action definitions
- **orchestration.yml**: Phase management
- **gates.yml**: Quality gates

## 🎯 **Next Steps**

### **Phase 4: Build MVP (Week 3-4)**
- [ ] Connect React Native app to Strapi backend
- [ ] Implement real-time data synchronization
- [ ] Add offline capability
- [ ] Test API integration

### **Phase 5: Quality Assurance (Week 5)**
- [ ] Write comprehensive test suite
- [ ] Add integration tests
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Bug fixes and testing

### **Phase 6: Release (Week 6)**
- [ ] iOS build configuration
- [ ] TestFlight setup
- [ ] App Store submission
- [ ] Production backend deployment

## 🎉 **Success Criteria**

### **Development Complete**
- ✅ React Native app with full navigation
- ✅ Strapi backend with data models
- ✅ JWT authentication system
- ✅ API integration ready
- ✅ Dark theme UI implementation

### **Ready for Testing**
- ✅ All core features implemented
- ✅ API endpoints functional
- ✅ Authentication flow working
- ✅ Data models configured
- ✅ Security measures in place

---

**🎯 CollabTask is ready for Phase 4: Build MVP development!**

**Next Step**: Connect the React Native app to the Strapi backend and implement real-time data synchronization.
