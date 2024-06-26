import express from "express";
import passport from "passport";
import { createFood } from "../controllers/food";

const router = express.Router();

router.post("", createFood);

export default router;
