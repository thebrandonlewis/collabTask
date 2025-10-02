# Universal Setup Template

## 🚀 **Project Initialization**

### **Prerequisites**
- Node.js 18+ and npm
- Git for version control
- Code editor (VS Code recommended)

### **Environment Setup**

Create a `.env` file in your project root:

```bash
# Database Configuration
DATABASE_URL=your_database_url
DATABASE_CLIENT=postgres

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# API Configuration
API_URL=http://localhost:1337
API_TIMEOUT=10000

# Email Configuration
EMAIL_FROM=noreply@yourdomain.com
EMAIL_REPLY_TO=support@yourdomain.com

# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# Twilio Configuration
TWILIO_ACCOUNT_SID=AC[YOUR_TWILIO_ACCOUNT_SID]
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+15392812446

# AWS Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your_bucket_name

# Development
NODE_ENV=development
PORT=1337
```

## 📱 **Frontend Setup**

### **React Native Project**
```bash
# Initialize project
npx react-native init ProjectName

# Install dependencies
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install @reduxjs/toolkit react-redux
npm install axios
npm install @react-native-async-storage/async-storage
npm install @react-native-community/netinfo

# iOS setup
cd ios && pod install && cd ..
```

### **Dependencies**
```json
{
  "dependencies": {
    "@react-navigation/native": "^6.0.0",
    "@react-navigation/stack": "^6.0.0",
    "@reduxjs/toolkit": "^1.9.0",
    "react-redux": "^8.0.0",
    "axios": "^1.4.0",
    "@react-native-async-storage/async-storage": "^1.19.0",
    "@react-native-community/netinfo": "^9.0.0"
  }
}
```

## 🗄️ **Backend Setup**

### **Strapi CMS**
```bash
# Create Strapi project
npx create-strapi-app@latest backend --quickstart

# Install additional plugins
npm install @strapi/plugin-users-permissions
npm install @strapi/provider-upload-aws-s3
```

### **Database Configuration**
```javascript
// backend/config/database.js
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'collabtask'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', 'password'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
```

## 🔧 **Configuration Files**

### **API Configuration**
```javascript
// src/config/api.js
export const API_CONFIG = {
  BASE_URL: process.env.API_URL || 'http://localhost:1337',
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
  },
  AUTH: {
    LOGIN: '/api/auth/local',
    REGISTER: '/api/auth/local/register',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
  },
  TASK_LISTS: '/api/task-lists',
  TASKS: '/api/tasks',
};
```

### **Redux Store**
```javascript
// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import taskListsSlice from './slices/taskListsSlice';
import tasksSlice from './slices/tasksSlice';
import uiSlice from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    taskLists: taskListsSlice,
    tasks: tasksSlice,
    ui: uiSlice,
  },
});
```

## 🚀 **Development Workflow**

### **Start Development Servers**
```bash
# Terminal 1: Backend
cd backend && npm run develop

# Terminal 2: Frontend
npm start

# Terminal 3: iOS Simulator
npm run ios

# Terminal 4: Android Emulator
npm run android
```

### **Code Quality**
```bash
# Linting
npm run lint

# Formatting
npm run format

# Type checking
npm run type-check
```

## 📦 **Build and Deployment**

### **Frontend Build**
```bash
# iOS build
npm run build:ios

# Android build
npm run build:android
```

### **Backend Build**
```bash
# Production build
npm run build

# Start production server
npm start
```

## 🔒 **Security Best Practices**

### **Environment Variables**
- Never commit `.env` files
- Use `.env.example` for documentation
- Rotate secrets regularly
- Use different secrets for different environments

### **API Security**
```javascript
// CORS configuration
module.exports = {
  origin: ['http://localhost:3000', 'https://yourdomain.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  headers: ['Content-Type', 'Authorization'],
};
```

### **Authentication**
```javascript
// JWT configuration
module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '7d',
  },
};
```

## 📊 **Monitoring and Analytics**

### **Error Tracking**
```javascript
// Sentry configuration
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  environment: process.env.NODE_ENV,
});
```

### **Analytics**
```javascript
// Google Analytics
import analytics from '@react-native-firebase/analytics';

analytics().logEvent('user_action', {
  action: 'button_click',
  screen: 'home',
});
```

## 🔄 **Data Synchronization**

### **Offline Support**
```javascript
// AsyncStorage for offline data
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageService = {
  async save(key, data) {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  },
  
  async load(key) {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },
};
```

### **Network Status**
```javascript
// Network monitoring
import NetInfo from '@react-native-community/netinfo';

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    
    return unsubscribe;
  }, []);
  
  return isConnected;
};
```

## 📱 **Platform-Specific Setup**

### **iOS Configuration**
```xml
<!-- ios/CollabTask/Info.plist -->
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>
```

### **Android Configuration**
```xml
<!-- android/app/src/main/AndroidManifest.xml -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

## 🧪 **Testing Setup**

### **Unit Tests**
```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react-native

# Run tests
npm test
```

### **E2E Tests**
```bash
# Install Detox
npm install --save-dev detox

# Run E2E tests
npm run e2e:ios
npm run e2e:android
```

## 📚 **Documentation**

### **API Documentation**
- Use Swagger/OpenAPI for API documentation
- Document all endpoints with examples
- Include authentication requirements

### **Code Documentation**
- Use JSDoc for function documentation
- Include README files for each module
- Document configuration options

## 🔧 **Troubleshooting**

### **Common Issues**
1. **Metro bundler issues**: Clear cache with `npx react-native start --reset-cache`
2. **iOS build issues**: Clean and rebuild with `cd ios && xcodebuild clean`
3. **Android build issues**: Clean gradle with `cd android && ./gradlew clean`

### **Debug Tools**
- React Native Debugger
- Flipper for debugging
- Chrome DevTools for web debugging