import { Request, Response } from "express";
import prisma from "../client";
import jwt from "jsonwebtoken";
import getToken from "../util/getToken";
import getTime from "../util/getCurrentTime";
import today from "../routes/today";
export async function getDay(req: Request, res: Response) {
  try {
    const userId = getToken(req).id;
    // let today = new Date();
    // today = new Date(today.setHours(0, 0, 0, 0));
    // console.log(today);
    const today = getTime();
    const day = await prisma.day.findFirst({
      where: {
        userId: userId,
        date: today,
      },
      include: { foods: true },
    });
    const caloriesGoal = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        calGoal: true,
      },
    });
    const pastDays = await prisma.day.findMany({
      where: {
        userId: userId,
        date: { lte: today },
      },
      orderBy: {
        date: "desc",
      },
      take: 7,
    });
    console.log(pastDays, today, caloriesGoal, day);
    if (day && pastDays && caloriesGoal) {
      res.status(201).json({
        status: true,
        message: "User created successfully",
        //Front-end data
        days: pastDays,
        today: today,
        goal: caloriesGoal.calGoal,
        foods: day.foods,
        calories: day.calories,
      });
    } else {
      res.status(500).json({
        status: false,
        message: "Failed to get data from database about Today",
      });
    }
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: "Failed to get day data",
      error: err.message,
    });
  }
}
