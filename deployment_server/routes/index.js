import express from "express";
import plantRouter from "./plant.route.js";

const apiRouter = express.Router();

apiRouter.use("/plant", plantRouter);

export default apiRouter;
