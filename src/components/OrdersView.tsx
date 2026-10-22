import { Package } from 'lucide-react';
import { useApp } from '@/context/app-context';
import { formatRupees, formatTime } from '@/utils/format';
import { sanityRatingColors } from '@/utils/scoring';

export function OrdersView() {
  const { orders, setView } = useApp();

  if (orders.length === 0) {
    return (
      <div className="bg-chaos-dark bg-chaos-grid min-h-[calc(100vh-120px)] flex items-center justify-center px-4">
        <div className="text-center">
          <Package size={64} className="mx-auto text-chaos-purple mb-4" />
          <h2 className="text-xl font-black font-comic text-chaos-pink mb-2">No orders yet</h2>
          <p className="text-chaos-cyan text-sm mb-6 font-mono-chaos">
            You haven't bought anything. We're not mad, just disappointed. Actually, we are mad.
          </p>
          <button onClick={() => setView('home')} className="bg-chaos-lime hover:bg-chaos-yellow text-black font-black font-comic px-6 py-2.5 rounded-lg transition-colors">
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-chaos-dark bg-chaos-grid min-h-[calc(100vh-120px)]">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4">
        <h1 className="text-xl font-black font-impact text-chaos-lime mb-4">
          ORDER HISTORY ({orders.length})
        </h1>
        <div className="space-y-3">
          {orders.slice().reverse().map((order) => (
            <div key={order.id} className="bg-chaos-dark rounded-lg p-4 border-2 border-chaos-purple">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-xs text-chaos-cyan/60 font-mono-chaos">
                    {new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                  <h3 className="font-bold font-comic text-chaos-yellow mt-0.5">{order.name}</h3>
                  <div className="flex gap-4 mt-2 text-sm text-chaos-cyan flex-wrap font-mono-chaos">
                    <span>Total: <strong className="text-chaos-lime">{formatRupees(order.totalSpent)}</strong></span>
                    <span>Time: {formatTime(order.timeSurvived)}</span>
                    <span>Tax: {formatRupees(order.finalTax)}</span>
                    <span>CGPA: {order.cgpa.toFixed(2)}</span>
                    <span>Score: <strong className="text-chaos-yellow">{order.resilienceScore}</strong></span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-chaos-cyan/60 mb-1">Status</div>
                  <span className="inline-block bg-chaos-lime/20 text-chaos-lime text-xs font-bold font-comic px-2 py-1 rounded-full">
                    Survived
                  </span>
                  <div className="mt-1.5">
                    <span className={`inline-block text-[10px] font-bold font-comic px-2 py-0.5 rounded border ${sanityRatingColors[order.sanityRating] ?? 'bg-chaos-purple/20 text-chaos-cyan border-chaos-purple/40'}`}>
                      {order.sanityRating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
