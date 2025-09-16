/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

export const validateQuery =
  (zodSchema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedQuery = await zodSchema.parseAsync(req.query);
      // Optionally, you can attach parsedQuery to req as a new property
      (req as any).validatedQuery = parsedQuery;
      next();
    } catch (error) {
      next(error);
    }
  };
