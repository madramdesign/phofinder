# 🚀 Quick Start Guide

## ✅ What's Already Done

- ✅ Project dependencies installed
- ✅ Firebase CLI detected
- ✅ Project structure created
- ✅ Database schema defined
- ✅ All pages and components built

## 🔥 Firebase Setup (Required - 5 minutes)

You need to set up Firebase to use the app. Here's the fastest way:

### Step 1: Create Firebase Project
1. Visit: https://console.firebase.google.com/
2. Click "Add project"
3. Name it: `phofinder`
4. Continue through the wizard

### Step 2: Enable Services
1. **Firestore Database:**
   - Go to "Build" → "Firestore Database"
   - Click "Create database"
   - Start in **test mode**
   - Choose location → Enable

2. **Authentication:**
   - Go to "Build" → "Authentication"
   - Click "Get started"
   - Go to "Sign-in method" tab
   - Enable "Anonymous" → Save

### Step 3: Get Your Config
1. Go to Project Settings (⚙️ icon)
2. Scroll to "Your apps"
3. Click web icon `</>`
4. Register app: "PhoFinder"
5. Copy the config values

### Step 4: Create .env.local
Create `.env.local` in the project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=paste-your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=paste-your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=paste-your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=paste-your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=paste-your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=paste-your-app-id
```

### Step 5: Initialize & Deploy
```bash
firebase login
firebase use --add  # Select your project
firebase deploy --only firestore:rules,firestore:indexes
```

### Step 6: Run the App!
```bash
npm run dev
```

Open http://localhost:3000 🎉

---

**Need help?** See `setup.md` for detailed instructions.
