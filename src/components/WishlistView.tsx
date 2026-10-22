import { Heart } from 'lucide-react';
import { useApp } from '@/context/app-context';
import { ProductCard } from '@/components/ProductCard';

export function WishlistView() {
  const { wishlist, setView } = useApp();

  if (wishlist.length === 0) {
    return (
      <div className="bg-chaos-dark bg-chaos-grid min-h-[calc(100vh-120px)] flex items-center justify-center px-4">
        <div className="text-center">
          <Heart size={64} className="mx-auto text-chaos-purple mb-4" />
          <h2 className="text-xl font-black font-comic text-chaos-pink mb-2">Your wishlist is empty</h2>
          <p className="text-chaos-cyan text-sm mb-6 font-mono-chaos">
            You haven't saved anything for later. How will you remember all the garbage you wanted?
          </p>
          <button onClick={() => setView('home')} className="bg-chaos-lime hover:bg-chaos-yellow text-black font-black font-comic px-6 py-2.5 rounded-lg transition-colors">
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-chaos-dark bg-chaos-grid min-h-[calc(100vh-120px)]">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4">
        <h1 className="text-xl font-black font-impact text-chaos-lime mb-4">
          YOUR WISHLIST ({wishlist.length} items)
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
