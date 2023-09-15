import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const SECRET = process.env.SECRET;
const JWT_EXPIRY = 2592000;
const USER_POOL_URL = "https://stormy-ruby-cheetah.cyclic.cloud/user";
const EMAIL_API_KEY = process.env.EMAIL_API_KEY;
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const PORT = process.env.PORT;

export default {
  MONGO_URI,
  SECRET,
  JWT_EXPIRY,
  USER_POOL_URL,
  EMAIL_API_KEY,
  SENDER_EMAIL,
  PORT,
};
