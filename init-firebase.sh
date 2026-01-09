#!/bin/bash

echo "🔥 Firebase Initialization for PhoFinder"
echo "========================================="
echo ""
echo "Available Firebase projects:"
firebase projects:list
echo ""
echo "Do you want to:"
echo "1) Use an existing project"
echo "2) Create a new project (you'll need to do this in Firebase Console first)"
echo ""
read -p "Enter choice (1 or 2): " choice

if [ "$choice" = "1" ]; then
    echo ""
    read -p "Enter the Project ID to use: " project_id
    echo ""
    echo "Initializing Firebase with project: $project_id"
    
    # Create .firebaserc
    cat > .firebaserc << EOF
{
  "projects": {
    "default": "$project_id"
  }
}
EOF
    
    echo "✅ Created .firebaserc"
    echo ""
    echo "Now deploying Firestore rules and indexes..."
    firebase deploy --only firestore:rules,firestore:indexes
    
    echo ""
    echo "✅ Firebase setup complete!"
    echo ""
    echo "⚠️  Don't forget to:"
    echo "1. Enable Firestore Database in Firebase Console"
    echo "2. Enable Anonymous Authentication in Firebase Console"
    echo "3. Update .env.local with your Firebase config values"
    
elif [ "$choice" = "2" ]; then
    echo ""
    echo "📝 To create a new Firebase project:"
    echo "1. Go to https://console.firebase.google.com/"
    echo "2. Click 'Add project'"
    echo "3. Follow the setup wizard"
    echo "4. Enable Firestore Database (production mode)"
    echo "5. Enable Authentication > Anonymous sign-in"
    echo "6. Get your Firebase config from Project Settings"
    echo "7. Update .env.local with the config"
    echo "8. Run this script again and choose option 1"
else
    echo "Invalid choice. Exiting."
    exit 1
fi
