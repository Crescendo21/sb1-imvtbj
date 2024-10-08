"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface GameMenuProps {
  onSelectMode: (mode: string) => void;
}

const GameMenu: React.FC<GameMenuProps> = ({ onSelectMode }) => {
  const modes = [
    { name: 'Memecoins', icon: '🚀' },
    { name: 'Influencers', icon: '🎭' },
    { name: 'NFTs / Ordinals', icon: '🖼️' },
    { name: 'Leaderboard', icon: '🏆' },
  ];

  return (
    <motion.div
      className="flex flex-col space-y-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {modes.map((mode, index) => (
        <motion.div
          key={mode.name}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Button
            onClick={() => onSelectMode(mode.name)}
            className="w-48 text-lg"
          >
            {mode.icon} {mode.name}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default GameMenu;