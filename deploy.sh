#!/bin/bash

echo "🚀 PhoFinder Deployment Script"
echo "================================"
echo ""

# Check if Vercel CLI is installed
if command -v vercel &> /dev/null; then
    echo "✅ Vercel CLI found"
    echo ""
    echo "Would you like to deploy to Vercel? (y/n)"
    read -p "> " choice
    if [ "$choice" = "y" ] || [ "$choice" = "Y" ]; then
        echo ""
        echo "📦 Deploying to Vercel..."
        echo ""
        vercel --prod
        exit 0
    fi
else
    echo "ℹ️  Vercel CLI not found"
    echo ""
    echo "To deploy to Vercel:"
    echo "1. Install: npm i -g vercel"
    echo "2. Run: vercel"
    echo "3. Or visit: https://vercel.com and connect your GitHub repo"
    echo ""
fi

# Check if Firebase CLI is available
if command -v firebase &> /dev/null; then
    echo "✅ Firebase CLI found"
    echo ""
    echo "Would you like to deploy to Firebase Hosting? (y/n)"
    read -p "> " choice
    if [ "$choice" = "y" ] || [ "$choice" = "Y" ]; then
        echo ""
        echo "📦 Building Next.js app..."
        npm run build
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "✅ Build successful"
            echo ""
            echo "📤 Deploying to Firebase Hosting..."
            firebase deploy --only hosting
            
            if [ $? -eq 0 ]; then
                echo ""
                echo "✅ Deployment successful!"
                echo ""
                echo "🌐 Your app is live at:"
                firebase hosting:sites:list || echo "Check Firebase Console for your hosting URL"
            else
                echo "❌ Deployment failed"
            fi
        else
            echo "❌ Build failed"
        fi
        exit 0
    fi
else
    echo "ℹ️  Firebase CLI not found"
    echo "Install it with: npm install -g firebase-tools"
fi

echo ""
echo "📋 Deployment Options:"
echo ""
echo "1. Vercel (Recommended):"
echo "   - Visit https://vercel.com"
echo "   - Sign in with GitHub"
echo "   - Import your repository"
echo "   - Add environment variables from .env.local"
echo "   - Deploy!"
echo ""
echo "2. Netlify:"
echo "   - Visit https://netlify.com"
echo "   - Sign in with GitHub"
echo "   - Import your repository"
echo "   - Add environment variables"
echo "   - Deploy!"
echo ""
echo "3. Firebase Hosting:"
echo "   - Run: npm run build"
echo "   - Run: firebase deploy --only hosting"
echo ""
