import { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Package } from 'lucide-react';
import { useApp } from '@/context/app-context';

export function Header() {
  const { cartCount, wishlist, setView, view, setActiveCategory } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveCategory(null);
    setView('home');
  };

  const navButton = (target: 'home' | 'cart' | 'wishlist' | 'account' | 'orders', icon: React.ReactNode, label: string, badge?: number) => {
    const isActive = view === target;
    return (
      <button
        onClick={() => {
          if (target === 'home') setActiveCategory(null);
          setView(target);
        }}
        className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-md text-sm font-bold font-comic relative ${
          isActive
            ? 'bg-chaos-lime text-black'
            : 'text-chaos-yellow hover:bg-chaos-purple/30 hover:text-white'
        }`}
      >
        <span className="relative">
          {icon}
          {badge !== undefined && badge > 0 && (
            <span className="absolute -top-2 -right-2 bg-chaos-pink text-white text-[10px] font-black rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 animate-pulse">
              {badge}
            </span>
          )}
        </span>
        <span className="hidden sm:inline">{label}</span>
      </button>
    );
  };

  return (
    <header className="sticky top-0 z-40 bg-chaos-dark shadow-lg border-b-2 border-chaos-purple">
      <div className="flex items-center gap-2 px-2 sm:px-6 py-2.5">
        {/* Logo */}
        <button
          onClick={() => {
            setActiveCategory(null);
            setView('home');
          }}
          className="flex items-center gap-1 shrink-0"
        >
          <span className="text-2xl font-black font-impact text-chaos-lime tracking-tight animate-glitch">
            Amazong
          </span>
          <span className="hidden md:inline text-[10px] text-chaos-pink tracking-widest uppercase ml-1 font-mono-chaos">
            .chaos
          </span>
        </button>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-2 sm:mx-4">
          <div className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for garbage you don't need..."
              className="flex-1 px-3 py-2 text-sm rounded-l-md border-2 border-chaos-lime focus:outline-none text-black bg-white font-comic"
            />
            <button
              type="submit"
              className="bg-chaos-lime hover:bg-chaos-cyan text-black px-4 rounded-r-md transition-colors font-bold"
            >
              <Search size={18} />
            </button>
          </div>
        </form>

        {/* Nav icons */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {navButton('cart', <ShoppingCart size={20} />, 'Cart', cartCount)}
          {navButton('wishlist', <Heart size={20} />, 'Wishlist', wishlist.length)}
          {navButton('orders', <Package size={20} />, 'Orders')}
          {navButton('account', <User size={20} />, 'Account')}
        </div>
      </div>

      {/* Flashing rainbow warning strip */}
      <div className="animate-rainbow text-center py-0.5 text-xs font-black font-impact tracking-wider">
        ⚠ WELCOME TO THE CHAOS ZONE — ALL SALES ARE FINAL AND CURSED ⚠
      </div>
    </header>
  );
}
