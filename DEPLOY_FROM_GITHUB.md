# 🚀 Deploy PhoFinder from GitHub - Step by Step

Your code is now on GitHub: **https://github.com/madramdesign/phofinder**

## Deploy to Vercel (5 minutes)

### Step 1: Go to Vercel
👉 **https://vercel.com/new**

### Step 2: Sign In
- Click **"Continue with GitHub"**
- Authorize Vercel to access your GitHub account

### Step 3: Import Repository
- Click **"Import Git Repository"**
- Find and select: **`madramdesign/phofinder`**
- Click **"Import"**

### Step 4: Configure Project
- **Project Name**: `phofinder` (or leave default)
- **Framework Preset**: Should auto-detect "Next.js"
- **Root Directory**: `./` (leave default)
- **Build Command**: `npm run build` (auto-filled)
- **Output Directory**: `.next` (auto-filled)
- **Install Command**: `npm install` (auto-filled)

### Step 5: Add Environment Variables
Click **"Environment Variables"** and add these 6 variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY
your-api-key-here

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
your-project-id.firebaseapp.com

NEXT_PUBLIC_FIREBASE_PROJECT_ID
your-project-id

NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
your-project-id.firebasestorage.app

NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
your-sender-id

NEXT_PUBLIC_FIREBASE_APP_ID
your-app-id
```

### Step 6: Deploy!
- Click **"Deploy"**
- Wait 2-3 minutes for build to complete
- ✅ **Done!** Your app will be live at: `https://phofinder-xxxxx.vercel.app`

---

## After Deployment

### Share These URLs:

**🏠 Home Page**: `https://your-app.vercel.app`  
**➕ Submit Restaurant**: `https://your-app.vercel.app/submit`  
**🗺️ New Jersey**: `https://your-app.vercel.app/state/New%20Jersey`  
**📍 Any State**: `https://your-app.vercel.app/state/[StateName]`

### Monitor Submissions:
**Firebase Console**: https://console.firebase.google.com/project/YOUR_PROJECT_ID/firestore/data

Watch restaurants and reviews appear in real-time!

---

## Future Updates

When you make changes:
1. Commit changes: `git add . && git commit -m "Update" && git push`
2. Vercel will automatically redeploy (if you enabled auto-deploy)

---

## Custom Domain (Optional)

1. Go to your Vercel project dashboard
2. Click **Settings** → **Domains**
3. Add your custom domain (e.g., `phofinder.com`)
4. Follow DNS instructions

---

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Firebase Console**: https://console.firebase.google.com/project/YOUR_PROJECT_ID
