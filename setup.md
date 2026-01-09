# PhoFinder Setup Guide

## Quick Setup Steps

### 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard:
   - Enter project name: "phofinder" (or your preferred name)
   - Enable Google Analytics (optional)
   - Click "Create project"

### 2. Enable Firestore Database

1. In Firebase Console, go to "Build" → "Firestore Database"
2. Click "Create database"
3. Start in **test mode** (we'll update rules later)
4. Choose a location (preferably close to your users)
5. Click "Enable"

### 3. Enable Anonymous Authentication

1. In Firebase Console, go to "Build" → "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Click on "Anonymous"
5. Enable it and click "Save"

### 4. Get Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon (`</>`) to add a web app
4. Register app with nickname "PhoFinder Web"
5. Copy the Firebase configuration object

### 5. Create Environment File

Create a file named `.env.local` in the project root with:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

Replace all the placeholder values with your actual Firebase config values.

### 6. Install Firebase CLI (if not already installed)

```bash
npm install -g firebase-tools
```

### 7. Login to Firebase

```bash
firebase login
```

### 8. Initialize Firebase in Project

```bash
firebase init
```

When prompted:
- Select "Firestore" and "Hosting"
- Use existing project (select your Firebase project)
- For Firestore rules file: `firestore.rules` (already exists)
- For Firestore indexes file: `firestore.indexes.json` (already exists)
- For public directory: `out` (for Next.js static export)
- Configure as single-page app: **No**
- Set up automatic builds: **No** (or Yes if you want)

### 9. Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules,firestore:indexes
```

### 10. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to see your app!

## Troubleshooting

### If you get Firebase errors:
- Make sure `.env.local` file exists with correct values
- Restart the dev server after creating `.env.local`
- Check that Firestore and Anonymous Auth are enabled in Firebase Console

### If Firestore rules deployment fails:
- Make sure you're logged in: `firebase login`
- Make sure project is initialized: `firebase use --add` and select your project

## Next Steps

1. Submit your first restaurant at `/submit`
2. Test the review and rating system
3. Build for production: `npm run build`
4. Deploy to Firebase Hosting: `firebase deploy --only hosting`
