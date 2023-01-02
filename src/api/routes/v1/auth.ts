import asyncHandler from "@/api/middlewares/asyncHandler";
import { Request, Response, Router, NextFunction } from "express";
import logger from "winston";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  route.get(
    "/kakao",
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      logger.debug(req.body);

      return res.status(200).json({ test: "good" });
    }),
  );
};
