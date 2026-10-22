import { useState } from 'react';
import { useApp } from '@/context/app-context';

export function Onboarding() {
  const { completeOnboarding } = useApp();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('You must have a name. Even Schrödinger\'s cat had a name.');
      return;
    }
    if (name.trim().length < 2) {
      setError('That\'s barely a name. Try harder. We believe in you (barely).');
      return;
    }
    completeOnboarding(name.trim());
  };

  return (
    <div className="min-h-screen bg-chaos-dark bg-chaos-grid flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="text-6xl font-black font-impact text-chaos-lime tracking-tight mb-2 animate-glitch">
            Amazong
          </div>
          <div className="text-chaos-pink text-sm tracking-widest uppercase font-mono-chaos animate-pulse">
            The Chaos Store
          </div>
          <p className="text-chaos-cyan mt-6 text-sm leading-relaxed font-comic">
            Welcome, brave soul. You are about to enter the most unnecessarily
            complicated shopping experience ever devised. But first, we need
            your <span className="text-chaos-yellow font-bold">Nice Name</span> so we
            can personalize your suffering.
          </p>
        </div>

        <div className="animate-rainbow text-center py-1 text-xs font-black font-impact tracking-wider mb-4 rounded">
          ⚠ ABANDON ALL HOPE YE WHO ENTER HERE ⚠
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-chaos-dark rounded-lg p-6 shadow-2xl border-2 border-chaos-lime animate-neon-border"
        >
          <label className="block text-sm font-bold font-comic text-chaos-yellow mb-2">
            Enter your "Nice Name" for your profile
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            placeholder="e.g. Unfortunate Shopper"
            className="w-full px-4 py-3 border-2 border-chaos-purple rounded-lg text-white bg-black/40 font-comic focus:border-chaos-lime focus:outline-none transition-colors placeholder:text-slate-500"
            autoFocus
          />
          {error && (
            <p className="text-chaos-pink text-sm mt-2 font-bold font-comic animate-shake">{error}</p>
          )}

          <div className="mt-4 text-xs text-chaos-cyan space-y-1 font-mono-chaos">
            <p>• Your Endurance Timer starts the moment you click below.</p>
            <p>• We will track your clicks, errors, and time survived.</p>
            <p>• There is no exit. Only checkout.</p>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-chaos-lime hover:bg-chaos-yellow text-black font-black font-impact py-3 rounded-lg transition-colors text-lg tracking-wide"
          >
            BEGIN MY DESCENT
          </button>
        </form>

        <p className="text-center text-slate-500 text-xs mt-6 font-comic">
          By continuing, you accept that your patience will be tested beyond
          reasonable limits.
        </p>
      </div>
    </div>
  );
}
