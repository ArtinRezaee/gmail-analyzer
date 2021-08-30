import httpErrors from "http-errors";
import { NextFunction, Request, Response } from "express";
import { isAuthorized } from "./../../routes/auth/helpers/authHelpers";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const isAuthenticated = await isAuthorized();

    if (!isAuthenticated) {
      return next(httpErrors(401, "Unauthorized user"));
    }

    return next();
  } catch (error) {
    const errorMessage = `Failed to authenticate with error: ${error}`;
    console.error(errorMessage);

    return next(httpErrors(401, errorMessage));
  }
};
