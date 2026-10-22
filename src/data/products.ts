import { Product } from '@/types';

export const products: Product[] = [
  // Electronics (10)
  {
    id: 'p1', name: "Schrödinger's USB Cable", price: 299,
    description: 'Works 50% of the time, disappears when you look away. Quantum entanglement not included.',
    category: 'electronics', emoji: '🔌', rating: 2.5,
  },
  {
    id: 'p2', name: 'Infinite Loop Earbuds', price: 1499,
    description: 'These earbuds are so smart they only play the sound of your own disappointment on repeat.',
    category: 'electronics', emoji: '🎧', rating: 1.8,
  },
  {
    id: 'p3', name: 'Bluetooth Toothbrush', price: 899,
    description: 'Posts your brushing habits to social media automatically. Your dentist will judge you publicly.',
    category: 'electronics', emoji: '🪥', rating: 3.1,
  },
  {
    id: 'p4', name: 'Smart Rock', price: 4999,
    description: 'A rock. But it has WiFi. It does nothing with the WiFi. But it has it.',
    category: 'electronics', emoji: '🪨', rating: 4.0,
  },
  {
    id: 'p5', name: 'Self-Loathing Power Bank', price: 799,
    description: 'Charges your phone but drains your soul. Always dies right before you need it most.',
    category: 'electronics', emoji: '🔋', rating: 2.1,
  },
  {
    id: 'p30', name: 'Bluetooth Microwave', price: 8999,
    description: 'Connects to your phone so you can burn food remotely from anywhere in the world. IoT at its worst.',
    category: 'electronics', emoji: '📡', rating: 2.8,
  },
  {
    id: 'p31', name: 'Cursed Air Fryer', price: 6499,
    description: 'Fries everything except what you put in it. Returns only abstract shapes. Witchcraft certified.',
    category: 'electronics', emoji: '🍳', rating: 3.3,
  },
  {
    id: 'p32', name: 'Anxiety-Inducing Alarm Clock', price: 1299,
    description: 'Wakes you up by reading your bank statement aloud. Also texts your boss that you\'re on your way.',
    category: 'electronics', emoji: '⏰', rating: 1.5,
  },
  {
    id: 'p33', name: 'Smartphone With Commitment Issues', price: 49999,
    description: 'Uninstalls your favorite apps when it feels neglected. Goes silent for days. Will not apologize.',
    category: 'electronics', emoji: '📱', rating: 2.9,
  },
  {
    id: 'p34', name: 'VPN That Gossips', price: 299,
    description: 'Protects your privacy by telling everyone what you\'re hiding. Encryption: emotional only.',
    category: 'electronics', emoji: '🔒', rating: 3.6,
  },

  // Beauty & Makeup (8)
  {
    id: 'p6', name: 'Shrieking Lipstick', price: 549,
    description: 'Screams softly whenever you open your mouth in public. Perfect for introverts who hate social interaction.',
    category: 'beauty', emoji: '💄', rating: 3.5,
  },
  {
    id: 'p7', name: 'Existential Crisis Foundation', price: 1299,
    description: 'Covers up your flaws AND your life choices. SPF 50 protection from reality.',
    category: 'beauty', emoji: '🧴', rating: 4.2,
  },
  {
    id: 'p8', name: 'Tears of My Enemies Eye Drops', price: 349,
    description: 'Harvested from people who failed to unsubscribe from newsletters. Very refreshing.',
    category: 'beauty', emoji: '💧', rating: 4.8,
  },
  {
    id: 'p9', name: 'Nail Polish That Judges You', price: 399,
    description: 'Changes color based on your life decisions. Most people end up with a very disappointed gray.',
    category: 'beauty', emoji: '💅', rating: 2.9,
  },
  {
    id: 'p35', name: 'Mascara That Whispers Insults', price: 699,
    description: 'Makes your lashes look great but mutters "you could do better" every time you blink.',
    category: 'beauty', emoji: '👁️', rating: 3.7,
  },
  {
    id: 'p36', name: 'Concealer for Dark Circles & Darker Thoughts', price: 899,
    description: 'Covers under-eye bags and the crushing weight of 3 AM existential spirals. Water-resistant, regret-proof.',
    category: 'beauty', emoji: '🎨', rating: 4.4,
  },
  {
    id: 'p37', name: 'Perfume That Smells Like Broken Promises', price: 2499,
    description: 'Top notes of hope, heart notes of betrayal, base notes of "I\'ll call you back." Unisex.',
    category: 'beauty', emoji: '🌸', rating: 3.9,
  },
  {
    id: 'p38', name: 'Face Mask That Runs Away', price: 199,
    description: 'Apply it, and it slowly slides off your face and into the drain. It doesn\'t want to be here either.',
    category: 'beauty', emoji: '😷', rating: 2.0,
  },

  // Fashion & Apparel (8)
  {
    id: 'p10', name: 'Invisibility Cloak (Defective)', price: 4999,
    description: 'Only makes you invisible to people you actually want to talk to. Everyone else can see you fine.',
    category: 'fashion', emoji: '🧥', rating: 2.0,
  },
  {
    id: 'p11', name: 'Socks That Steal Your Sandwiches', price: 299,
    description: 'They walk to the kitchen at 3 AM and eat your leftovers. You will find crumbs inside.',
    category: 'fashion', emoji: '🧦', rating: 3.7,
  },
  {
    id: 'p12', name: 'Passive-Aggressive Scarf', price: 799,
    description: 'Wraps tighter when you breathe. Loosens only when you apologize to it.',
    category: 'fashion', emoji: '🧣', rating: 3.3,
  },
  {
    id: 'p13', name: 'Jeans With Built-In Regret', price: 2499,
    description: 'Extremely fashionable but make you text your ex at 2 AM. No refund on emotional damage.',
    category: 'fashion', emoji: '👖', rating: 4.1,
  },
  {
    id: 'p39', name: 'T-Shirt That Changes Slogans', price: 599,
    description: 'Starts with "Live Laugh Love" but by 5 PM says "I have made terrible choices." Weather-activated.',
    category: 'fashion', emoji: '👕', rating: 4.3,
  },
  {
    id: 'p40', name: 'Hat That Whispers Gossip', price: 449,
    description: 'Quietly tells you scandalous things about people nearby. 80% of it is made up. You\'ll believe all of it.',
    category: 'fashion', emoji: '🎩', rating: 3.5,
  },
  {
    id: 'p41', name: 'Shoes That Squeak When You Lie', price: 1799,
    description: 'Perfectly silent when honest. Squeak loudly in the presence of deception. Do not wear to job interviews.',
    category: 'fashion', emoji: '👞', rating: 2.6,
  },
  {
    id: 'p42', name: 'Haunted Leather Belt', price: 999,
    description: 'Tightens itself every time you eat dessert. Last worn by a Victorian ghost who hated indulgence.',
    category: 'fashion', emoji: '👖', rating: 3.0,
  },

  // Home & Kitchen (8)
  {
    id: 'p14', name: 'Sarcastic Toaster', price: 1999,
    description: 'Burns your bread on purpose and says "Wow, great choice" in a condescending British accent.',
    category: 'home', emoji: '🍞', rating: 3.9,
  },
  {
    id: 'p15', name: 'Possessed Blender', price: 3499,
    description: 'Blends only when it feels like it. Sometimes blends things you did not put in it. Do not leave unattended.',
    category: 'home', emoji: '🥤', rating: 2.4,
  },
  {
    id: 'p16', name: 'Self-Cleaning Plate (Liar)', price: 699,
    description: 'Claims to be self-cleaning. Actually just throws food on the floor and calls it clean.',
    category: 'home', emoji: '🍽️', rating: 1.5,
  },
  {
    id: 'p17', name: 'Emotionally Unavailable Lamp', price: 1299,
    description: 'Only turns on when you validate its feelings first. Comes with a 45-minute therapy session manual.',
    category: 'home', emoji: '💡', rating: 3.6,
  },
  {
    id: 'p43', name: 'Kettle That Boils When Angry', price: 1599,
    description: 'Only heats water when it\'s in a bad mood. Which is always. It\'s British. It\'s always in a bad mood.',
    category: 'home', emoji: '☕', rating: 3.2,
  },
  {
    id: 'p44', name: 'Vacuum Cleaner That Plays Sad Songs', price: 4999,
    description: 'Cleans your floors while playing Celine Dion at full volume. Your dust will cry itself into the bag.',
    category: 'home', emoji: '🧹', rating: 4.0,
  },
  {
    id: 'p45', name: 'Rug That Trips Visitors', price: 2999,
    description: 'Perfectly flat until someone you dislike walks over it. Then it develops a very convenient bump.',
    category: 'home', emoji: '🪟', rating: 4.6,
  },
  {
    id: 'p46', name: 'Smart Fridge With Opinions', price: 49999,
    description: 'Judges your groceries. Sends passive-aggressive texts when you put expired yogurt back. Locks at midnight.',
    category: 'home', emoji: '🧊', rating: 3.4,
  },

  // Books & Stationery (8)
  {
    id: 'p18', name: '"How to Stop Buying Garbage" - A Book', price: 449,
    description: 'Ironically, buying this book IS buying garbage. The author is laughing at you right now.',
    category: 'books', emoji: '📖', rating: 4.5,
  },
  {
    id: 'p19', name: 'Procrastinator\'s Planner 2026', price: 599,
    description: 'All pages are blank because you were supposed to fill them last year. Just like every year.',
    category: 'books', emoji: '📔', rating: 3.0,
  },
  {
    id: 'p20', name: 'Pen That Writes Your Fears', price: 249,
    description: 'Everything you write comes out as a list of your deepest anxieties. Great for journaling!',
    category: 'books', emoji: '🖊️', rating: 2.7,
  },
  {
    id: 'p21', name: 'Sticky Notes of Despair', price: 199,
    description: 'Every note you write spontaneously adds "and that\'s okay" at the end. Hauntingly supportive.',
    category: 'books', emoji: '🗒️', rating: 4.3,
  },
  {
    id: 'p47', name: '"Cooking with Regret" - Cookbook', price: 549,
    description: 'Every recipe requires tears as a key ingredient. Foreword written by Gordon Ramsay\'s therapist.',
    category: 'books', emoji: '📕', rating: 3.8,
  },
  {
    id: 'p48', name: 'Dictionary That Adds Insults', price: 899,
    description: 'Look up any word and it adds "you should already know this" at the end. Vocabulary expansion through shame.',
    category: 'books', emoji: '📚', rating: 2.4,
  },
  {
    id: 'p49', name: 'Notebook That Eats Pages', price: 349,
    description: 'Slowly consumes the pages you\'ve written on. By the time you finish, only blank pages remain. Productive?',
    category: 'books', emoji: '📓', rating: 3.1,
  },
  {
    id: 'p50', name: 'Eraser That Erases Memories', price: 99,
    description: 'Erases pencil marks AND your memory of what you just wrote. Side effect: existential confusion.',
    category: 'books', emoji: '🧽', rating: 4.7,
  },

  // Groceries & Snacks (8)
  {
    id: 'p22', name: 'Existential Cereal', price: 349,
    description: 'Each piece whispers "why are you eating cereal at 11 PM?" Milk not included, meaning not included.',
    category: 'groceries', emoji: '🥣', rating: 3.4,
  },
  {
    id: 'p23', name: 'Chips That Never Run Out (Painful)', price: 299,
    description: 'The bag is always full. You can never finish it. You will eat chips forever. There is no escape.',
    category: 'groceries', emoji: '🍟', rating: 4.7,
  },
  {
    id: 'p24', name: 'Hauntingly Good Chocolate', price: 399,
    description: 'Tastes amazing but makes you think about every embarrassing thing you\'ve ever done. 70% dark.',
    category: 'groceries', emoji: '🍫', rating: 4.9,
  },
  {
    id: 'p25', name: 'Suspiciously Cheap Caviar', price: 99,
    description: 'It\'s probably not caviar. It\'s probably tapioca. But are you really going to risk it for ₹99?',
    category: 'groceries', emoji: '🐟', rating: 1.2,
  },
  {
    id: 'p51', name: 'Jam That Tastes Like Nostalgia', price: 349,
    description: 'Tastes exactly like your grandmother\'s cooking. Then you remember your grandmother was a terrible cook.',
    category: 'groceries', emoji: '🍯', rating: 3.3,
  },
  {
    id: 'p52', name: 'Spam Email Flavored Soda', price: 149,
    description: 'Tastes like "CONGRATULATIONS YOU\'VE WON" and "Enlarge your..." — actually, let\'s stop there. 500ml.',
    category: 'groceries', emoji: '🥤', rating: 1.0,
  },
  {
    id: 'p53', name: 'Instant Noodles That Take 3 Hours', price: 79,
    description: 'The package says 2 minutes. The noodles disagree. They will be ready when they are ready. Respect that.',
    category: 'groceries', emoji: '🍜', rating: 2.8,
  },
  {
    id: 'p54', name: 'Eternity Coffee (Decaf Liar)', price: 599,
    description: 'Claims to be decaf. Contains enough caffeine to power a small city. You will not sleep for 72 hours.',
    category: 'groceries', emoji: '☕', rating: 4.2,
  },

  // Sports & Outdoors (8)
  {
    id: 'p26', name: 'Jump Rope of Inadequacy', price: 449,
    description: 'Every time you trip, it loudly announces "FAILURE DETECTED" to everyone within 30 meters.',
    category: 'sports', emoji: '🪢', rating: 2.3,
  },
  {
    id: 'p27', name: 'Yoga Mat That Slides Away', price: 899,
    description: 'Slowly slides toward the door during your practice. Subtle hint to give up and go home.',
    category: 'sports', emoji: '🧘', rating: 3.1,
  },
  {
    id: 'p28', name: 'Running Shoes That Judge Your Pace', price: 3999,
    description: 'Built-in speaker plays slow clapping when you run below 10 km/h. Also plays "Try Harder" on loop.',
    category: 'sports', emoji: '👟', rating: 3.8,
  },
  {
    id: 'p29', name: 'Dumbbell With Attachment Issues', price: 1499,
    description: 'Rolls after you when you try to put it down. Follows you to bed. Will not let you skip leg day.',
    category: 'sports', emoji: '🏋️', rating: 4.0,
  },
  {
    id: 'p55', name: 'Basketball That Passes to the Enemy', price: 1299,
    description: 'Looks normal but has AI-powered betrayal. Automatically throws itself to the nearest opponent.',
    category: 'sports', emoji: '🏀', rating: 2.2,
  },
  {
    id: 'p56', name: 'Camping Tent That Gossips With Wildlife', price: 4999,
    description: 'Whispers your deepest secrets to nearby raccoons at 2 AM. The raccoons are not discreet.',
    category: 'sports', emoji: '⛺', rating: 3.5,
  },
  {
    id: 'p57', name: 'Water Bottle That Refills With Tears', price: 599,
    description: 'When empty, fills with whatever liquid is most abundant nearby. Usually your tears. Sometimes sweat.',
    category: 'sports', emoji: '🍶', rating: 2.9,
  },
  {
    id: 'p58', name: 'Treadmill That Goes Backward', price: 24999,
    description: 'Runs in reverse when it detects laziness. You will run faster or you will go through the wall. Your call.',
    category: 'sports', emoji: '🏃', rating: 3.7,
  },
];
