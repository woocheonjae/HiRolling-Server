import Logger from "../../loaders/logger.js";

const asyncHandler = (requestHandler) => {
  return async (req, res, next) => {
    try {
      await requestHandler(req, res);
    } catch (error) {
      Logger.error("🔥 Error attaching user to req: %o", error);
      next(error);
    }
  };
};

export default asyncHandler;
