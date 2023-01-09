import { Request, Response, NextFunction } from "express";

import Logger from "@/loaders/logger";

const asyncHandler = (requestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await requestHandler(req, res);
    } catch (error) {
      Logger.error("🔥 Error(request): %o", error);
      next(error);
    }
  };
};

export default asyncHandler;
