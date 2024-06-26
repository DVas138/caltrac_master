import { Request, Response } from "express";
import dotenv from "dotenv";
import { ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";

dotenv.config();
import prisma from "../client";
import getTime from "../util/getCurrentTime";

//TODO: REFACTOR FOR ERROR HANDLING MIDDLEWARE
export interface payload extends jwt.JwtPayload {
  id: string;
  email: string;
}

export async function createFood(req: Request, res: Response) {
  try {
    // console.log(req.body);
    const tokenExtract = ExtractJwt.fromAuthHeaderAsBearerToken();
    const token = tokenExtract(req) as string;

    const decoded = jwt.decode(token) as payload;
    console.log(decoded);
    const user = await prisma.user.findFirst({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
    req.body.foods.forEach((food: any) => {
      delete food.img;
    });
    // console.log(req.body);
    // const foods = await prisma.food.createMany({
    //   data: req.body.foods,
    // });

    console.log(req.body);

    if (req.body.type !== "recipe") {
      // let today = new Date();
      // today = new Date(today.setHours(0, 0, 0, 0));
      const today = getTime();
      const checkDay = await prisma.day.findFirst({
        where: {
          userId: user.id,
          date: today,
        },
      });
      if (!checkDay) {
        const day = await prisma.day.create({
          data: {
            date: today,
            foods: {
              createMany: {
                data: req.body.foods,
              },
            },
            userId: user.id,
            calories: req.body.foods.reduce(
              (acc: number, food: any) => acc + food.calories,
              0,
            ),
            weight: req.body.weight,
          },
          include: { foods: true },
        });
      } else {
        const day = await prisma.day.update({
          where: {
            id: checkDay.id,
          },
          data: {
            foods: {
              createMany: {
                data: req.body.foods,
              },
            },
            calories:
              checkDay.calories +
              req.body.foods.reduce(
                (acc: number, food: any) => acc + food.calories,
                0,
              ),
            weight: req.body.weight,
          },
          include: { foods: true },
        });
      }
    } else {
      const recipe = await prisma.recipe.create({
        data: {
          name: req.body.recipe.name,
          foods: {
            createMany: {
              data: req.body.foods,
            },
          },
          servings: req.body.recipe.servings,
          allCalories: req.body.foods.reduce(
            (acc: number, food: any) => acc + food.calories,
            0,
          ),
          userId: user.id,
        },
        include: { foods: true },
      });
    }
    res.status(201).json({
      status: true,
      message: "User created successfully",
      data: {
        token: token,
        user: "user to be changed with return from prisma",
      },
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: "Failed to create food",
      error: err.message,
    });
  }
}
