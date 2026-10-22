export type Category = {
  id: string;
  name: string;
  icon: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  emoji: string;
  rating: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Stats = {
  startTime: number;
  clicks: number;
  errors: number;
  wordsTyped: number;
};

export type LeaderboardEntry = {
  id: string;
  name: string;
  timeSurvived: number;
  wordsTyped: number;
  finalTax: number;
  totalSpent: number;
  clicks: number;
  errors: number;
  cgpa: number;
  date: string;
  resilienceScore: number;
  sanityRating: string;
};

export type View =
  | 'onboarding'
  | 'home'
  | 'catalog'
  | 'cart'
  | 'wishlist'
  | 'account'
  | 'orders'
  | 'checkout'
  | 'victory';
