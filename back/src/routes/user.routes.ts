import express, { Request, Response, Errback } from "express";
import passport from "passport";
const router = express.Router();

import {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  loginUser,
} from "../controllers/user";
import validator from "../middleware/validator";
import userSchema from "../middleware/userSchema";
import("../middleware/auth");

router.post("", validator(userSchema), createUser);
router.get("/all", passport.authenticate("jwt", { session: false }), getUsers);
router.get("", passport.authenticate("jwt", { session: false }), getUser);
router.delete("", passport.authenticate("jwt", { session: false }), deleteUser);
router.patch("", passport.authenticate("jwt", { session: false }), updateUser);
router.post("/login", loginUser);
export default router;
