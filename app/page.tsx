"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import GameMenu from '@/components/GameMenu';
import ComparisonGame from '@/components/ComparisonGame';
import Leaderboard from '@/components/Leaderboard';

export default function Home() {
  const [gameMode, setGameMode] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-secondary">
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Crypto Comparison Game
      </motion.h1>
      
      {!gameMode ? (
        <GameMenu onSelectMode={setGameMode} />
      ) : gameMode === 'Leaderboard' ? (
        <>
          <Leaderboard />
          <Button
            onClick={() => setGameMode(null)}
            className="mt-4"
          >
            Back to Menu
          </Button>
        </>
      ) : (
        <>
          <ComparisonGame mode={gameMode as 'Memecoins' | 'Influencers' | 'NFTs / Ordinals'} />
          <Button
            onClick={() => setGameMode(null)}
            className="mt-4"
          >
            Back to Menu
          </Button>
        </>
      )}
    </div>
  );
}