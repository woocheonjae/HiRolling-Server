import { Container } from "typedi";

import LoggerInstance from "./logger";

export default ({ models }: { models: { name: string; model: any }[] }) => {
  try {
    models.forEach((m) => {
      Container.set(m.name, m.model);
    });

    Container.set("logger", LoggerInstance);
  } catch (error) {
    console.log("🚀 ~ file: dependencyInjector.ts:12 ~ error", error);
    LoggerInstance.error("🔥 Error on dependency injector loader: %o", error);
    throw error;
  }
};
