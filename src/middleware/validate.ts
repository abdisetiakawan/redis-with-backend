import type { Request, Response, NextFunction } from "express";

import { ZodSchema } from "zod";

export const validate =
  <T>(
    schema: ZodSchema<T>
  ): ((req: Request, res: Response, next: NextFunction) => void) =>
  (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        status: false,
        errors: result.error.errors,
      });
    }

    return next();
  };
