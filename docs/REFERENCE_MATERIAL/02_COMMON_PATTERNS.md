# Common Patterns Reference 📚

**Quick reference for frequently used development patterns**

## 🎯 Project Structure Patterns

### **React Native/Expo**
```
project/
├── components/     # Reusable UI components
├── screens/        # Screen components
├── services/       # API and external services
├── utils/          # Helper functions
├── constants/      # App constants
└── assets/         # Images, fonts, etc.
```

### **Authentication Patterns**
- **Token Storage**: Secure storage for auth tokens
- **Session Management**: Automatic token refresh
- **Route Protection**: Guarded routes for authenticated users

## 🔧 Code Patterns

### **API Service Pattern**
```javascript
class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  
  async request(endpoint, options = {}) {
    // Standard request handling
  }
}
```

### **Error Handling Pattern**
```javascript
try {
  const result = await riskyOperation();
  return { success: true, data: result };
} catch (error) {
  return { success: false, error: error.message };
}
```

## 📱 UI Patterns

### **Loading States**
- **Skeleton screens** for initial load
- **Spinner indicators** for actions
- **Progress bars** for long operations

### **Error States**
- **Inline error messages** for form validation
- **Toast notifications** for system messages
- **Error boundaries** for component crashes

## 🔗 Integration Patterns

### **Third-party Services**
- **Supabase**: Database and auth
- **Strapi**: Content management
- **Firebase**: Push notifications
- **Twilio**: SMS messaging

---

**📚 This reference covers the most common patterns you'll use across projects**
