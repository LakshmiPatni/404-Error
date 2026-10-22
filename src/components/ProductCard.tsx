import { useState, useRef } from 'react';
import { Heart, Star } from 'lucide-react';
import { Product } from '@/types';
import { useApp } from '@/context/app-context';
import { formatRupees } from '@/utils/format';

const clickMessages = [
  'Are you sure?',
  'Still thinking?',
  '1 click left...',
  'Added! (Just kidding, try again)',
];

const cardBgs = [
  'bg-chaos-pink/10 border-chaos-pink',
  'bg-chaos-lime/10 border-chaos-lime',
  'bg-chaos-yellow/10 border-chaos-yellow',
  'bg-chaos-purple/10 border-chaos-purple',
  'bg-chaos-cyan/10 border-chaos-cyan',
  'bg-chaos-orange/10 border-chaos-orange',
];

const buttonColors = [
  'bg-chaos-purple text-white hover:bg-chaos-pink',
  'bg-chaos-orange text-black hover:bg-chaos-yellow',
  'bg-chaos-cyan text-black hover:bg-chaos-lime',
];

type Props = { product: Product };

export function ProductCard({ product }: Props) {
  const { addToCart, toggleWishlist, isInWishlist, registerClick } = useApp();
  const [clickCount, setClickCount] = useState(0);
  const [buttonText, setButtonText] = useState('Add to Cart');
  const [justAdded, setJustAdded] = useState(false);
  const [dodgeOffset, setDodgeOffset] = useState({ x: 0, y: 0 });
  const [tilt] = useState(() => (Math.random() - 0.5) * 4);
  const dodgeChanceRef = useRef(Math.random());
  const bgClass = cardBgs[Math.floor(Math.random() * cardBgs.length)];
  const btnClass = buttonColors[Math.floor(Math.random() * buttonColors.length)];

  const handleAddClick = () => {
    registerClick();
    const newCount = clickCount + 1;

    if (newCount < 4) {
      setClickCount(newCount);
      setButtonText(clickMessages[newCount - 1]);
      if (dodgeChanceRef.current < 0.4) {
        const dodgeX = (Math.random() - 0.5) * 60;
        const dodgeY = (Math.random() - 0.5) * 30;
        setDodgeOffset({ x: dodgeX, y: dodgeY });
        setTimeout(() => setDodgeOffset({ x: 0, y: 0 }), 400);
      }
    } else {
      addToCart(product);
      setClickCount(0);
      setButtonText('Added! (For real this time)');
      setJustAdded(true);
      setDodgeOffset({ x: 0, y: 0 });
      setTimeout(() => {
        setButtonText('Add to Cart');
        setJustAdded(false);
      }, 2000);
    }
  };

  return (
    <div
      className={`rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 ${bgClass} overflow-hidden flex flex-col`}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <div className="relative bg-gradient-to-br from-chaos-dark/80 to-chaos-purple/30 h-36 flex items-center justify-center overflow-hidden">
        <span className="text-5xl select-none">{product.emoji}</span>
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-chaos-dark/80 hover:bg-chaos-dark shadow-sm transition-all"
        >
          <Heart
            size={18}
            className={isInWishlist(product.id) ? 'fill-chaos-pink text-chaos-pink' : 'text-chaos-lime'}
          />
        </button>
      </div>

      <div className="p-3 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-1">
          <Star size={12} className="fill-chaos-yellow text-chaos-yellow" />
          <span className="text-xs text-chaos-cyan font-mono-chaos">{product.rating}</span>
        </div>

        <h3 className="text-sm font-bold font-comic text-white leading-snug mb-1 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-xs text-chaos-lime/70 leading-relaxed mb-3 line-clamp-3 flex-1 font-mono-chaos">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-lg font-black font-impact text-chaos-yellow">
            {formatRupees(product.price)}
          </span>
        </div>

        <button
          onClick={handleAddClick}
          style={{ transform: `translate(${dodgeOffset.x}px, ${dodgeOffset.y}px) rotate(${tilt * -0.5}deg)` }}
          className={`w-full py-2 rounded-md text-sm font-black font-comic transition-all duration-200 ${
            justAdded
              ? 'bg-green-500 text-white'
              : clickCount > 0
                ? 'bg-chaos-pink text-white animate-shake'
                : btnClass
          }`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
