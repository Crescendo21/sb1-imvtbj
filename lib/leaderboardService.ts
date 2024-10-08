type LeaderboardEntry = {
  name: string;
  score: number;
};

type LeaderboardCategory = 'memecoins' | 'influencers' | 'nfts';

const leaderboards: Record<LeaderboardCategory, LeaderboardEntry[]> = {
  memecoins: [],
  influencers: [],
  nfts: [],
};

export function incrementScore(category: LeaderboardCategory, assetName: string, won: boolean) {
  const leaderboard = leaderboards[category];
  const existingEntry = leaderboard.find(entry => entry.name === assetName);
  if (existingEntry) {
    existingEntry.score += won ? 1 : -1;
  } else {
    leaderboard.push({ name: assetName, score: won ? 1 : -1 });
  }
  leaderboard.sort((a, b) => b.score - a.score);
}

export function getLeaderboard(category: LeaderboardCategory, limit: number = 10): LeaderboardEntry[] {
  return leaderboards[category].slice(0, limit);
}