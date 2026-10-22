import { useState, useMemo } from 'react';
import { useApp } from '@/context/app-context';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { ProductCard } from '@/components/ProductCard';

export function HomeView() {
  const { activeCategory, userName } = useApp();
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const filtered = useMemo(() => {
    let list = activeCategory
      ? products.filter((p) => p.category === activeCategory)
      : products;

    switch (sortBy) {
      case 'price-low':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }, [activeCategory, sortBy]);

  const activeCat = categories.find((c) => c.id === activeCategory);

  return (
    <div className="bg-chaos-dark bg-chaos-grid min-h-[calc(100vh-120px)]">
      {/* Hero banner */}
      {!activeCategory && (
        <div className="bg-gradient-to-r from-chaos-purple via-chaos-pink to-chaos-orange text-white px-4 sm:px-6 py-6 border-b-2 border-chaos-yellow">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-black font-impact mb-1 text-chaos-lime tracking-wide animate-glitch">
              WELCOME BACK TO THE CHAOS, {userName.toUpperCase()}
            </h1>
            <p className="text-chaos-yellow text-sm font-comic">
              Browse our curated collection of items you absolutely do not need.
              Adding to cart takes 4 clicks. We apologize in advance. No we don't.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4">
        {/* Section title + sort */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-lg font-black font-comic text-chaos-lime">
            {activeCat ? `${activeCat.icon} ${activeCat.name}` : '🔥 ALL PRODUCTS'}
            <span className="text-chaos-pink text-sm font-bold ml-2">
              ({filtered.length} cursed items)
            </span>
          </h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="text-sm border-2 border-chaos-purple rounded-md px-2 py-1.5 bg-chaos-dark text-chaos-cyan font-comic focus:outline-none focus:ring-2 focus:ring-chaos-lime"
          >
            <option value="featured">Featured Chaos</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated Curses</option>
          </select>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg font-comic text-chaos-pink">No products found. Even WE have standards.</p>
          </div>
        )}
      </div>
    </div>
  );
}
