import userSchema from "./userSchema";
import { Request, Response, NextFunction } from "express";
export default function validator(schema: any) {
  return function (req: Request, res: Response, next: NextFunction) {
    const { error, value } = schema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(500).json({
        status: false,
        message: error.details[0].message,
      });
    }
    next();
  };
}
