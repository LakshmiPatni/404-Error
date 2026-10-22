import {
  useState,
  useRef,
  useEffect,
  ReactNode,
} from 'react';
import {
  Product,
  CartItem,
  Stats,
  View,
  LeaderboardEntry,
} from '@/types';
import { AppContext, AppState } from '@/context/app-context';

const LEADERBOARD_KEY = 'amazong_leaderboard';

function loadLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as LeaderboardEntry[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState('');
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [view, setView] = useState<View>('onboarding');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<LeaderboardEntry[]>(loadLeaderboard);

  const [stats, setStats] = useState<Stats>({
    startTime: 0,
    clicks: 0,
    errors: 0,
    wordsTyped: 0,
  });
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (!hasOnboarded) return;
    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTimeRef.current);
    }, 1000);
    return () => clearInterval(interval);
  }, [hasOnboarded]);

  const completeOnboarding = (name: string) => {
    setUserName(name);
    setHasOnboarded(true);
    setView('home');
    const now = Date.now();
    startTimeRef.current = now;
    setStats({ startTime: now, clicks: 0, errors: 0, wordsTyped: 0 });
  };

  const registerClick = () => {
    setStats((s) => ({ ...s, clicks: s.clicks + 1 }));
  };

  const registerError = () => {
    setStats((s) => ({ ...s, errors: s.errors + 1 }));
  };

  const addWordsTyped = (n: number) => {
    setStats((s) => ({ ...s, wordsTyped: s.wordsTyped + n }));
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.product.id === productId
            ? { ...i, quantity: Math.max(0, i.quantity + delta) }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev.filter((p) => p.id !== product.id);
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: string) =>
    wishlist.some((p) => p.id === productId);

  const addOrder = (entry: LeaderboardEntry) => {
    const updated = [...orders, entry];
    setOrders(updated);
    try {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }
  };

  const clearOrders = () => {
    setOrders([]);
    try {
      localStorage.removeItem(LEADERBOARD_KEY);
    } catch {
      // ignore storage errors
    }
  };

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const value: AppState = {
    userName,
    setUserName,
    hasOnboarded,
    completeOnboarding,
    view,
    setView,
    activeCategory,
    setActiveCategory,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    wishlist,
    toggleWishlist,
    isInWishlist,
    orders,
    addOrder,
    clearOrders,
    stats,
    registerClick,
    registerError,
    addWordsTyped,
    elapsedTime,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
