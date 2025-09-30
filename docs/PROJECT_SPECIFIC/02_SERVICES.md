# Services Integration Guide

## 🔧 **Service Configuration**

### **Database Services**

#### **PostgreSQL**
```bash
# Environment variables
DATABASE_URL=postgresql://username:password@localhost:5432/collabtask
DATABASE_CLIENT=postgres
```

#### **SQLite (Development)**
```bash
# Environment variables
DATABASE_URL=sqlite://./data.db
DATABASE_CLIENT=sqlite
```

### **Authentication Services**

#### **JWT Configuration**
```bash
# JWT settings
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
```

#### **OAuth Providers**
```bash
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Facebook OAuth
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
```

### **Email Services**

#### **SendGrid**
```bash
# SendGrid configuration
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=noreply@yourdomain.com
EMAIL_REPLY_TO=support@yourdomain.com
```

#### **SMTP Configuration**
```bash
# SMTP settings
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

### **File Storage Services**

#### **AWS S3**
```bash
# AWS S3 configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your_bucket_name
```

#### **Cloudinary**
```bash
# Cloudinary configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### **Push Notification Services**

#### **Firebase Cloud Messaging**
```bash
# Firebase configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

#### **Expo Push Notifications**
```bash
# Expo configuration
EXPO_ACCESS_TOKEN=your_expo_access_token
```

### **SMS Services**

#### **Twilio**
```bash
# Environment variables
TWILIO_ACCOUNT_SID=AC[YOUR_TWILIO_ACCOUNT_SID]
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+15392812446
```

### **Analytics Services**

#### **Google Analytics**
```bash
# Google Analytics
GA_TRACKING_ID=GA-XXXXXXXXX-X
```

#### **Mixpanel**
```bash
# Mixpanel configuration
MIXPANEL_TOKEN=your_mixpanel_token
```

## 🔌 **Service Integration**

### **Frontend Integration**

#### **API Service Configuration**
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

#### **Authentication Service**
```javascript
// src/services/authService.js
import { API_CONFIG } from '../config/api';

export const authService = {
  async login(identifier, password) {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.AUTH.LOGIN}`, {
      method: 'POST',
      headers: API_CONFIG.HEADERS,
      body: JSON.stringify({ identifier, password }),
    });
    return response.json();
  },
  // ... other auth methods
};
```

### **Backend Integration**

#### **Strapi Plugin Configuration**
```javascript
// backend/config/plugins.js
module.exports = {
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
    },
  },
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
        params: {
          Bucket: process.env.AWS_S3_BUCKET,
        },
      },
    },
  },
};
```

## 🚀 **Deployment Configuration**

### **Environment Variables**
Create environment-specific configuration files:

#### **Development (.env.development)**
```bash
NODE_ENV=development
API_URL=http://localhost:1337
DATABASE_URL=sqlite://./data.db
```

#### **Production (.env.production)**
```bash
NODE_ENV=production
API_URL=https://api.yourdomain.com
DATABASE_URL=postgresql://user:pass@host:5432/db
```

### **Docker Configuration**
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 1337

CMD ["npm", "start"]
```

## 📊 **Monitoring and Logging**

### **Application Monitoring**
- **Sentry**: Error tracking and performance monitoring
- **New Relic**: Application performance monitoring
- **LogRocket**: User session replay and debugging

### **Logging Configuration**
```javascript
// backend/config/logger.js
module.exports = {
  level: process.env.LOG_LEVEL || 'info',
  format: 'json',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
};
```

## 🔒 **Security Configuration**

### **CORS Configuration**
```javascript
// backend/config/middlewares.js
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

### **Rate Limiting**
```javascript
// backend/config/rate-limit.js
module.exports = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
};
```

## 📱 **Mobile App Configuration**

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

## 🔄 **Data Synchronization**

### **Offline Support**
```javascript
// src/services/syncService.js
export const syncService = {
  async syncPendingChanges() {
    const pendingChanges = await AsyncStorage.getItem('pendingChanges');
    if (pendingChanges) {
      // Sync with backend
      await this.uploadPendingChanges(JSON.parse(pendingChanges));
    }
  },
  
  async queueChange(change) {
    const pendingChanges = await AsyncStorage.getItem('pendingChanges') || '[]';
    const changes = JSON.parse(pendingChanges);
    changes.push(change);
    await AsyncStorage.setItem('pendingChanges', JSON.stringify(changes));
  },
};
```

### **Real-time Updates**
```javascript
// src/services/websocketService.js
export const websocketService = {
  connect() {
    this.socket = io(API_CONFIG.BASE_URL);
    this.socket.on('taskUpdated', (task) => {
      // Update local state
      store.dispatch(updateTask(task));
    });
  },
  
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  },
};
```