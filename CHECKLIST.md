# ✅ PhoFinder Setup Checklist

## Completed ✅
- [x] Firebase project created: `pho-finder-5175f`
- [x] Firestore database started
- [x] Firebase CLI initialized
- [x] Firestore rules deployed
- [x] Firestore indexes deployed

## Next Steps 🔲

### 1. Enable Anonymous Authentication
- [ ] Go to: https://console.firebase.google.com/project/pho-finder-5175f/authentication/providers
- [ ] Click "Get started" if you see it
- [ ] Go to "Sign-in method" tab
- [ ] Find "Anonymous" in the list
- [ ] Click on it and toggle "Enable"
- [ ] Click "Save"

### 2. Get Firebase Config Values
- [ ] Go to: https://console.firebase.google.com/project/pho-finder-5175f/settings/general
- [ ] Scroll to "Your apps" section
- [ ] If no web app exists, click `</>` icon to add one
  - App nickname: "PhoFinder"
  - Click "Register app"
- [ ] Copy the config values from the code snippet
- [ ] Update `.env.local` with:
  - `apiKey` → `NEXT_PUBLIC_FIREBASE_API_KEY`
  - `authDomain` → `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` (should be: pho-finder-5175f.firebaseapp.com)
  - `projectId` → `NEXT_PUBLIC_FIREBASE_PROJECT_ID` (should be: pho-finder-5175f)
  - `storageBucket` → `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` (should be: pho-finder-5175f.appspot.com)
  - `messagingSenderId` → `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
  - `appId` → `NEXT_PUBLIC_FIREBASE_APP_ID`

### 3. Test the App
- [ ] Run: `npm run dev`
- [ ] Visit: http://localhost:3000
- [ ] Try submitting a restaurant at `/submit`
- [ ] Verify it appears in Firestore database

## Quick Links 🔗
- **Project Console**: https://console.firebase.google.com/project/pho-finder-5175f/overview
- **Firestore Database**: https://console.firebase.google.com/project/pho-finder-5175f/firestore
- **Authentication**: https://console.firebase.google.com/project/pho-finder-5175f/authentication/providers
- **Project Settings**: https://console.firebase.google.com/project/pho-finder-5175f/settings/general

## Commands 📝
```bash
# Get Firebase config (opens console)
./get-firebase-config.sh

# Start development server
npm run dev

# Deploy to Firebase Hosting (when ready)
npm run build
firebase deploy
```
