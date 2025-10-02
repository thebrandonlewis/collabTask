# CollabTask Strapi Backend 🚀

**Strapi CMS Backend for CollabTask - Shared Task Management for Teams**

## 🎯 **Overview**

This is the Strapi CMS backend for CollabTask, providing:
- **User Authentication** - JWT-based authentication with user management
- **Task List Management** - CRUD operations for task lists
- **Task Management** - CRUD operations for tasks with time estimates
- **Collaboration** - Multi-user access to task lists
- **RESTful API** - Complete API for the React Native frontend

## 🏗️ **Architecture**

### **Content Types**
- **User** - User accounts with authentication (via users-permissions plugin)
- **Task List** - Collections of tasks with owner and collaborators
- **Task** - Individual tasks with time estimates and status tracking

### **API Endpoints**
```
Authentication:
POST /auth/local (login)
POST /auth/local/register (signup)
POST /auth/forgot-password (password reset)
POST /auth/reset-password (password reset confirmation)

Task Lists:
GET /task-lists (get user's task lists)
POST /task-lists (create task list)
GET /task-lists/:id (get specific task list)
PUT /task-lists/:id (update task list)
DELETE /task-lists/:id (delete task list)

Tasks:
GET /tasks?taskList=:id (get tasks for a list)
POST /tasks (create task)
GET /tasks/:id (get specific task)
PUT /tasks/:id (update task)
DELETE /tasks/:id (delete task)
```

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn
- SQLite (development) or PostgreSQL (production)

### **Installation**
```bash
# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Start development server
npm run develop
```

### **Environment Configuration**
```bash
# Database (SQLite for development)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Server
HOST=0.0.0.0
PORT=1337
PUBLIC_URL=http://localhost:1337

# Security (generate your own keys)
APP_KEYS=your_app_key_1,your_app_key_2
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
TRANSFER_TOKEN_SALT=your_transfer_token_salt
JWT_SECRET=your_jwt_secret
```

## 📊 **Data Models**

### **Task List Schema**
```json
{
  "title": "string (required, max 255)",
  "description": "text (optional)",
  "isPublic": "boolean (default: false)",
  "owner": "relation to User (required)",
  "collaborators": "many-to-many relation to User",
  "tasks": "one-to-many relation to Task"
}
```

### **Task Schema**
```json
{
  "title": "string (required, max 255)",
  "description": "text (optional)",
  "estimatedMinutes": "integer (required, min: 1)",
  "status": "enum (pending, in_progress, completed)",
  "dueDate": "datetime (optional)",
  "completedAt": "datetime (optional)",
  "taskList": "relation to Task List (required)",
  "assignedTo": "relation to User (optional)"
}
```

## 🔐 **Authentication & Authorization**

### **JWT Authentication**
- **Token Expiry**: 7 days
- **Token Payload**: User ID, username, email
- **Refresh**: Automatic token refresh on API calls

### **Authorization Rules**
- **Task Lists**: Users can only access lists they own or collaborate on
- **Tasks**: Users can only access tasks in lists they have access to
- **CRUD Operations**: Users can only modify content they have access to

### **API Security**
- **CORS**: Configured for React Native app
- **Rate Limiting**: Built-in Strapi rate limiting
- **Input Validation**: Automatic validation of all inputs
- **SQL Injection Protection**: Built-in protection via Strapi ORM

## 🛠️ **Development**

### **Available Scripts**
```bash
# Development
npm run develop    # Start development server with hot reload

# Production
npm run build      # Build for production
npm run start      # Start production server

# Database
npm run strapi db:seed    # Seed database with sample data
npm run strapi db:reset    # Reset database
```

### **Database Management**
```bash
# Create database
npm run strapi db:create

# Run migrations
npm run strapi db:migrate

# Seed with sample data
npm run strapi db:seed
```

## 📱 **API Integration**

### **React Native Integration**
The backend is designed to work seamlessly with the React Native frontend:

```javascript
// Example API calls from React Native
const apiClient = axios.create({
  baseURL: 'http://localhost:1337/api',
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});

// Get task lists
const taskLists = await apiClient.get('/task-lists');

// Create task
const task = await apiClient.post('/tasks', {
  data: {
    title: 'New Task',
    estimatedMinutes: 30,
    taskList: taskListId,
  },
});
```

### **CORS Configuration**
```javascript
// Configured for React Native development
CORS_ORIGIN=http://localhost:3000,http://localhost:8081
```

## 🔧 **Customization**

### **Adding New Fields**
1. Update the schema in `src/api/[content-type]/content-types/[content-type]/schema.json`
2. Run `npm run strapi build` to rebuild
3. Restart the server

### **Custom Controllers**
All controllers include custom authorization logic:
- **Task Lists**: Users can only access their own lists or lists they collaborate on
- **Tasks**: Users can only access tasks in accessible lists
- **CRUD Operations**: Proper permission checks for all operations

## 📊 **Monitoring & Logs**

### **Logs**
- **Development**: Console logs with detailed information
- **Production**: Structured logging with log levels
- **API Logs**: Request/response logging for debugging

### **Health Checks**
- **Database**: Connection status monitoring
- **API**: Endpoint availability checks
- **Performance**: Response time monitoring

## 🚀 **Deployment**

### **Production Setup**
1. **Database**: Switch to PostgreSQL
2. **Environment**: Set production environment variables
3. **Security**: Generate secure keys and secrets
4. **CORS**: Configure for production domains
5. **SSL**: Enable HTTPS for security

### **Docker Deployment**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 1337
CMD ["npm", "start"]
```

## 🔍 **API Documentation**

### **Authentication Endpoints**
- `POST /auth/local` - User login
- `POST /auth/local/register` - User registration
- `POST /auth/forgot-password` - Password reset request
- `POST /auth/reset-password` - Password reset confirmation

### **Task List Endpoints**
- `GET /task-lists` - Get user's task lists
- `POST /task-lists` - Create new task list
- `GET /task-lists/:id` - Get specific task list
- `PUT /task-lists/:id` - Update task list
- `DELETE /task-lists/:id` - Delete task list

### **Task Endpoints**
- `GET /tasks?taskList=:id` - Get tasks for a list
- `POST /tasks` - Create new task
- `GET /tasks/:id` - Get specific task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

## 🎯 **Next Steps**

1. **Database Setup**: Configure PostgreSQL for production
2. **Authentication**: Test JWT authentication flow
3. **API Testing**: Test all endpoints with Postman/Insomnia
4. **Frontend Integration**: Connect React Native app to backend
5. **Deployment**: Deploy to production hosting

---

**🎯 CollabTask Strapi Backend is ready for development and testing!**
