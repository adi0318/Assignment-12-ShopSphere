import jwt from "jsonwebtoken";
import config from "../config/config.js";

const generateAccessToken = (payload) => {
  return jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {
    expiresIn: config.ACCESS_TOKEN_EXPIRY,
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, config.REFRESH_TOKEN_SECRET, {
    expiresIn: config.REFRESH_TOKEN_EXPIRY,
  });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, config.ACCESS_TOKEN_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, config.REFRESH_TOKEN_SECRET);
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
