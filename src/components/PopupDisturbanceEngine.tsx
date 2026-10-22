import { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { popupDisturbances } from '@/data/disturbances';
import { useApp } from '@/context/app-context';

type ActivePopup = {
  id: number;
  disturbance: (typeof popupDisturbances)[number];
};

export function PopupDisturbanceEngine() {
  const { hasOnboarded, view, registerClick, registerError } = useApp();
  const [popups, setPopups] = useState<ActivePopup[]>([]);

  const triggerPopup = useCallback(() => {
    const disturbance =
      popupDisturbances[Math.floor(Math.random() * popupDisturbances.length)];
    setPopups((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), disturbance },
    ]);
  }, []);

  useEffect(() => {
    if (!hasOnboarded) return;

    const interval = setInterval(() => {
      if (view === 'onboarding' || view === 'victory') return;
      if (Math.random() < 0.65) {
        triggerPopup();
      }
    }, 10000);

    const firstTimeout = setTimeout(() => {
      if (view !== 'onboarding' && view !== 'victory') {
        triggerPopup();
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(firstTimeout);
    };
  }, [hasOnboarded, view, triggerPopup]);

  const closePopup = (id: number) => {
    registerClick();
    setPopups((prev) => prev.filter((p) => p.id !== id));
  };

  if (!hasOnboarded || view === 'onboarding' || view === 'victory') {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[60]">
      {popups.map((popup, idx) => (
        <div
          key={popup.id}
          className="absolute pointer-events-auto"
          style={{
            top: `${12 + idx * 14}%`,
            left: `${8 + idx * 12}%`,
            right: `${8 + idx * 4}%`,
            maxWidth: '400px',
            margin: '0 auto',
          }}
        >
          <div className="bg-chaos-dark rounded-lg shadow-2xl border-2 border-chaos-yellow overflow-hidden animate-popup-in">
            <div className="bg-chaos-pink px-4 py-2 flex items-center justify-between">
              <span className="text-sm font-black font-comic text-white">
                {popup.disturbance.emoji} Amazong Notification
              </span>
              <button
                onClick={() => closePopup(popup.id)}
                className="text-white hover:bg-white/20 rounded p-0.5 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-5">
              <h3 className="font-bold font-comic text-chaos-lime mb-2 text-sm">
                {popup.disturbance.title}
              </h3>
              <p className="text-sm text-chaos-cyan mb-4 leading-relaxed font-mono-chaos">
                {popup.disturbance.body}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    registerError();
                    closePopup(popup.id);
                  }}
                  className="flex-1 text-xs py-2 rounded-md bg-chaos-purple hover:bg-chaos-purple/70 text-white font-bold font-comic transition-colors"
                >
                  No
                </button>
                <button
                  onClick={() => closePopup(popup.id)}
                  className="flex-1 text-xs py-2 rounded-md bg-chaos-lime hover:bg-chaos-yellow text-black font-black font-comic transition-colors"
                >
                  Fine, whatever
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
