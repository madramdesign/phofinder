export interface DetailedRatings {
  overall: number;
  broth: number;
  noodles: number;
  meat: number;
  vegetables: number;
}

export interface Restaurant {
  id?: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode?: string;
  phone?: string;
  website?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  averageRating?: number;
  averageDetailedRatings?: DetailedRatings;
  totalReviews?: number;
  isClosed?: boolean;
  closureReports?: number;
}

export interface Review {
  id?: string;
  restaurantId: string;
  userId: string;
  userName: string;
  rating: number;
  detailedRatings?: DetailedRatings;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Rating {
  id?: string;
  restaurantId: string;
  userId: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface StateCity {
  state: string;
  cities: string[];
}
