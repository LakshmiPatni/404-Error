import { useApp } from '@/context/app-context';
import { formatTime } from '@/utils/format';

export function TimerWidget() {
  const { elapsedTime, stats, userName } = useApp();

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-chaos-lime rounded-lg shadow-xl px-4 py-3 text-xs z-50 border-2 border-chaos-pink font-mono-chaos">
      <div className="text-chaos-yellow font-black font-comic mb-1">
        ⏱ {userName}'s Endurance
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
        <span className="text-chaos-pink">Time:</span>
        <span className="text-chaos-cyan">{formatTime(elapsedTime)}</span>
        <span className="text-chaos-pink">Clicks:</span>
        <span className="text-chaos-cyan">{stats.clicks}</span>
        <span className="text-chaos-pink">Errors:</span>
        <span className="text-chaos-cyan">{stats.errors}</span>
        <span className="text-chaos-pink">Words:</span>
        <span className="text-chaos-cyan">{stats.wordsTyped}</span>
      </div>
    </div>
  );
}
