import { useState, useMemo } from 'react';
import { useApp } from '@/context/app-context';
import { interrogationQuestions } from '@/data/disturbances';
import { formatRupees, countWords } from '@/utils/format';
import { computeResilienceScore, computeSanityRating } from '@/utils/scoring';
import { LeaderboardEntry } from '@/types';

export function CheckoutView() {
  const {
    cart, cartCount, setView, clearCart, stats, elapsedTime,
    userName, addOrder, addWordsTyped, registerClick, registerError,
  } = useApp();

  const [step, setStep] = useState<'address' | 'academic' | 'interrogation' | 'payment'>('address');
  const [address, setAddress] = useState({ fullName: userName, line1: '', city: '', pincode: '', phone: '' });
  const [cgpa, setCgpa] = useState('');
  const [answers, setAnswers] = useState<string[]>(['', '', '', '']);
  const [answerErrors, setAnswerErrors] = useState<string[]>(['', '', '', '']);
  const [payButtonText, setPayButtonText] = useState('Pay & End My Suffering');
  const [payButtonOffset, setPayButtonOffset] = useState({ x: 0, y: 0 });
  const [payAttempts, setPayAttempts] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = 49;
  const cgpaValue = parseFloat(cgpa) || 0;
  const cgpaMultiplier = cgpaValue > 0 ? (10 - cgpaValue) * 0.15 : 0;
  const cgpaSurcharge = Math.round(subtotal * cgpaMultiplier);
  const totalWords = answers.reduce((sum, a) => sum + countWords(a), 0);
  const wordTax = totalWords * 100;
  const finalTotal = subtotal + shippingFee + cgpaSurcharge + wordTax;

  const scrambleText = (text: string): string => {
    if (text.length < 3) return text;
    if (Math.random() > 0.25) return text;
    const chars = text.split('');
    if (chars.length < 2) return text;
    const i = Math.floor(Math.random() * (chars.length - 1));
    [chars[i], chars[i + 1]] = [chars[i + 1], chars[i]];
    return chars.join('');
  };

  const handleAddressChange = (field: keyof typeof address, value: string) => {
    const scrambled = scrambleText(value);
    setAddress((prev) => ({ ...prev, [field]: scrambled }));
    if (scrambled !== value) registerError();
  };

  const handleAnswerChange = (idx: number, value: string) => {
    const prevWords = countWords(answers[idx]);
    const newWords = countWords(value);
    const diff = newWords - prevWords;
    if (diff > 0) addWordsTyped(diff);
    setAnswers((prev) => { const c = [...prev]; c[idx] = value; return c; });
    if (answerErrors[idx]) setAnswerErrors((prev) => { const c = [...prev]; c[idx] = ''; return c; });
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.line1.trim() || !address.city.trim() || !address.pincode.trim()) { registerError(); return; }
    setStep('academic');
  };

  const handleAcademicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(cgpa);
    if (isNaN(val) || val < 0 || val > 10) { registerError(); return; }
    setStep('interrogation');
  };

  const handleInterrogationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = answers.map((a) => countWords(a) < 5 ? 'Minimum 5 words required. Suffer more.' : '');
    if (errors.some((e) => e)) { setAnswerErrors(errors); registerError(); return; }
    setStep('payment');
  };

  const handlePayClick = () => {
    registerClick();
    const newAttempts = payAttempts + 1;
    if (newAttempts < 3) {
      const x = (Math.random() - 0.5) * 400;
      const y = (Math.random() - 0.5) * 160;
      setPayButtonOffset({ x, y });
      setPayAttempts(newAttempts);
      setPayButtonText(newAttempts === 1 ? 'Catch me first!' : 'Too slow! Try again!');
      setTimeout(() => setPayButtonOffset({ x: 0, y: 0 }), 600);
    } else {
      setPayButtonOffset({ x: 0, y: 0 });
      setIsProcessing(true);
      setPayButtonText('Processing your pain...');
      const resilienceScore = computeResilienceScore({ timeSurvived: elapsedTime, wordsTyped: stats.wordsTyped, errors: stats.errors, clicks: stats.clicks });
      const sanityRating = computeSanityRating(resilienceScore);
      const entry: LeaderboardEntry = {
        id: `${Date.now()}`, name: userName, timeSurvived: elapsedTime,
        wordsTyped: stats.wordsTyped, finalTax: wordTax + cgpaSurcharge,
        totalSpent: finalTotal, clicks: stats.clicks, errors: stats.errors,
        cgpa: cgpaValue, date: new Date().toISOString(),
        resilienceScore, sanityRating,
      };
      addOrder(entry);
      clearCart();
      setTimeout(() => setView('victory'), 2000);
    }
  };

  const stepNumber = useMemo(() => {
    const map = { address: 1, academic: 2, interrogation: 3, payment: 4 };
    return map[step];
  }, [step]);

  const inputClass = 'w-full px-3 py-2 border-2 border-chaos-purple rounded-md text-sm focus:ring-2 focus:ring-chaos-lime focus:outline-none bg-black/40 text-chaos-cyan font-mono-chaos';
  const cardClass = 'bg-chaos-dark rounded-lg p-6 border-2 border-chaos-lime space-y-4';
  const backBtnClass = 'px-4 py-2.5 border-2 border-chaos-purple rounded-lg text-chaos-cyan font-bold font-comic hover:bg-chaos-purple/30 transition-colors';
  const nextBtnClass = 'flex-1 bg-chaos-lime hover:bg-chaos-yellow text-black font-black font-impact py-2.5 rounded-lg transition-colors';

  if (cart.length === 0) {
    return (
      <div className="bg-chaos-dark bg-chaos-grid min-h-[calc(100vh-120px)] flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl font-black font-comic text-chaos-pink mb-2">Your cart is empty</h2>
          <p className="text-chaos-cyan text-sm mb-6 font-mono-chaos">You can't checkout with nothing. Go add some garbage first.</p>
          <button onClick={() => setView('home')} className="bg-chaos-lime hover:bg-chaos-yellow text-black font-black font-comic px-6 py-2.5 rounded-lg transition-colors">Browse Products</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-chaos-dark bg-chaos-grid min-h-[calc(100vh-120px)]">
      <div className="max-w-3xl mx-auto px-3 sm:px-6 py-4">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-6">
          {['Address', 'Academic', 'Interrogation', 'Payment'].map((label, i) => (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${i + 1 < stepNumber ? 'bg-chaos-lime text-black' : i + 1 === stepNumber ? 'bg-chaos-yellow text-black animate-pulse' : 'bg-chaos-purple/30 text-chaos-purple'}`}>
                {i + 1 < stepNumber ? '✓' : i + 1}
              </div>
              <span className={`text-xs font-bold font-comic hidden sm:inline ${i + 1 <= stepNumber ? 'text-chaos-lime' : 'text-chaos-purple'}`}>{label}</span>
              {i < 3 && <div className="flex-1 h-0.5 bg-chaos-purple/40" />}
            </div>
          ))}
        </div>

        <h1 className="text-xl font-black font-impact text-chaos-lime mb-4">
          CHECKOUT ({cartCount} {cartCount === 1 ? 'item' : 'items'})
        </h1>

        {/* Step 1: Address */}
        {step === 'address' && (
          <form onSubmit={handleAddressSubmit} className={cardClass}>
            <h2 className="font-black font-comic text-chaos-yellow">Shipping Address</h2>
            <p className="text-xs text-chaos-pink bg-chaos-pink/10 rounded-md p-2 font-mono-chaos border border-chaos-pink/30">
              Note: Our system has a known "feature" where address text may occasionally rearrange itself. This is not a bug. It's character building.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold font-comic text-chaos-cyan mb-1">Full Name</label>
                <input type="text" value={address.fullName} onChange={(e) => handleAddressChange('fullName', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-bold font-comic text-chaos-cyan mb-1">Phone</label>
                <input type="text" value={address.phone} onChange={(e) => handleAddressChange('phone', e.target.value)} className={inputClass} placeholder="We will call you at 3 AM" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold font-comic text-chaos-cyan mb-1">Address Line 1</label>
              <input type="text" value={address.line1} onChange={(e) => handleAddressChange('line1', e.target.value)} className={inputClass} placeholder="Where the package will be lost" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold font-comic text-chaos-cyan mb-1">City</label>
                <input type="text" value={address.city} onChange={(e) => handleAddressChange('city', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-bold font-comic text-chaos-cyan mb-1">Pincode</label>
                <input type="text" value={address.pincode} onChange={(e) => handleAddressChange('pincode', e.target.value)} className={inputClass} />
              </div>
            </div>
            <button type="submit" className={`w-full ${nextBtnClass}`}>Continue to Academic Verification</button>
          </form>
        )}

        {/* Step 2: Academic / CGPA */}
        {step === 'academic' && (
          <form onSubmit={handleAcademicSubmit} className={cardClass}>
            <h2 className="font-black font-comic text-chaos-yellow">Mandatory Academic & IQ Verification</h2>
            <p className="text-sm text-chaos-cyan leading-relaxed font-mono-chaos">
              Before proceeding, we need to verify your intelligence. Please enter your CGPA on a 10-point scale. This is definitely for legal reasons and not to calculate how much extra to charge you.
            </p>
            <div>
              <label className="block text-sm font-bold font-comic text-chaos-cyan mb-1">Your CGPA (0 - 10)</label>
              <input type="number" step="0.01" min="0" max="10" value={cgpa} onChange={(e) => setCgpa(e.target.value)} className={inputClass} placeholder="e.g. 7.5" autoFocus />
            </div>
            {cgpaValue > 0 && (
              <div className="bg-black/40 rounded-md p-3 text-sm space-y-1 border border-chaos-purple/40 font-mono-chaos">
                <div className="flex justify-between text-chaos-cyan"><span>CGPA entered</span><span>{cgpaValue.toFixed(2)}</span></div>
                <div className="flex justify-between text-chaos-cyan"><span>Multiplier ({(cgpaMultiplier * 100).toFixed(0)}%)</span><span className="text-chaos-pink">+{formatRupees(cgpaSurcharge)}</span></div>
                <p className="text-xs text-chaos-lime pt-1 font-comic">The lower your CGPA, the less you pay in surcharges. We reward academic mediocrity. You're welcome.</p>
              </div>
            )}
            <div className="flex gap-2">
              <button type="button" onClick={() => setStep('address')} className={backBtnClass}>Back</button>
              <button type="submit" className={nextBtnClass}>Continue to Interrogation</button>
            </div>
          </form>
        )}

        {/* Step 3: Interrogation */}
        {step === 'interrogation' && (
          <form onSubmit={handleInterrogationSubmit} className={cardClass}>
            <h2 className="font-black font-comic text-chaos-yellow">The Interrogation Questionnaire</h2>
            <p className="text-sm text-chaos-cyan leading-relaxed font-mono-chaos">
              Please answer all 4 questions truthfully. Each word you type adds <span className="font-bold text-chaos-pink">₹100</span> to your final bill. This is the <span className="font-bold text-chaos-yellow">Word-Count Intelligence Tax</span>. The more you explain, the more you pay. Choose your words wisely. Or don't. We profit either way.
            </p>
            <div className="bg-chaos-pink/10 rounded-md p-3 text-sm border border-chaos-pink/40">
              <div className="flex justify-between font-black font-comic text-chaos-pink">
                <span>Current Word Count Tax</span><span>{formatRupees(wordTax)}</span>
              </div>
              <div className="text-xs text-chaos-cyan mt-0.5 font-mono-chaos">{totalWords} words typed so far</div>
            </div>
            {interrogationQuestions.map((q, i) => (
              <div key={i}>
                <label className="block text-sm font-bold font-comic text-chaos-cyan mb-1">{i + 1}. {q}</label>
                <textarea value={answers[i]} onChange={(e) => handleAnswerChange(i, e.target.value)} rows={3} className={`${inputClass} resize-none`} placeholder="Type your deepest thoughts here... (₹100 per word)" />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-chaos-pink font-bold font-comic">{answerErrors[i]}</span>
                  <span className="text-xs text-chaos-purple font-mono-chaos">{countWords(answers[i])} words = {formatRupees(countWords(answers[i]) * 100)}</span>
                </div>
              </div>
            ))}
            <div className="flex gap-2">
              <button type="button" onClick={() => setStep('academic')} className={backBtnClass}>Back</button>
              <button type="submit" className={nextBtnClass}>Continue to Payment</button>
            </div>
          </form>
        )}

        {/* Step 4: Payment */}
        {step === 'payment' && (
          <div className={cardClass}>
            <h2 className="font-black font-comic text-chaos-yellow">Final Payment</h2>
            <div className="bg-black/40 rounded-lg p-4 space-y-2 text-sm border border-chaos-purple/40 font-mono-chaos">
              <div className="flex justify-between text-chaos-cyan"><span>Subtotal ({cartCount} items)</span><span>{formatRupees(subtotal)}</span></div>
              <div className="flex justify-between text-chaos-cyan"><span>Shipping</span><span>{formatRupees(shippingFee)}</span></div>
              {cgpaSurcharge > 0 && <div className="flex justify-between text-chaos-cyan"><span>CGPA Surcharge ({cgpaValue.toFixed(2)})</span><span>{formatRupees(cgpaSurcharge)}</span></div>}
              <div className="flex justify-between text-chaos-pink font-bold"><span>Word-Count Intelligence Tax ({totalWords} words)</span><span>{formatRupees(wordTax)}</span></div>
              <div className="border-t border-chaos-purple/40 pt-2 flex justify-between font-black font-impact text-chaos-lime text-lg">
                <span>Grand Total</span><span>{formatRupees(finalTotal)}</span>
              </div>
            </div>
            <p className="text-xs text-chaos-pink bg-chaos-pink/10 rounded-md p-2 font-comic border border-chaos-pink/30">
              Warning: The payment button may attempt to flee. This is normal Amazong behavior. Chase it down.
            </p>
            <div className="relative h-20 flex items-center justify-center overflow-visible">
              <button
                onClick={handlePayClick}
                disabled={isProcessing}
                style={{ transform: `translate(${payButtonOffset.x}px, ${payButtonOffset.y}px)` }}
                className={`px-8 py-3 rounded-lg font-black font-impact text-lg transition-all duration-300 ${isProcessing ? 'bg-chaos-purple text-chaos-cyan cursor-wait' : payAttempts > 0 ? 'bg-chaos-pink text-white animate-shake' : 'bg-chaos-lime text-black hover:bg-chaos-yellow'}`}
              >
                {payButtonText}
              </button>
            </div>
            <button onClick={() => setStep('interrogation')} disabled={isProcessing} className="text-sm text-chaos-cyan hover:text-chaos-lime transition-colors w-full text-center font-comic">
              Back to Interrogation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
