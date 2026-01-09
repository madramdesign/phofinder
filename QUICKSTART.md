# 🚀 PhoFinder Quick Start

## ✅ What's Already Set Up

- ✅ All dependencies installed
- ✅ Project structure created
- ✅ Firebase configuration files ready
- ✅ `.env.local` template created
- ✅ Setup scripts created

## 🎯 Next Steps (5 minutes)

### Step 1: Create or Select Firebase Project

**Option A: Create New Project**
1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Name it "phofinder" (or any name you like)
4. Enable Google Analytics (optional)
5. Click "Create project"

**Option B: Use Existing Project**
- You have 4 existing projects. Pick one or create new.

### Step 2: Enable Firebase Services

In your Firebase project:

1. **Enable Firestore:**
   - Go to "Firestore Database" in left menu
   - Click "Create database"
   - Start in **production mode**
   - Choose a location (us-central1 recommended)
   - Click "Enable"

2. **Enable Authentication:**
   - Go to "Authentication" in left menu
   - Click "Get started"
   - Go to "Sign-in method" tab
   - Enable "Anonymous" provider
   - Click "Save"

### Step 3: Get Firebase Config

1. In Firebase Console, click the gear icon ⚙️ > "Project settings"
2. Scroll to "Your apps" section
3. Click the web icon `</>` (Add app)
4. Register app name: "PhoFinder"
5. Copy the `firebaseConfig` values

### Step 4: Update .env.local

Open `.env.local` and replace the placeholder values with your actual Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza... (from config)
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

### Step 5: Initialize Firebase CLI

Run the initialization script:

```bash
./init-firebase.sh
```

Or manually:
```bash
firebase init
# Select: Firestore, Hosting
# Use existing project: [select your project]
# Firestore rules: firestore.rules (already exists)
# Firestore indexes: firestore.indexes.json (already exists)
# Public directory: out
# Single-page app: Yes
```

### Step 6: Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules,firestore:indexes
```

### Step 7: Start Development Server

```bash
npm run dev
```

Visit **http://localhost:3000** 🎉

## 🧪 Test Your Setup

1. Go to http://localhost:3000
2. Click "Submit Restaurant"
3. Fill out the form and submit
4. You should see your restaurant appear!

## 📦 Deploy to Production

When ready to deploy:

```bash
npm run build
firebase deploy
```

Your app will be live at: `https://your-project-id.web.app`

## 🆘 Troubleshooting

**"Firebase: Error (auth/configuration-not-found)"**
- Make sure `.env.local` has correct values
- Restart dev server after updating `.env.local`

**"Permission denied" errors**
- Run: `firebase deploy --only firestore:rules,firestore:indexes`
- Check that Anonymous Auth is enabled

**Build errors**
- Make sure all env variables start with `NEXT_PUBLIC_`
- Delete `.next` folder and try again: `rm -rf .next && npm run dev`

## 📚 More Help

See `SETUP.md` for detailed instructions.
