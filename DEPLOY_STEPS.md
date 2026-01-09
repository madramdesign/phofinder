# 🚀 Quick Deployment Steps to Vercel

## Your Firebase Environment Variables

Copy these exact values from `VERCEL_ENV_VARS.txt`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAFprLpxNB9TzvB1sZWGQCEGt_XDwj76eg
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=pho-finder-5175f.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=pho-finder-5175f
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=pho-finder-5175f.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1035496743136
NEXT_PUBLIC_FIREBASE_APP_ID=1:1035496743136:web:2607dfcba507001e8db085
```

## Step-by-Step Deployment

1. **Go to Vercel**: https://vercel.com/new

2. **Sign In/Sign Up**:
   - Click "Sign Up" or "Login"
   - Click "Continue with GitHub"
   - Authorize Vercel to access GitHub

3. **Import Repository**:
   - After signing in, you'll be redirected to project creation
   - Click "Import Git Repository"
   - Select: `madramdesign/phofinder`
   - Click "Import"

4. **Configure Project** (auto-detected):
   - ✅ Framework: Next.js
   - ✅ Root Directory: `./`
   - ✅ Build Command: `npm run build`
   - ✅ Output Directory: `.next`

5. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add these 6 variables one by one (copy from above):
     - Name: `NEXT_PUBLIC_FIREBASE_API_KEY`, Value: `AIzaSyAFprLpxNB9TzvB1sZWGQCEGt_XDwj76eg`
     - Name: `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, Value: `pho-finder-5175f.firebaseapp.com`
     - Name: `NEXT_PUBLIC_FIREBASE_PROJECT_ID`, Value: `pho-finder-5175f`
     - Name: `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`, Value: `pho-finder-5175f.firebasestorage.app`
     - Name: `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`, Value: `1035496743136`
     - Name: `NEXT_PUBLIC_FIREBASE_APP_ID`, Value: `1:1035496743136:web:2607dfcba507001e8db085`

6. **Deploy**:
   - Click "Deploy" button
   - Wait 2-3 minutes for build
   - ✅ Your app will be live!

## After Deployment

Your app will be at: `https://phofinder-[hash].vercel.app`

Share with friends:
- **Submit Page**: `https://your-app.vercel.app/submit`
- **Home Page**: `https://your-app.vercel.app`
- **New Jersey**: `https://your-app.vercel.app/state/New%20Jersey`

## Monitor Submissions

Watch restaurants appear in real-time:
https://console.firebase.google.com/project/pho-finder-5175f/firestore/data
