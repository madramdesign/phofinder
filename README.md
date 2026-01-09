# PhoFinder

A web application for discovering pho restaurants across the United States. Browse restaurants by state and city, read reviews, submit ratings, and add new restaurants to the community database.

## Features

- **State-by-State Navigation**: Browse restaurants organized by state and city
- **Restaurant Listings**: View detailed information about each restaurant including address, phone, website, and description
- **Reviews & Ratings**: Read and write reviews, rate restaurants on a 5-star scale
- **User Submission Portal**: Submit new restaurants to help grow the community
- **Modern UI**: Clean, responsive design inspired by phofever.com

## Tech Stack

- **Next.js 14**: React framework for the frontend
- **TypeScript**: Type-safe development
- **Firebase Firestore**: Database for restaurants, reviews, and ratings
- **Firebase Authentication**: User authentication (anonymous sign-in)
- **Firebase Hosting**: Deployment platform

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase project with Firestore enabled

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Enable Anonymous Authentication
   - Copy your Firebase config

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

4. Deploy Firestore rules and indexes:
```bash
firebase deploy --only firestore:rules,firestore:indexes
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Structure

### Collections

- **restaurants**: Restaurant information
  - name, address, city, state, zipCode, phone, website, description
  - averageRating, totalReviews
  - createdAt, updatedAt

- **reviews**: User reviews
  - restaurantId, userId, userName
  - rating, comment
  - createdAt, updatedAt

- **ratings**: User ratings
  - restaurantId, userId, rating
  - createdAt, updatedAt

## Deployment

### Firebase Hosting

1. Build the application:
```bash
npm run build
```

2. Deploy to Firebase:
```bash
firebase deploy
```

## Project Structure

```
pho project/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page (state listing)
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── state/             # State pages
│   ├── restaurant/        # Restaurant detail pages
│   ├── submit/            # Restaurant submission page
│   └── about/             # About page
├── lib/                    # Utility functions
│   ├── firebase.ts        # Firebase initialization
│   └── db.ts              # Database operations
├── types/                  # TypeScript types
│   └── index.ts           # Type definitions
└── firebase.json          # Firebase configuration
```

## Contributing

Feel free to submit restaurants, write reviews, and help improve PhoFinder!

## License

Copyright © 2024 PhoFinder. All rights reserved.
