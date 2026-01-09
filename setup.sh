#!/bin/bash

echo "🚀 PhoFinder Setup Script"
echo "=========================="
echo ""

# Check if .env.local exists
if [ -f .env.local ]; then
    echo "✅ .env.local file already exists"
else
    echo "📝 Creating .env.local template..."
    cat > .env.local << 'EOF'
# Firebase Configuration
# Get these values from Firebase Console > Project Settings > Your apps
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
EOF
    echo "✅ Created .env.local - Please update it with your Firebase credentials"
fi

# Check if Firebase is logged in
echo ""
echo "Checking Firebase CLI..."
if firebase projects:list &>/dev/null; then
    echo "✅ Firebase CLI is logged in"
else
    echo "⚠️  Firebase CLI not logged in. Run: firebase login"
fi

# Check if .firebaserc exists
if [ -f .firebaserc ]; then
    echo "✅ Firebase project is initialized"
else
    echo "⚠️  Firebase project not initialized. Run: firebase init"
    echo "   Select Firestore and Hosting when prompted"
fi

echo ""
echo "📋 Next Steps:"
echo "1. Update .env.local with your Firebase credentials"
echo "2. Run: firebase login (if not logged in)"
echo "3. Run: firebase init (if not initialized)"
echo "4. Run: firebase deploy --only firestore:rules,firestore:indexes"
echo "5. Run: npm run dev"
echo ""
echo "For detailed instructions, see SETUP.md"
