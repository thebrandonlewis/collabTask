# Step 2: Add Login System to Your App 🔐

**Add user login to your mobile app in 15 minutes**

---

## 🎯 **What You'll Build**

By the end of this step, you'll have:
- ✅ **Login screen** where users can sign in
- ✅ **Sign-up screen** where users can create accounts
- ✅ **Secure authentication** system
- ✅ **User profiles** and data storage

**Time needed: 15 minutes**

---

## 📋 **What You Need**

Make sure you have:
- [ ] **Completed Step 1** - Your app is running
- [ ] **Internet connection** - For authentication service
- [ ] **15 minutes** of focused time

**That's it!** We'll use a service that handles all the complex stuff.

---

## 🚀 **Let's Add Login**

### **Step 1: Set Up Authentication Service** 🖐️
*Time: 5 minutes - **YOU MUST DO THIS MANUALLY***

1. **Go to** [supabase.com](https://supabase.com)
2. **Create free account** - Click "Start your project"
3. **Create new project** - Give it any name you want
4. **Copy your project URL** - You'll need this in a minute

**What this does**: Gives you a secure authentication service for free

**Why manual**: Requires creating accounts and copying sensitive API keys

### **Step 2: Add Login to Your App** 🤖
*Time: 5 minutes - **CURSOR CAN AUTOMATE THIS***

**Option A: Manual Code Addition**
1. **Open your project** in your code editor
2. **Add this code** to your main app file:
   ```javascript
   import { createClient } from '@supabase/supabase-js'
   
   const supabaseUrl = 'YOUR_PROJECT_URL'
   const supabaseKey = 'YOUR_PROJECT_KEY'
   
   const supabase = createClient(supabaseUrl, supabaseKey)
   ```

3. **Replace** `YOUR_PROJECT_URL` with your Supabase URL
4. **Replace** `YOUR_PROJECT_KEY` with your Supabase key

**Option B: Cursor Automation**
Use this prompt in Cursor:
```
**Context**: Adding authentication system to existing project
**Project Details**:
- Project Name: MyFirstApp
- Auth Providers: Phone OTP (SMS verification)
- Backend API: Supabase
- Database: PostgreSQL (Supabase managed)

**Requirements**:
- Implement secure authentication flow
- Create login/signup screens
- Set up token management
- Add user session handling

**Deliverables**:
- Complete authentication screens (React Native)
- Backend API integration with Supabase
- Secure token storage implementation
- User state management system
```

**What this does**: Connects your app to the authentication service

**Replace the project details with your actual Supabase URL and key**

### **Step 3: Create Login Screen**
*Time: 5 minutes*

1. **Add this code** for the login screen:
   ```javascript
   const LoginScreen = () => {
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
   
     const handleLogin = async () => {
       const { user, error } = await supabase.auth.signIn({
         email: email,
         password: password,
       })
       if (error) alert('Login failed')
       else alert('Login successful!')
     }
   
     return (
       <View>
         <TextInput 
           placeholder="Email" 
           value={email}
           onChangeText={setEmail}
         />
         <TextInput 
           placeholder="Password" 
           value={password}
           onChangeText={setPassword}
           secureTextEntry
         />
         <Button title="Login" onPress={handleLogin} />
       </View>
     )
   }
   ```

2. **Test the login** - Try logging in with test credentials

**What this does**: Creates a working login interface

---

## 🎉 **Success!**

You now have:
- ✅ **Working login system** in your app
- ✅ **Secure authentication** with Supabase
- ✅ **User accounts** and data storage
- ✅ **Professional authentication** system

---

## 🚀 **What's Next?**

### **Ready for Complete Guides?**
👉 **[Complete Guides →](../HOW_TO_DO_THINGS/00_README.md)**

*Learn to build complete applications with advanced features*

### **Want to Add More Features?**
👉 **[Add Features →](../HOW_TO_DO_THINGS/02_ADD_FEATURES.md)**

*Add chat, payments, notifications, and more*

### **Need Help?**
👉 **[Fix Problems →](../REFERENCE_MATERIAL/03_TROUBLESHOOTING.md)**

*Solutions for authentication issues*

---

## 💡 **What You Just Learned**

### **Authentication Basics**
- **How to set up** secure user login
- **How to integrate** third-party services
- **How to handle** user data securely
- **How to create** professional login flows

### **Development Skills**
- **How to connect** to external services
- **How to handle** user input and forms
- **How to manage** app state and data
- **How to test** authentication flows

---

## 🔧 **Customize Your Login**

### **Make It Beautiful**
- **Add colors** and styling to match your app
- **Include logos** and branding
- **Add animations** and smooth transitions
- **Create custom** button and input designs

### **Add More Features**
- **Forgot password** functionality
- **Social login** with Google and Apple
- **User profiles** and settings
- **Data synchronization** across devices

---

**🎯 Excellent work! You've built a complete authentication system. Ready to learn more?**
