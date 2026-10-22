import { createContext, useContext } from 'react';
import {
  Product,
  CartItem,
  Stats,
  View,
  LeaderboardEntry,
} from '@/types';

export type AppState = {
  userName: string;
  setUserName: (name: string) => void;
  hasOnboarded: boolean;
  completeOnboarding: (name: string) => void;

  view: View;
  setView: (view: View) => void;
  activeCategory: string | null;
  setActiveCategory: (cat: string | null) => void;

  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;

  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  orders: LeaderboardEntry[];
  addOrder: (entry: LeaderboardEntry) => void;
  clearOrders: () => void;

  stats: Stats;
  registerClick: () => void;
  registerError: () => void;
  addWordsTyped: (n: number) => void;
  elapsedTime: number;
};

export const AppContext = createContext<AppState | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
