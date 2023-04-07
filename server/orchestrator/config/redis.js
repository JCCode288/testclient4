import { Redis } from "ioredis";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
export default new Redis({
  host: "redis-19038.c295.ap-southeast-1-1.ec2.cloud.redislabs.com",
  port: 19038,
  password: process.env.REDIS_PASSWORD,
});
