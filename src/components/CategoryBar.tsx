import { categories } from '@/data/categories';
import { useApp } from '@/context/app-context';

const catColors = [
  'hover:bg-chaos-pink/20 hover:text-chaos-pink',
  'hover:bg-chaos-lime/20 hover:text-chaos-lime',
  'hover:bg-chaos-yellow/20 hover:text-chaos-yellow',
  'hover:bg-chaos-purple/20 hover:text-chaos-purple',
  'hover:bg-chaos-cyan/20 hover:text-chaos-cyan',
  'hover:bg-chaos-orange/20 hover:text-chaos-orange',
  'hover:bg-chaos-pink/20 hover:text-chaos-pink',
];

export function CategoryBar() {
  const { activeCategory, setActiveCategory, setView } = useApp();

  const handleCategoryClick = (catId: string) => {
    if (activeCategory === catId) {
      setActiveCategory(null);
    } else {
      setActiveCategory(catId);
    }
    setView('home');
  };

  return (
    <div className="bg-chaos-dark border-b-2 border-chaos-lime sticky top-[65px] z-30 bg-chaos-grid">
      <div className="flex gap-1 px-2 sm:px-4 py-2 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => {
            setActiveCategory(null);
            setView('home');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-black font-comic whitespace-nowrap transition-colors ${
            activeCategory === null
              ? 'bg-chaos-yellow text-black'
              : 'text-white hover:bg-chaos-yellow/20 hover:text-chaos-yellow'
          }`}
        >
          <span>🔥</span>
          <span>All</span>
        </button>
        {categories.map((cat, i) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-bold font-comic whitespace-nowrap transition-colors ${
              activeCategory === cat.id
                ? 'bg-chaos-lime text-black'
                : `text-white ${catColors[i % catColors.length]}`
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
