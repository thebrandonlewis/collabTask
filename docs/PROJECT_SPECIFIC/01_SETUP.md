# Project Setup Guide

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ and npm
- React Native development environment
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### **Environment Variables**

Create a `.env` file in your project root:

```bash
# Database
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

# Firebase (Optional)
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

TWILIO_ACCOUNT_SID=AC[YOUR_TWILIO_ACCOUNT_SID]
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+15392812446

AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your_bucket_name

# Development
NODE_ENV=development
PORT=1337
```

## 📱 **Frontend Setup**

### **Install Dependencies**
```bash
npm install
```

### **iOS Setup**
```bash
cd ios && pod install && cd ..
```

### **Run Development Server**
```bash
# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## 🗄️ **Backend Setup**

### **Install Dependencies**
```bash
cd backend && npm install
```

### **Database Setup**
```bash
# Create database
npm run strapi db:create

# Run migrations
npm run strapi db:migrate
```

### **Start Backend Server**
```bash
npm run develop
```

## 🔧 **Configuration**

### **Database Configuration**
Update `backend/config/database.js` with your database settings.

### **Authentication Setup**
Configure JWT settings in `backend/config/plugins.js`.

### **API Endpoints**
- Authentication: `/api/auth`
- Task Lists: `/api/task-lists`
- Tasks: `/api/tasks`

## 🚀 **Deployment**

### **Frontend Deployment**
- iOS: Build and upload to App Store Connect
- Android: Build and upload to Google Play Console

### **Backend Deployment**
- Deploy to your preferred hosting platform
- Configure environment variables
- Set up database
- Configure domain and SSL

## 📚 **Documentation**

- [Authentication Guide](./03_AUTHENTICATION_SETUP_GUIDE.md)
- [Testing Guide](./04_TESTING.md)
- [Project Roadmap](./05_ROADMAP.md)