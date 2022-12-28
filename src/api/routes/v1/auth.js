// import Logger from "../../../loaders/logger.js";
import asyncHandler from "../../middlewares/asyncHandler.js";
import { Router } from "express";
import logger from "winston";

const router = Router();

const auth = (app) => {
  app.use("/auth", router);

  router.get(
    "/kakao",
    asyncHandler(async (req, res, next) => {
      logger.debug(req.body);

      res.status(200).json({ test: "good" });
    })
  );
};

export default auth;
