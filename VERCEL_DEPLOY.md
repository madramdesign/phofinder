# 🚀 Quick Vercel Deployment Guide

## Your Environment Variables

Copy these from your `.env.local` file and add them to Vercel:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAFprLpxNB9TzvB1sZWGQCEGt_XDwj76eg
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=pho-finder-5175f.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=pho-finder-5175f
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=pho-finder-5175f.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1035496743136
NEXT_PUBLIC_FIREBASE_APP_ID=1:1035496743136:web:2607dfcba507001e8db085
```

## Steps to Deploy

1. **Sign in with GitHub** (click the GitHub button on the Vercel page)
2. **Import Repository**: Select `madramdesign/phofinder`
3. **Configure Project** (auto-detected):
   - Framework: Next.js ✅
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. **Add Environment Variables** (click "Environment Variables"):
   - Add all 6 variables above
5. **Deploy!** Click "Deploy"
6. **Wait 2-3 minutes** for build
7. **Done!** Your app will be live

## After Deployment

Your app will be at: `https://phofinder-[hash].vercel.app`

Share these URLs:
- **Submit**: `https://your-app.vercel.app/submit`
- **Browse**: `https://your-app.vercel.app`
- **States**: `https://your-app.vercel.app/state/[StateName]`
