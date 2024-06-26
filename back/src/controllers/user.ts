import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
import prisma from "../client";
import calculateCals from "../formulas/BMR1";
import { ExtractJwt } from "passport-jwt";
//TODO: REFACTOR FOR ERROR HANDLING MIDDLEWARE

export async function createUser(req: Request, res: Response) {
  try {
    const { weight, height, sex, age, calGoal, activity } = req.body;
    req.body.calGoal = Math.round(
      calculateCals(weight, height, sex, age, calGoal, activity),
    );
    delete req.body.passwordRep;
    delete req.body.intent;
    const saltRounds = process.env.SALT ? parseInt(process.env.SALT) : 10;
    const secret = process.env.JWT_TOKEN || "foodsecret";
    const pass = await bcrypt.hash(req.body.password, saltRounds);
    //TODO: Uncomment
    const user = await prisma.user.create({
      data: { ...req.body, password: pass },
    });
    const token = jwt.sign(
      { email: req.body.email, id: user.id },
      "foodsecret",
      {
        expiresIn: "10h",
      },
    );
    res.status(201).json({
      status: true,
      message: "User created successfully",
      data: {
        token: token,
        user: user,
      },
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: "Failed to create user",
      error: err.message,
    });
  }
}
//TO TEST
export async function getUsers(req: Request, res: Response) {
  const users = await prisma.user.findMany();
  res.json({
    status: true,
    message: "List of users",
    data: users,
  });
}

interface payload extends jwt.JwtPayload {
  id: string;
}
export async function getUser(req: Request, res: Response) {
  const tokenExtract = ExtractJwt.fromAuthHeaderAsBearerToken();
  const token = tokenExtract(req) as string;

  const decoded = jwt.decode(token) as payload;
  const id = decoded.id;
  const user = await prisma.user.findFirst({
    where: {
      id: decoded.id,
    },
    select: {
      email: true,
      username: true,
      weight: true,
      height: true,
      age: true,
      sex: true,
      activity: true,
    },
  });

  res.json({
    status: true,
    message: "User details",
    data: user,
  });
}

// May update security to check the id in the token (later)
export async function deleteUser(req: Request, res: Response) {
  const tokenExtract = ExtractJwt.fromAuthHeaderAsBearerToken();
  const token = tokenExtract(req) as string;

  const decoded = jwt.decode(token) as payload;
  const userId = decoded.id;
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    res.json({
      status: true,
      message: "User deleted successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: "Failed to delete user",
      error: err.message,
    });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const tokenExtract = ExtractJwt.fromAuthHeaderAsBearerToken();
    const token = tokenExtract(req) as string;
    const decoded = jwt.decode(token) as payload;
    const userId = decoded.id;
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (req.body.password && req.body.passwordRep) {
      delete req.body.passwordRep;
      delete req.body.intent;
      const saltRounds = process.env.SALT ? parseInt(process.env.SALT) : 10;
      const pass = await bcrypt.hash(req.body.password, saltRounds);
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          ...req.body,
          password: pass,
        },
      });
    } else {
      delete req.body.passwordRep;
      delete req.body.intent;

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          ...req.body,
        },
      });
    }
    res.json({
      status: true,
      message: "User updated successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: "Failed to update user",
      error: err.message,
    });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
    const hash = user.password;
    const match = await bcrypt.compare(password, hash);
    if (!match) {
      return res.status(401).json({
        status: false,
        message: "Invalid password",
      });
    }
    const secret = "foodsecret";
    const token = jwt.sign({ email: req.body.email, id: user.id }, secret, {
      expiresIn: "10h",
    });

    res.json({
      status: true,
      message: "User logged in successfully",
      data: { token: token, userId: user.id },
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: "Failed to login user",
      error: err.message,
    });
  }
}
