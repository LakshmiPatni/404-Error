import { useRef, useState } from 'react';
import { useApp } from '@/context/app-context';
import { formatRupees, formatTime } from '@/utils/format';
import { sanityRatingColors } from '@/utils/scoring';
import { Trophy, RotateCcw, Download, Award, Clock, MousePointer, AlertTriangle, Type, Trash2, Brain } from 'lucide-react';
import { LeaderboardEntry } from '@/types';

type SortKey = 'resilience' | 'time' | 'words' | 'tax';

export function VictoryView() {
  const { orders, userName, setView, clearOrders } = useApp();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [sortKey, setSortKey] = useState<SortKey>('resilience');
  const latestOrder = orders[orders.length - 1];

  if (!latestOrder) {
    return (
      <div className="bg-chaos-dark bg-chaos-grid min-h-[calc(100vh-120px)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-chaos-cyan mb-4 font-comic">No survival record found.</p>
          <button onClick={() => setView('home')} className="bg-chaos-lime hover:bg-chaos-yellow text-black font-black font-comic px-6 py-2.5 rounded-lg transition-colors">Go Shopping</button>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    const svgContent = generateCertificateSVG(latestOrder);
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `amazong-certificate-${latestOrder.name.replace(/\s+/g, '-').toLowerCase()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => window.print();

  const sorted = [...orders].sort((a, b) => {
    switch (sortKey) {
      case 'time': return b.timeSurvived - a.timeSurvived;
      case 'words': return b.wordsTyped - a.wordsTyped;
      case 'tax': return b.finalTax - a.finalTax;
      default: return b.resilienceScore - a.resilienceScore;
    }
  });

  const sortButtons: { key: SortKey; label: string }[] = [
    { key: 'resilience', label: 'Resilience Score' },
    { key: 'time', label: 'Time Wasted' },
    { key: 'words', label: 'Words Typed' },
    { key: 'tax', label: 'Torture Tax' },
  ];

  return (
    <div className="bg-chaos-dark bg-chaos-grid min-h-[calc(100vh-120px)]">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6">
        {/* Victory banner */}
        <div className="bg-gradient-to-r from-chaos-purple via-chaos-pink to-chaos-orange rounded-lg p-6 text-center text-white mb-6 border-2 border-chaos-yellow">
          <Trophy className="mx-auto text-chaos-yellow mb-3" size={48} />
          <h1 className="text-3xl font-black font-impact mb-2 text-chaos-lime animate-glitch">YOU SURVIVED!</h1>
          <p className="text-chaos-cyan text-sm font-comic">
            Against all odds and common sense, {userName}, you have successfully completed the Amazong checkout process.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 bg-black/40 rounded-full px-4 py-1.5 border border-chaos-yellow/40">
            <Brain size={16} className="text-chaos-yellow" />
            <span className="text-xs font-bold font-comic text-chaos-yellow">Sanity Rating: {latestOrder.sanityRating}</span>
          </div>
        </div>

        {/* Stats summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { icon: <Clock size={20} />, value: formatTime(latestOrder.timeSurvived), label: 'Time Survived' },
            { icon: <MousePointer size={20} />, value: latestOrder.clicks, label: 'Clicks Endured' },
            { icon: <Type size={20} />, value: latestOrder.wordsTyped, label: 'Words Typed' },
            { icon: <AlertTriangle size={20} />, value: latestOrder.errors, label: 'Errors Made' },
          ].map((stat) => (
            <div key={stat.label} className="bg-chaos-dark rounded-lg p-4 border-2 border-chaos-purple text-center">
              <div className="mx-auto text-chaos-purple mb-1">{stat.icon}</div>
              <div className="text-lg font-black font-impact text-chaos-lime">{stat.value}</div>
              <div className="text-xs text-chaos-cyan font-mono-chaos">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Certificate */}
        <div ref={certificateRef} className="bg-white rounded-lg shadow-lg border-4 border-chaos-pink p-6 sm:p-8 mb-6 print:shadow-none print:border-2">
          <div className="text-center">
            <div className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-mono-chaos">Amazong: The Chaos Store</div>
            <div className="text-3xl font-black font-impact text-slate-900 mb-1">Certificate of Psychological Endurance</div>
            <div className="text-sm text-slate-500 mb-6 font-comic">This certifies that the maximum psychological torture has been survived</div>
            <div className="border-y-2 border-slate-200 py-6 my-4">
              <div className="text-xs text-slate-400 uppercase tracking-wide">Survivor Name</div>
              <div className="text-2xl font-bold font-impact text-slate-800 mt-1">{latestOrder.name}</div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6 text-sm">
              <div><div className="text-xs text-slate-400">Time Survived</div><div className="font-bold text-slate-800">{formatTime(latestOrder.timeSurvived)}</div></div>
              <div><div className="text-xs text-slate-400">Total Clicks</div><div className="font-bold text-slate-800">{latestOrder.clicks}</div></div>
              <div><div className="text-xs text-slate-400">Errors</div><div className="font-bold text-slate-800">{latestOrder.errors}</div></div>
              <div><div className="text-xs text-slate-400">Final Tax Paid</div><div className="font-bold text-slate-800">{formatRupees(latestOrder.finalTax)}</div></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-4 text-sm">
              <div><div className="text-xs text-slate-400">Words Typed</div><div className="font-bold text-slate-800">{latestOrder.wordsTyped}</div></div>
              <div><div className="text-xs text-slate-400">CGPA</div><div className="font-bold text-slate-800">{latestOrder.cgpa.toFixed(2)}</div></div>
              <div><div className="text-xs text-slate-400">Total Spent</div><div className="font-bold text-slate-800">{formatRupees(latestOrder.totalSpent)}</div></div>
            </div>
            {/* Digital Seal */}
            <div className="inline-flex flex-col items-center justify-center my-4">
              <div className="w-24 h-24 rounded-full border-4 border-amber-500 flex items-center justify-center bg-amber-50">
                <div className="text-center">
                  <Award size={28} className="mx-auto text-amber-600" />
                  <div className="text-[8px] font-black text-amber-700 uppercase mt-0.5 leading-tight">Certified<br/>Mentally<br/>Exhausted</div>
                </div>
              </div>
            </div>
            <div>
              <span className="inline-block text-lg font-bold font-comic text-amber-600">Resilience Score: {latestOrder.resilienceScore}</span>
            </div>
            <div className="text-xs text-slate-400 mt-2">{new Date(latestOrder.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            <div className="mt-4 text-sm text-slate-500 italic font-comic">"I came, I shopped, I suffered, I survived."</div>
          </div>
        </div>

        {/* Download & Print buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button onClick={handleDownload} className="flex-1 bg-chaos-lime hover:bg-chaos-yellow text-black font-black font-comic py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
            <Download size={18} /> Download Certificate
          </button>
          <button onClick={handlePrint} className="flex-1 bg-chaos-purple hover:bg-chaos-pink text-white font-bold font-comic py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
            Print Certificate
          </button>
        </div>

        {/* Leaderboard */}
        <div className="bg-chaos-dark rounded-lg p-4 sm:p-6 border-2 border-chaos-cyan mb-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="font-black font-comic text-chaos-yellow flex items-center gap-2">
              <Trophy size={20} className="text-chaos-yellow" /> Hall of Tortures
            </h2>
            <button
              onClick={() => {
                if (confirm('Erase all mental records? This will wipe the leaderboard clean. Your trauma will be forgotten.')) {
                  clearOrders();
                }
              }}
              className="flex items-center gap-1.5 text-xs font-bold font-comic text-chaos-pink border border-chaos-pink/40 rounded-md px-3 py-1.5 hover:bg-chaos-pink/20 transition-colors"
            >
              <Trash2 size={14} /> Clear Mental Records
            </button>
          </div>

          {/* Sort toggles */}
          <div className="flex flex-wrap gap-2 mb-4">
            {sortButtons.map((btn) => (
              <button
                key={btn.key}
                onClick={() => setSortKey(btn.key)}
                className={`text-xs font-bold font-comic px-3 py-1.5 rounded-md transition-colors ${sortKey === btn.key ? 'bg-chaos-lime text-black' : 'bg-chaos-purple/20 text-chaos-cyan hover:bg-chaos-purple/40'}`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Leaderboard table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono-chaos">
              <thead>
                <tr className="text-left border-b border-chaos-purple/40">
                  <th className="py-2 px-2 text-chaos-pink font-bold">Rank</th>
                  <th className="py-2 px-2 text-chaos-pink font-bold">Survivor</th>
                  <th className="py-2 px-2 text-chaos-pink font-bold hidden sm:table-cell">Time</th>
                  <th className="py-2 px-2 text-chaos-pink font-bold hidden sm:table-cell">Words</th>
                  <th className="py-2 px-2 text-chaos-pink font-bold hidden md:table-cell">Tax</th>
                  <th className="py-2 px-2 text-chaos-pink font-bold">Score</th>
                  <th className="py-2 px-2 text-chaos-pink font-bold">Sanity</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((entry, i) => (
                  <tr
                    key={entry.id}
                    className={`border-b border-chaos-purple/20 ${entry.name === latestOrder.name && entry.id === latestOrder.id ? 'bg-chaos-lime/10' : 'hover:bg-black/20'}`}
                  >
                    <td className="py-2 px-2">
                      <span className={`inline-flex w-6 h-6 rounded-full items-center justify-center text-[10px] font-black ${i === 0 ? 'bg-chaos-yellow text-black' : i === 1 ? 'bg-chaos-cyan text-black' : i === 2 ? 'bg-chaos-orange text-black' : 'bg-chaos-purple/30 text-chaos-cyan'}`}>
                        {i + 1}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-chaos-cyan font-bold truncate max-w-[100px]">{entry.name}</td>
                    <td className="py-2 px-2 text-chaos-cyan hidden sm:table-cell">{formatTime(entry.timeSurvived)}</td>
                    <td className="py-2 px-2 text-chaos-cyan hidden sm:table-cell">{entry.wordsTyped}</td>
                    <td className="py-2 px-2 text-chaos-lime hidden md:table-cell">{formatRupees(entry.finalTax)}</td>
                    <td className="py-2 px-2 text-chaos-yellow font-black">{entry.resilienceScore}</td>
                    <td className="py-2 px-2">
                      <span className={`inline-block text-[10px] font-bold font-comic px-2 py-0.5 rounded border ${sanityRatingColors[entry.sanityRating] ?? 'bg-chaos-purple/20 text-chaos-cyan border-chaos-purple/40'}`}>
                        {entry.sanityRating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reset button */}
        <div className="text-center">
          <button onClick={() => setView('home')} className="bg-chaos-pink hover:bg-red-500 text-white font-black font-impact px-8 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mx-auto">
            <RotateCcw size={20} /> RELIVE THE PAIN
          </button>
          <p className="text-xs text-chaos-cyan mt-2 font-comic">Go back to shopping. You know you want to.</p>
        </div>
      </div>
    </div>
  );
}

function generateCertificateSVG(entry: LeaderboardEntry): string {
  const minutes = Math.floor(entry.timeSurvived / 60000);
  const seconds = Math.floor((entry.timeSurvived % 60000) / 1000);
  const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const dateStr = new Date(entry.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="680" viewBox="0 0 800 680">
  <rect width="800" height="680" fill="#f8fafc" />
  <rect x="20" y="20" width="760" height="640" fill="none" stroke="#ff00aa" stroke-width="4" />
  <rect x="35" y="35" width="730" height="610" fill="none" stroke="#e2e8f0" stroke-width="1" />
  <text x="400" y="70" text-anchor="middle" font-family="monospace" font-size="11" fill="#94a3b8" letter-spacing="3">AMAZONG: THE CHAOS STORE</text>
  <text x="400" y="115" text-anchor="middle" font-family="Impact, sans-serif" font-size="30" font-weight="bold" fill="#0f172a">Certificate of Psychological Endurance</text>
  <text x="400" y="143" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#64748b">This certifies that the maximum psychological torture has been survived</text>
  <line x1="100" y1="175" x2="700" y2="175" stroke="#cbd5e1" stroke-width="2" />
  <line x1="100" y1="255" x2="700" y2="255" stroke="#cbd5e1" stroke-width="2" />
  <text x="400" y="205" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#94a3b8" letter-spacing="2">SURVIVOR NAME</text>
  <text x="400" y="235" text-anchor="middle" font-family="Impact, sans-serif" font-size="24" font-weight="bold" fill="#1e293b">${entry.name}</text>
  <text x="160" y="295" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">TIME SURVIVED</text>
  <text x="160" y="318" text-anchor="middle" font-family="monospace" font-size="16" font-weight="bold" fill="#1e293b">${timeStr}</text>
  <text x="340" y="295" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">TOTAL CLICKS</text>
  <text x="340" y="318" text-anchor="middle" font-family="monospace" font-size="16" font-weight="bold" fill="#1e293b">${entry.clicks}</text>
  <text x="520" y="295" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">ERRORS</text>
  <text x="520" y="318" text-anchor="middle" font-family="monospace" font-size="16" font-weight="bold" fill="#1e293b">${entry.errors}</text>
  <text x="660" y="295" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">WORDS</text>
  <text x="660" y="318" text-anchor="middle" font-family="monospace" font-size="16" font-weight="bold" fill="#1e293b">${entry.wordsTyped}</text>
  <text x="180" y="355" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">FINAL TAX PAID</text>
  <text x="180" y="378" text-anchor="middle" font-family="monospace" font-size="16" font-weight="bold" fill="#1e293b">₹${entry.finalTax.toLocaleString('en-IN')}</text>
  <text x="380" y="355" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">TOTAL SPENT</text>
  <text x="380" y="378" text-anchor="middle" font-family="monospace" font-size="16" font-weight="bold" fill="#1e293b">₹${entry.totalSpent.toLocaleString('en-IN')}</text>
  <text x="580" y="355" text-anchor="middle" font-family="monospace" font-size="9" fill="#94a3b8">CGPA</text>
  <text x="580" y="378" text-anchor="middle" font-family="monospace" font-size="16" font-weight="bold" fill="#1e293b">${entry.cgpa.toFixed(2)}</text>
  <circle cx="400" cy="440" r="28" fill="none" stroke="#d97706" stroke-width="3" />
  <circle cx="400" cy="440" r="22" fill="#fef3c7" />
  <text x="400" y="436" text-anchor="middle" font-family="sans-serif" font-size="8" font-weight="bold" fill="#92400e">CERTIFIED</text>
  <text x="400" y="448" text-anchor="middle" font-family="sans-serif" font-size="8" font-weight="bold" fill="#92400e">MENTALLY</text>
  <text x="400" y="458" text-anchor="middle" font-family="sans-serif" font-size="8" font-weight="bold" fill="#92400e">EXHAUSTED</text>
  <text x="400" y="500" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="#d97706">Resilience Score: ${entry.resilienceScore}</text>
  <text x="400" y="525" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ff00aa">${entry.sanityRating}</text>
  <text x="400" y="560" text-anchor="middle" font-family="monospace" font-size="11" fill="#94a3b8">Date of Survival: ${dateStr}</text>
  <text x="400" y="585" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#64748b" font-style="italic">"I came, I shopped, I suffered, I survived."</text>
</svg>`;
}
