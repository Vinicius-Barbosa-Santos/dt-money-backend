import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { ZodError } from "zod";

export const errorHandling = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    return response.status(400).json({
      message: "Validation error",
      errors: error.issues,
    });
  }

  return response.status(500).json({
    message: "Internal server error",
  });
};
