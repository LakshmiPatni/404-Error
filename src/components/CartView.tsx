import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/app-context';
import { formatRupees } from '@/utils/format';

export function CartView() {
  const { cart, updateQuantity, removeFromCart, setView, cartCount } = useApp();

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = cart.length > 0 ? 49 : 0;
  const total = subtotal + shippingFee;

  if (cart.length === 0) {
    return (
      <div className="bg-chaos-dark bg-chaos-grid min-h-[calc(100vh-120px)] flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingCart size={64} className="mx-auto text-chaos-purple mb-4" />
          <h2 className="text-xl font-black font-comic text-chaos-pink mb-2">
            Your cart is suspiciously empty
          </h2>
          <p className="text-chaos-cyan text-sm mb-6 font-mono-chaos">
            We're disappointed in you. Go fill it with things you'll regret.
          </p>
          <button
            onClick={() => setView('home')}
            className="bg-chaos-lime hover:bg-chaos-yellow text-black font-black font-comic px-6 py-2.5 rounded-lg transition-colors"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-chaos-dark bg-chaos-grid min-h-[calc(100vh-120px)]">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4">
        <h1 className="text-xl font-black font-impact text-chaos-lime mb-4">
          SHOPPING CART ({cartCount} {cartCount === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-3">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-chaos-dark rounded-lg p-4 border-2 border-chaos-purple flex items-center gap-4"
              >
                <div className="text-4xl shrink-0">{item.product.emoji}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold font-comic text-sm text-chaos-yellow truncate">{item.product.name}</h3>
                  <p className="text-xs text-chaos-cyan/70 truncate font-mono-chaos">{item.product.description}</p>
                  <p className="text-sm font-black font-impact text-chaos-lime mt-1">{formatRupees(item.product.price)}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => updateQuantity(item.product.id, -1)} className="w-7 h-7 rounded-full bg-chaos-purple hover:bg-chaos-pink flex items-center justify-center transition-colors text-white">
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-bold text-chaos-cyan w-6 text-center font-mono-chaos">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, 1)} className="w-7 h-7 rounded-full bg-chaos-purple hover:bg-chaos-pink flex items-center justify-center transition-colors text-white">
                    <Plus size={14} />
                  </button>
                </div>
                <button onClick={() => removeFromCart(item.product.id)} className="text-chaos-pink hover:text-red-400 transition-colors shrink-0">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-chaos-dark rounded-lg p-5 border-2 border-chaos-lime h-fit lg:sticky lg:top-32">
            <h2 className="font-black font-comic text-chaos-yellow mb-3">Order Summary</h2>
            <div className="space-y-2 text-sm font-mono-chaos">
              <div className="flex justify-between text-chaos-cyan"><span>Subtotal</span><span>{formatRupees(subtotal)}</span></div>
              <div className="flex justify-between text-chaos-cyan"><span>Shipping (non-negotiable)</span><span>{formatRupees(shippingFee)}</span></div>
              <div className="flex justify-between text-chaos-cyan"><span>Psychological damage fee</span><span className="text-chaos-lime">FREE</span></div>
              <div className="border-t border-chaos-purple pt-2 flex justify-between font-black font-impact text-chaos-lime text-lg">
                <span>Total</span><span>{formatRupees(total)}</span>
              </div>
            </div>
            <p className="text-xs text-chaos-pink mt-3 leading-relaxed font-comic">
              Warning: Checkout involves a mandatory interrogation and intelligence tax. Proceed with caution.
            </p>
            <button
              onClick={() => setView('checkout')}
              className="w-full mt-4 bg-chaos-lime hover:bg-chaos-yellow text-black font-black font-impact py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              PROCEED TO CHECKOUT <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
