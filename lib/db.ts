import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { Restaurant, Review, Rating, DetailedRatings } from '@/types';

// Restaurant operations
export const getRestaurants = async (): Promise<Restaurant[]> => {
  if (!db) {
    console.error('Firestore not initialized');
    return [];
  }
  
  try {
    const restaurantsRef = collection(db, 'restaurants');
    const snapshot = await getDocs(restaurantsRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Restaurant[];
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return [];
  }
};

export const getRestaurantsByState = async (state: string): Promise<Restaurant[]> => {
  if (!db) {
    console.error('Firestore not initialized');
    return [];
  }
  
  try {
    const restaurantsRef = collection(db, 'restaurants');
    const q = query(restaurantsRef, where('state', '==', state), orderBy('city'), orderBy('name'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Restaurant[];
  } catch (error) {
    console.error('Error fetching restaurants by state:', error);
    return [];
  }
};

export const getRestaurantsByCity = async (state: string, city: string): Promise<Restaurant[]> => {
  if (!db) {
    console.error('Firestore not initialized');
    return [];
  }
  
  try {
    const restaurantsRef = collection(db, 'restaurants');
    const q = query(
      restaurantsRef, 
      where('state', '==', state), 
      where('city', '==', city),
      orderBy('name')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Restaurant[];
  } catch (error) {
    console.error('Error fetching restaurants by city:', error);
    return [];
  }
};

export const getRestaurant = async (id: string): Promise<Restaurant | null> => {
  if (!db) {
    console.error('Firestore not initialized');
    return null;
  }
  
  try {
    const restaurantRef = doc(db, 'restaurants', id);
    const snapshot = await getDoc(restaurantRef);
    if (!snapshot.exists()) return null;
    return {
      id: snapshot.id,
      ...snapshot.data(),
      createdAt: snapshot.data().createdAt?.toDate() || new Date(),
      updatedAt: snapshot.data().updatedAt?.toDate() || new Date(),
    } as Restaurant;
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    return null;
  }
};

export const addRestaurant = async (restaurant: Omit<Restaurant, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  if (!db) {
    throw new Error('Database not initialized. Make sure Firebase is properly configured.');
  }
  
  const restaurantsRef = collection(db, 'restaurants');
  const now = Timestamp.now();
  const docRef = await addDoc(restaurantsRef, {
    ...restaurant,
    createdAt: now,
    updatedAt: now,
    averageRating: 0,
    totalReviews: 0,
    isClosed: false,
    closureReports: 0,
  });
  return docRef.id;
};

// Review operations
export const getReviews = async (restaurantId: string): Promise<Review[]> => {
  if (!db) {
    console.error('Firestore not initialized');
    return [];
  }
  
  try {
    const reviewsRef = collection(db, 'reviews');
    const q = query(
      reviewsRef, 
      where('restaurantId', '==', restaurantId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Review[];
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};

export const addReview = async (review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  if (!db) {
    throw new Error('Database not initialized.');
  }
  
  const reviewsRef = collection(db, 'reviews');
  const now = Timestamp.now();
  const docRef = await addDoc(reviewsRef, {
    ...review,
    createdAt: now,
    updatedAt: now,
  });
  
  // Update restaurant rating
  await updateRestaurantRating(review.restaurantId);
  
  return docRef.id;
};

// Rating operations
export const getRating = async (restaurantId: string, userId: string): Promise<Rating | null> => {
  if (!db) {
    console.error('Firestore not initialized');
    return null;
  }
  
  try {
    const ratingsRef = collection(db, 'ratings');
    const q = query(
      ratingsRef,
      where('restaurantId', '==', restaurantId),
      where('userId', '==', userId)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    } as Rating;
  } catch (error) {
    console.error('Error fetching rating:', error);
    return null;
  }
};

export const addOrUpdateRating = async (rating: Omit<Rating, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
  if (!db) {
    throw new Error('Database not initialized.');
  }
  
  const existingRating = await getRating(rating.restaurantId, rating.userId);
  const now = Timestamp.now();
  
  if (existingRating) {
    const ratingRef = doc(db, 'ratings', existingRating.id!);
    await updateDoc(ratingRef, {
      rating: rating.rating,
      updatedAt: now,
    });
  } else {
    const ratingsRef = collection(db, 'ratings');
    await addDoc(ratingsRef, {
      ...rating,
      createdAt: now,
      updatedAt: now,
    });
  }
  
  // Update restaurant rating
  await updateRestaurantRating(rating.restaurantId);
};

// Helper function to update restaurant average rating and detailed ratings
const updateRestaurantRating = async (restaurantId: string): Promise<void> => {
  if (!db) {
    console.error('Firestore not initialized, skipping rating update');
    return;
  }
  
  // Update from ratings collection
  const ratingsRef = collection(db, 'ratings');
  const q = query(ratingsRef, where('restaurantId', '==', restaurantId));
  const snapshot = await getDocs(q);
  
  // Update from reviews collection (for detailed ratings)
  const reviewsRef = collection(db, 'reviews');
  const reviewsQ = query(reviewsRef, where('restaurantId', '==', restaurantId));
  const reviewsSnapshot = await getDocs(reviewsQ);
  
  const restaurantRef = doc(db, 'restaurants', restaurantId);
  const updateData: any = {
    updatedAt: Timestamp.now(),
  };
  
  // Calculate overall average rating from ratings
  if (!snapshot.empty) {
    let totalRating = 0;
    snapshot.docs.forEach(doc => {
      totalRating += doc.data().rating;
    });
    updateData.averageRating = Math.round((totalRating / snapshot.docs.length) * 10) / 10;
    updateData.totalReviews = reviewsSnapshot.size || snapshot.size;
  }
  
  // Calculate detailed ratings from reviews
  if (!reviewsSnapshot.empty) {
    const detailedTotals: DetailedRatings = {
      overall: 0,
      broth: 0,
      noodles: 0,
      meat: 0,
      vegetables: 0,
    };
    let detailedCount = 0;
    let hasDetailedRatings = false;
    
    reviewsSnapshot.docs.forEach(reviewDoc => {
      const reviewData = reviewDoc.data();
      detailedTotals.overall += reviewData.rating || 0;
      
      if (reviewData.detailedRatings) {
        hasDetailedRatings = true;
        detailedTotals.broth += reviewData.detailedRatings.broth || 0;
        detailedTotals.noodles += reviewData.detailedRatings.noodles || 0;
        detailedTotals.meat += reviewData.detailedRatings.meat || 0;
        detailedTotals.vegetables += reviewData.detailedRatings.vegetables || 0;
      }
      detailedCount++;
    });
    
    if (detailedCount > 0) {
      const overallAvg = Math.round((detailedTotals.overall / detailedCount) * 10) / 10;
      
      // Only include detailed ratings if at least one review has them
      if (hasDetailedRatings) {
        updateData.averageDetailedRatings = {
          overall: overallAvg,
          broth: Math.round((detailedTotals.broth / detailedCount) * 10) / 10,
          noodles: Math.round((detailedTotals.noodles / detailedCount) * 10) / 10,
          meat: Math.round((detailedTotals.meat / detailedCount) * 10) / 10,
          vegetables: Math.round((detailedTotals.vegetables / detailedCount) * 10) / 10,
        };
      } else {
        // Only include overall if no detailed ratings provided yet
        updateData.averageDetailedRatings = {
          overall: overallAvg,
          broth: 0,
          noodles: 0,
          meat: 0,
          vegetables: 0,
        };
      }
    }
    
    updateData.totalReviews = reviewsSnapshot.size;
  }
  
  await updateDoc(restaurantRef, updateData);
};

// Report restaurant closure
export const reportClosure = async (restaurantId: string): Promise<void> => {
  if (!db) {
    throw new Error('Database not initialized.');
  }
  
  const restaurantRef = doc(db, 'restaurants', restaurantId);
  const restaurantDoc = await getDoc(restaurantRef);
  
  if (!restaurantDoc.exists()) {
    throw new Error('Restaurant not found');
  }
  
  const currentData = restaurantDoc.data();
  const closureReports = (currentData.closureReports || 0) + 1;
  
  // Mark as closed if 3+ closure reports
  await updateDoc(restaurantRef, {
    closureReports,
    isClosed: closureReports >= 3,
    updatedAt: Timestamp.now(),
  });
};
