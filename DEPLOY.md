# Deployment Guide - PhoFinder

You have two great options for hosting PhoFinder so friends and family can help fill the database:

## Option 1: Vercel (Recommended - Easiest) ⭐

Vercel is made by the creators of Next.js and offers the easiest deployment.

### Steps:

1. **Push your code to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to https://vercel.com
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js
   - Add environment variables (copy from `.env.local`):
     - `NEXT_PUBLIC_FIREBASE_API_KEY`
     - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
     - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
     - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
     - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
     - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - Click "Deploy"
   - Your app will be live at: `https://phofinder.vercel.app` (or custom domain)

**Benefits:**
- ✅ Free tier (perfect for sharing)
- ✅ Automatic deployments on git push
- ✅ Custom domain support
- ✅ Perfect Next.js support
- ✅ HTTPS included
- ✅ Fast global CDN

---

## Option 2: Firebase Hosting

Firebase Hosting requires static export. Since your app uses dynamic routes with client-side data fetching, we'll need to configure it properly.

### Steps:

1. **Update Next.js config for static export**:
   ```bash
   # Already configured in next.config.js
   ```

2. **Build the app**:
   ```bash
   npm run build
   ```

3. **Deploy to Firebase Hosting**:
   ```bash
   firebase deploy --only hosting
   ```

4. **Your app will be live at**:
   `https://your-project-id.web.app`

**Note:** Firebase Hosting with Next.js can be tricky with dynamic routes. If you encounter issues, use Option 1 (Vercel) instead.

---

## Option 3: Netlify (Alternative)

Similar to Vercel, Netlify offers easy Next.js deployment.

1. Go to https://netlify.com
2. Sign up/login with GitHub
3. Click "New site from Git"
4. Connect your repository
5. Add environment variables
6. Deploy

---

## Quick Deploy Script

I've created a `deploy.sh` script that you can run to deploy quickly.

---

## Sharing with Friends & Family

Once deployed, share your URL with:
- State page: `https://your-domain.com/state/New%20Jersey`
- Submit page: `https://your-domain.com/submit`
- Home page: `https://your-domain.com`

All submissions will go directly to your Firebase Firestore database!

## Security Notes

- ✅ Firestore rules are already configured
- ✅ Anonymous authentication is enabled
- ✅ Only authenticated users can submit restaurants/reviews
- ✅ Anyone can read restaurants (perfect for sharing)

## Monitoring

- **Firebase Console**: https://console.firebase.google.com/project/YOUR_PROJECT_ID/firestore
- Track submissions in real-time
- View analytics in Firebase Console
