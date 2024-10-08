"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getLeaderboard } from '@/lib/leaderboardService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LeaderboardCategory = ({ category, title }: { category: 'memecoins' | 'influencers' | 'nfts', title: string }) => {
  const [leaderboard, setLeaderboard] = useState<Array<{ name: string; score: number }>>([]);

  useEffect(() => {
    setLeaderboard(getLeaderboard(category));
  }, [category]);

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <ul className="bg-card rounded-lg shadow-md">
        {leaderboard.map((item, index) => (
          <motion.li
            key={item.name}
            className="flex justify-between items-center p-4 border-b last:border-b-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <span className="font-semibold">{item.name}</span>
            <span className="text-muted-foreground">{item.score}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

const Leaderboard = () => {
  return (
    <motion.div
      className="w-full max-w-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Leaderboards</h2>
      <Tabs defaultValue="memecoins">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="memecoins">Memecoins</TabsTrigger>
          <TabsTrigger value="influencers">Influencers</TabsTrigger>
          <TabsTrigger value="nfts">NFTs / Ordinals</TabsTrigger>
        </TabsList>
        <TabsContent value="memecoins">
          <LeaderboardCategory category="memecoins" title="Memecoins Leaderboard" />
        </TabsContent>
        <TabsContent value="influencers">
          <LeaderboardCategory category="influencers" title="Influencers Leaderboard" />
        </TabsContent>
        <TabsContent value="nfts">
          <LeaderboardCategory category="nfts" title="NFTs / Ordinals Leaderboard" />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Leaderboard;