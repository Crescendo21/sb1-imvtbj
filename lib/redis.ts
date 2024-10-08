import { Redis } from 'ioredis';
import { RedisMemoryServer } from 'redis-memory-server';

let redis: Redis;

export async function getRedisClient() {
  if (redis) {
    return redis;
  }

  // For production, you'd use a real Redis server
  // const redisClient = new Redis(process.env.REDIS_URL);

  // For development, we'll use redis-memory-server
  const redisServer = new RedisMemoryServer();
  const host = await redisServer.getHost();
  const port = await redisServer.getPort();

  redis = new Redis(`redis://${host}:${port}`);

  return redis;
}