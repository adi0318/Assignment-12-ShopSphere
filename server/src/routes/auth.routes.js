import express from "express";
import {
  login,
  register,
  getMe,
  refreshToken,
  logout,
} from "../controllers/auth.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validators.js";
import authenticate from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerValidator, register);

router.post("/login", loginValidator, login);

router.post("/refresh-token", refreshToken);

router.post("/logout", authenticate, logout)

router.get("/me", authenticate, getMe);

export default router;
