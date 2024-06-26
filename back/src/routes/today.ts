import express from "express";
import passport from "passport";
import { getDay } from "../controllers/today";

const router = express.Router();

router.get("", passport.authenticate("jwt", { session: false }), getDay);

export default router;
