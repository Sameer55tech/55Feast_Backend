import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const SECRET = process.env.SECRET;
const JWT_EXPIRY = 2592000;
const USER_POOL_URL = "https://nutty-gold-bat.cyclic.app/user";
const MAIL_EMAIL = process.env.MAIL_EMAIL;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
const EMAIL_FROM = process.env.EMAIL_FROM;
const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PORT = process.env.MAIL_PORT;
const MAIL_SERVICE = process.env.MAIL_SERVICE;

export default {
  MONGO_URI,
  SECRET,
  JWT_EXPIRY,
  USER_POOL_URL,
  MAIL_EMAIL,
  MAIL_PASSWORD,
  EMAIL_FROM,
  MAIL_HOST,
  MAIL_PORT,
  MAIL_SERVICE,
};
