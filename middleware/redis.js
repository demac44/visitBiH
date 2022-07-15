import redis from "redis"

const REDIS_URL = process.env.REDISCLOUD_URL || 6379

const redisClient = redis.createClient(REDIS_URL, {no_ready_check: true})

await redisClient.connect()

export default redisClient