import express from "express";
import memoryRouter from "./memory_utilization.route.js";
import cpuRouter from "./cpu_usage.route.js";

const apiRouter = express.Router();

apiRouter.use("/cpu", cpuRouter);
apiRouter.use("/memory", memoryRouter);

export default apiRouter;
