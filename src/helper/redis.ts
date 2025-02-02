import { createClient, RedisClientType } from "redis";

let client: RedisClientType | null = null;

export async function initalizeRedisClient() {
  if (!client) {
    client = createClient();
    client.on("error", (error) => {
      console.error(error);
    });
    client.on("connect", () => {
      console.log("Redis Connected");
    });
    await client.connect();
  }
  return client;
}
