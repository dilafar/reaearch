import express from "express";
import {
  savePlantController,
  updatePlantsController,
  deletePlantController,
  getPlantsController,
  getPlantByIdController,
} from "../controllers/index.js";

const plantRouter = express.Router();

plantRouter.get("/", getPlantsController);
plantRouter.get("/:id", getPlantByIdController);
plantRouter.post("/", savePlantController);
plantRouter.put("/:id", updatePlantsController);
plantRouter.delete("/:id", deletePlantController);

export default plantRouter;
