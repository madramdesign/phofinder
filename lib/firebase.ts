import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "your-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "your-auth-domain",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "your-storage-bucket",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "your-messaging-sender-id",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "your-app-id"
};

// Initialize Firebase app
const app: FirebaseApp = typeof window !== 'undefined' && !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0] || ({} as FirebaseApp);

// Initialize services (only on client side)
let db: Firestore;
let auth: Auth;

if (typeof window !== 'undefined') {
  try {
    db = getFirestore(app);
    auth = getAuth(app);
  } catch (error) {
    console.error('Firebase initialization error:', error);
    // Create dummy instances for type safety during build
    throw new Error('Firebase not properly initialized. Check your .env.local file.');
  }
} else {
  // Server-side: create dummy instances for type safety
  db = {} as Firestore;
  auth = {} as Auth;
}

export { db, auth };
export default app;
