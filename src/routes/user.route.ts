import express from "express";
import {
  createUser,
  currentUser,
  loginUser,
} from "../controllers/user.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
const router = express.Router();

router.route("/createUser").post(createUser);
router.route("/login").post(loginUser);
router.route("/currentUser").get(authenticateUser, currentUser);

module.exports = router;
