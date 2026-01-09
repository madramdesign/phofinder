# 🍜 PhoFinder

A community-driven web application for discovering and rating pho restaurants across the United States. Built with Next.js, TypeScript, and Firebase.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10-orange)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ Features

- **🗺️ State-by-State Navigation**: Browse restaurants organized by state and city
- **🏪 Detailed Restaurant Listings**: View addresses, phone numbers, websites, and descriptions
- **⭐ Comprehensive Rating System**: Rate restaurants across 5 categories:
  - Overall Satisfaction
  - Broth (flavor, fragrance, clarity)
  - Noodles (texture, clumpiness)
  - Meat (tenderness, quality)
  - Vegetables (variety, freshness)
- **💬 User Reviews**: Read and write detailed reviews with ratings
- **➕ Community Submission**: Submit new restaurants to help grow the database
- **🚨 Closure Reporting**: Community-driven closure reports to keep data accurate
- **📱 Responsive Design**: Clean, modern UI inspired by phofever.com

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **Authentication**: [Firebase Auth](https://firebase.google.com/docs/auth) (Anonymous)
- **Hosting**: [Vercel](https://vercel.com/) (recommended) or Firebase Hosting

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase account ([Sign up for free](https://console.firebase.google.com/))

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/madramdesign/phofinder.git
cd phofinder
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Firebase**
   - Create a new project at [Firebase Console](https://console.firebase.google.com/)
   - Enable **Firestore Database** (start in production mode)
   - Enable **Anonymous Authentication** (Authentication → Sign-in method → Anonymous)
   - Get your Firebase config from Project Settings

4. **Configure environment variables**

Create a `.env.local` file:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

See `.env.example` for the template.

5. **Deploy Firestore rules and indexes**
```bash
firebase login
firebase use your-project-id
firebase deploy --only firestore:rules,firestore:indexes
```

6. **Run development server**
```bash
npm run dev
```

7. **Open your browser**
Visit [http://localhost:3000](http://localhost:3000)

## 📊 Database Structure

### Firestore Collections

#### `restaurants`
- `name`, `address`, `city`, `state`, `zipCode`
- `phone`, `website`, `description`
- `averageRating`, `averageDetailedRatings` (Overall, Broth, Noodles, Meat, Vegetables)
- `totalReviews`, `isClosed`, `closureReports`
- `createdAt`, `updatedAt`

#### `reviews`
- `restaurantId`, `userId`, `userName`
- `rating` (overall), `detailedRatings` (object with 5 categories)
- `comment`
- `createdAt`, `updatedAt`

#### `ratings`
- `restaurantId`, `userId`
- `rating` (1-5)
- `createdAt`, `updatedAt`

## 🌐 Deployment

### Recommended: Vercel (Easiest)

1. **Push to GitHub** (if not already)
2. **Import to Vercel**: [vercel.com/new](https://vercel.com/new)
3. **Add environment variables** (from `.env.local`)
4. **Deploy!** ✅

See [DEPLOY_FROM_GITHUB.md](DEPLOY_FROM_GITHUB.md) for detailed instructions.

### Alternative: Firebase Hosting

```bash
npm run build
firebase deploy --only hosting
```

## 📁 Project Structure

```
phofinder/
├── app/                        # Next.js App Router
│   ├── page.tsx               # Home page (state listing)
│   ├── layout.tsx             # Root layout
│   ├── globals.css            # Global styles
│   ├── state/[stateName]/     # Dynamic state pages
│   ├── restaurant/[id]/       # Dynamic restaurant pages
│   ├── submit/                # Restaurant submission
│   └── about/                 # About page
├── lib/                        # Utilities
│   ├── firebase.ts            # Firebase config
│   └── db.ts                  # Firestore operations
├── types/                      # TypeScript definitions
│   └── index.ts               # Type interfaces
├── firebase.json              # Firebase hosting config
├── firestore.rules            # Firestore security rules
└── firestore.indexes.json     # Firestore indexes
```

## 🎯 Features in Detail

### Browse by State & City
- Navigate to any US state
- Filter restaurants by city
- View restaurants organized by area code

### Detailed Ratings
- Rate restaurants across 5 categories
- See average ratings for each category
- Read detailed user reviews with ratings

### Community Driven
- Anyone can submit restaurants
- Community reviews and ratings
- Closure reporting (3+ reports marks restaurant as closed)

## 🔒 Security

- Firestore rules restrict writes to authenticated users
- Anonymous authentication for easy community participation
- Public read access for browsing restaurants
- User-specific write access for reviews and ratings

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [PhoFever.com](http://www.phofever.com/)
- Built with [Next.js](https://nextjs.org/) and [Firebase](https://firebase.google.com/)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Submit restaurants in your area
- Write reviews and ratings
- Report bugs or suggest features
- Fork and improve the codebase

---

Made with ❤️ for pho lovers everywhere 🍜
