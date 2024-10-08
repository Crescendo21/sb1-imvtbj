"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { incrementScore } from '@/lib/leaderboardService';
import memecoinData from '@/data/memecoins.json';
import influencerData from '@/data/influencers.json';
import nftData from '@/data/nfts.json';

interface ComparisonGameProps {
  mode: 'Memecoins' | 'Influencers' | 'NFTs / Ordinals';
}

interface Item {
  id: number;
  name: string;
  image: string;
}

const ComparisonGame: React.FC<ComparisonGameProps> = ({ mode }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentPair, setCurrentPair] = useState<[Item, Item] | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const getData = () => {
      switch (mode) {
        case 'Memecoins':
          return memecoinData;
        case 'Influencers':
          return influencerData;
        case 'NFTs / Ordinals':
          return nftData;
        default:
          return [];
      }
    };

    const data = getData();
    setItems(data);
    setCurrentPair(getRandomPair(data));
  }, [mode]);

  const getRandomPair = (items: Item[]): [Item, Item] => {
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    return [shuffled[0], shuffled[1]];
  };

  const handleChoice = (chosenItem: Item) => {
    if (!currentPair) return;

    const [item1, item2] = currentPair;
    const category = mode === 'Memecoins' ? 'memecoins' : mode === 'Influencers' ? 'influencers' : 'nfts';
    incrementScore(category, chosenItem.name, true);
    incrementScore(category, chosenItem.id === item1.id ? item2.name : item1.name, false);

    setScore(score + 1);
    const remainingItems = items.filter(item => item.id !== chosenItem.id);
    if (remainingItems.length > 1) {
      setCurrentPair(getRandomPair(remainingItems));
    } else {
      setCurrentPair(null);
    }
  };

  if (!currentPair) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
        <p className="text-xl">Your score: {score}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">{mode} - Score: {score}</h2>
      <div className="flex justify-center space-x-8">
        {currentPair.map((item, index) => (
          <motion.div
            key={item.id}
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={200}
              height={200}
              className="rounded-lg mb-4"
            />
            <Button onClick={() => handleChoice(item)} className="w-full">
              {item.name}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonGame;