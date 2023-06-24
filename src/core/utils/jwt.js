import jwt from "jsonwebtoken";
import config from "../../../config/config.js";
import messageResponse from "./constants.js";

const createToken = (email, password) => {
  const token = jwt.sign({ email, password }, config.SECRET, {
    expiresIn: config.JWT_EXPIRY,
  });
  return token;
};

const jwtVerify = async (token, secret) => {
  try {
    jwt.verify(token, secret, (error, data) => {
      if (error) {
        console.log(messageResponse.AUTH_FAIL);
        return;
      }
      return data;
    });
  } catch (error) {
    console.log(messageResponse.ERROR_FETCHING_DATA);
  }
};

export default { createToken, jwtVerify };
