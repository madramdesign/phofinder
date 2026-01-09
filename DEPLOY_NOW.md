# Quick Deployment Guide - RIGHT NOW! 🚀

## Option 1: Deploy via Vercel Web Interface (FASTEST - 5 minutes)

### Step 1: Push to GitHub (if not already)
```bash
git init
git add .
git commit -m "PhoFinder ready to deploy"
git branch -M main
# Create a repo on GitHub.com, then:
git remote add origin https://github.com/YOUR_USERNAME/phofinder.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. **Go to**: https://vercel.com/new
2. **Sign in** with GitHub (click "Continue with GitHub")
3. **Click "Import"** your repository
4. **Project Name**: `phofinder` (or any name)
5. **Framework Preset**: Next.js (auto-detected)
6. **Root Directory**: `./` (leave default)
7. **Build Command**: `npm run build` (auto-filled)
8. **Output Directory**: `.next` (auto-filled)

### Step 3: Add Environment Variables
Click "Environment Variables" and add these 6 variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSyAFprLpxNB9TzvB1sZWGQCEGt_XDwj76eg
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = pho-finder-5175f.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID = pho-finder-5175f
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = pho-finder-5175f.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 1035496743136
NEXT_PUBLIC_FIREBASE_APP_ID = 1:1035496743136:web:2607dfcba507001e8db085
```

### Step 4: Deploy!
- Click **"Deploy"**
- Wait 2-3 minutes
- ✅ **Done!** Your app will be live at: `https://phofinder-xxxxx.vercel.app`

---

## Option 2: Use Vercel CLI (if you prefer command line)

```bash
# Login to Vercel
vercel login

# Deploy (it will prompt for environment variables)
vercel --prod
```

---

## After Deployment - Share These URLs:

**Home Page**: `https://your-app.vercel.app`  
**Submit Restaurant**: `https://your-app.vercel.app/submit`  
**New Jersey**: `https://your-app.vercel.app/state/New%20Jersey`  

All submissions go directly to your Firebase Firestore database!

---

## Monitor Submissions

**Firebase Console**: https://console.firebase.google.com/project/pho-finder-5175f/firestore/data

Watch restaurants and reviews appear in real-time!
