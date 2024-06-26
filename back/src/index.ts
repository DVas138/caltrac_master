import express from "express";
import dotenv from "dotenv";
import mongoSanitize from "express-mongo-sanitize";
//
// @ts-ignore
import cors from "cors";

import todayRouter from "./routes/today";
import userRouter from "./routes/user.routes";
import foodRouter from "./routes/food.routes";
import { ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
app.use(express.json());
app.use(mongoSanitize());
app.use(cors());

const port = process.env.PORT || 3000;

app.use("/today", todayRouter);
app.use("/user", userRouter);
app.use("/food", foodRouter);
app.post("/test", (req, res) => {
  const tokenExtract = ExtractJwt.fromAuthHeaderAsBearerToken();
  const token = tokenExtract(req) as string;

  const decoded = jwt.decode(token);
});
app.listen(port, () => console.log(`Server is running on port ${port}`));
