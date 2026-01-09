#!/bin/bash

echo "🔥 PhoFinder Firebase Setup Script"
echo "=================================="
echo ""

# Check if firebase-tools is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Installing..."
    npm install -g firebase-tools
else
    echo "✅ Firebase CLI is installed"
fi

echo ""
echo "📋 Next steps:"
echo "1. Make sure you've created a Firebase project at https://console.firebase.google.com/"
echo "2. Enable Firestore Database"
echo "3. Enable Anonymous Authentication"
echo "4. Get your Firebase config from Project Settings"
echo "5. Create .env.local file with your Firebase credentials"
echo ""
echo "Then run:"
echo "  firebase login"
echo "  firebase init"
echo "  firebase deploy --only firestore:rules,firestore:indexes"
echo ""
echo "See setup.md for detailed instructions!"
