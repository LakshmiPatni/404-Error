import { Clock, MousePointer, AlertTriangle, Type } from 'lucide-react';
import { useApp } from '@/context/app-context';
import { formatTime } from '@/utils/format';

export function AccountView() {
  const { userName, stats, elapsedTime, orders, setView } = useApp();
  const totalSpent = orders.reduce((sum, o) => sum + o.totalSpent, 0);

  return (
    <div className="bg-chaos-dark bg-chaos-grid min-h-[calc(100vh-120px)]">
      <div className="max-w-3xl mx-auto px-3 sm:px-6 py-4">
        <h1 className="text-xl font-black font-impact text-chaos-lime mb-4">YOUR ACCOUNT</h1>

        <div className="bg-chaos-dark rounded-lg p-6 border-2 border-chaos-purple mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-chaos-lime rounded-full flex items-center justify-center text-2xl font-black font-impact text-black">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-black font-comic text-chaos-yellow">{userName}</h2>
              <p className="text-sm text-chaos-cyan font-mono-chaos">Amazong Survivor #{orders.length + 1}</p>
            </div>
          </div>
        </div>

        <div className="bg-chaos-dark rounded-lg p-6 border-2 border-chaos-pink mb-4">
          <h3 className="font-black font-comic text-chaos-yellow mb-3">Endurance Statistics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: <Clock size={24} />, label: 'Time Survived', value: formatTime(elapsedTime) },
              { icon: <MousePointer size={24} />, label: 'Total Clicks', value: stats.clicks },
              { icon: <AlertTriangle size={24} />, label: 'Errors', value: stats.errors },
              { icon: <Type size={24} />, label: 'Words Typed', value: stats.wordsTyped },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mx-auto text-chaos-purple mb-1">{stat.icon}</div>
                <div className="text-lg font-black font-impact text-chaos-lime">{stat.value}</div>
                <div className="text-xs text-chaos-cyan font-mono-chaos">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-chaos-dark rounded-lg p-6 border-2 border-chaos-cyan">
          <h3 className="font-black font-comic text-chaos-yellow mb-3">Lifetime Summary</h3>
          <div className="space-y-2 text-sm font-mono-chaos">
            <div className="flex justify-between text-chaos-cyan"><span>Orders completed</span><span className="font-bold text-chaos-lime">{orders.length}</span></div>
            <div className="flex justify-between text-chaos-cyan"><span>Total money wasted</span><span className="font-bold text-chaos-lime">₹{totalSpent.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between text-chaos-cyan"><span>Certificate of Torture earned</span><span className="font-bold text-chaos-lime">{orders.length > 0 ? 'Yes' : 'Not yet'}</span></div>
          </div>
          {orders.length > 0 && (
            <button onClick={() => setView('victory')} className="w-full mt-4 bg-chaos-purple hover:bg-chaos-pink text-white font-bold font-comic py-2.5 rounded-lg transition-colors">
              View Latest Certificate
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
