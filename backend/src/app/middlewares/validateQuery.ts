import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validateQuery =
  (zodSchema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = await zodSchema.parseAsync(req.query);
      next();
    } catch (error) {
      next(error);
    }
  };
