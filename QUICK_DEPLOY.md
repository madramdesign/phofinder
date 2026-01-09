# Quick Deploy Guide - Share PhoFinder with Friends & Family 🚀

## Fastest Way: Vercel (5 minutes)

### Step 1: Push to GitHub
```bash
# If you haven't already
git init
git add .
git commit -m "Ready to deploy PhoFinder"
git branch -M main
# Create a repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/phofinder.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to https://vercel.com/new
2. Sign in with GitHub
3. Click "Import" your repository
4. Add these Environment Variables (copy from `.env.local`):
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAFprLpxNB9TzvB1sZWGQCEGt_XDwj76eg
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=pho-finder-5175f.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=pho-finder-5175f
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=pho-finder-5175f.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1035496743136
   NEXT_PUBLIC_FIREBASE_APP_ID=1:1035496743136:web:2607dfcba507001e8db085
   ```
5. Click "Deploy"
6. Wait 2-3 minutes
7. ✅ Done! Share your URL: `https://phofinder-xxxxx.vercel.app`

### Step 3: Share with Friends
Send them:
- **Submit Restaurant**: `https://your-app.vercel.app/submit`
- **Home Page**: `https://your-app.vercel.app`
- **Specific State**: `https://your-app.vercel.app/state/New%20Jersey`

---

## Alternative: Firebase Hosting

If you prefer Firebase Hosting:

```bash
# Build the app
npm run build

# Deploy
firebase deploy --only hosting

# Your app will be at:
# https://pho-finder-5175f.web.app
```

**Note:** Firebase Hosting works best with static sites. For Next.js with dynamic routes, Vercel is recommended.

---

## What Friends Can Do

✅ **Submit Restaurants**: Fill out the form at `/submit`  
✅ **Write Reviews**: Click "Write Review" on any restaurant  
✅ **Rate Restaurants**: Rate Overall, Broth, Noodles, Meat, Vegetables  
✅ **Report Closures**: Help keep the database accurate  
✅ **Browse by State/City**: Find restaurants by location  

All data goes directly to your Firebase Firestore database!

---

## Monitoring Submissions

Watch submissions in real-time:
- **Firebase Console**: https://console.firebase.google.com/project/pho-finder-5175f/firestore/data
- View `restaurants` collection to see new submissions
- View `reviews` collection to see new reviews

---

## Custom Domain (Optional)

### Vercel:
1. Go to Project Settings → Domains
2. Add your domain (e.g., `phofinder.com`)
3. Follow DNS instructions

### Firebase:
1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow setup instructions

---

## Tips for Getting More Submissions

1. **Share on social media**: "Help us build the best pho restaurant database!"
2. **Email friends**: Send them the submit page URL
3. **Post in food groups**: Facebook groups, Reddit (r/pho, r/VietnameseFood)
4. **Add to local directories**: Foodie communities
5. **Make it easy**: Share direct link to `/submit` page

---

## Security

Your Firestore rules are already configured to:
- ✅ Allow anyone to read restaurants (for browsing)
- ✅ Require authentication to submit (prevents spam)
- ✅ Allow authenticated users to write reviews
- ✅ Track closure reports

No changes needed - ready to share! 🎉
