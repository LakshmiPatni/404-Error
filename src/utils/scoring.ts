import { LeaderboardEntry } from '@/types';

export function computeResilienceScore(entry: Pick<LeaderboardEntry, 'timeSurvived' | 'wordsTyped' | 'errors' | 'clicks'>): number {
  const timeMin = entry.timeSurvived / 60000;
  const score = Math.round(timeMin * 10 + entry.wordsTyped * 5 + entry.errors * 3 + entry.clicks * 0.5);
  return score;
}

export function computeSanityRating(score: number): string {
  if (score >= 500) return 'Clinically Insane';
  if (score >= 350) return 'Glutton for Punishment';
  if (score >= 250) return 'Overthinker Pro';
  if (score >= 150) return 'Concerningly Patient';
  if (score >= 75) return 'Mildly Unhinged';
  return 'Barely Survived';
}

export const sanityRatingColors: Record<string, string> = {
  'Clinically Insane': 'bg-red-500/20 text-red-400 border-red-500/40',
  'Glutton for Punishment': 'bg-chaos-pink/20 text-chaos-pink border-chaos-pink/40',
  'Overthinker Pro': 'bg-chaos-purple/20 text-chaos-purple border-chaos-purple/40',
  'Concerningly Patient': 'bg-chaos-orange/20 text-chaos-orange border-chaos-orange/40',
  'Mildly Unhinged': 'bg-chaos-cyan/20 text-chaos-cyan border-chaos-cyan/40',
  'Barely Survived': 'bg-chaos-lime/20 text-chaos-lime border-chaos-lime/40',
};
