import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Error Handler Utility: ", err);
  res.status(500).json({
    error: "Internal Server Error",
  });
};
