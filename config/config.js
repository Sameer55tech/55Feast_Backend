import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const SECRET = process.env.SECRET;
const JWT_EXPIRY = 86400;
const USER_POOL_URL = "https://userpool.onrender.com/user";

export default { MONGO_URI, SECRET, JWT_EXPIRY, USER_POOL_URL };
